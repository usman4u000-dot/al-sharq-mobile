import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import twilio from 'twilio';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazy SDK Initialization
let stripeClient: Stripe | null = null;
export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    stripeClient = new Stripe(key, { apiVersion: '2026-03-25.dahlia' as any });
  }
  return stripeClient;
}

let twilioClient: twilio.Twilio | null = null;
export function getTwilio(): twilio.Twilio {
  if (!twilioClient) {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (!sid || !token) {
      throw new Error('TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required');
    }
    twilioClient = twilio(sid, token);
  }
  return twilioClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // --- API Routes --- //
  
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', server: 'full-stack' });
  });

  app.post('/api/create-checkout-session', async (req, res) => {
    try {
      const stripe = getStripe();
      const { ticketId, amount, customerName, deviceType } = req.body;
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'aed',
              product_data: {
                name: `Repair Ticket #${ticketId}`,
                description: `${deviceType} - ${customerName}`,
              },
              unit_amount: Math.round(amount * 100), // convert AED to fils
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/track-repair?ticketId=${ticketId}&payment=success`,
        cancel_url: `${req.headers.origin}/track-repair?ticketId=${ticketId}&payment=cancelled`,
        metadata: {
          ticketId,
        }
      });
      
      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error('Stripe error:', error);
      res.status(500).json({ error: error.message || 'Payment initiation failed' });
    }
  });

  app.post('/api/send-sms', async (req, res) => {
    try {
      const client = getTwilio();
      const { to, message } = req.body;
      
      const fromNumber = process.env.TWILIO_PHONE_NUMBER;
      if (!fromNumber) {
        throw new Error('TWILIO_PHONE_NUMBER is not configured');
      }

      const response = await client.messages.create({
        body: message,
        from: fromNumber,
        to: to
      });
      
      res.json({ success: true, messageSid: response.sid });
    } catch (error: any) {
      console.error('Twilio error:', error);
      res.status(500).json({ error: error.message || 'SMS dispatch failed' });
    }
  });

  // --- Vite Configuration --- //
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
