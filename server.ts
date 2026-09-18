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

  // Repair Booking & Estimate Notification Endpoint
  app.post('/api/send-booking-notification', async (req, res) => {
    try {
      const {
        refNumber,
        name,
        email,
        phone,
        city,
        deviceCategory,
        deviceModel,
        serviceType,
        serviceMethod,
        preferredTime,
        estimatedCost,
        notes
      } = req.body;

      const targetEmail = process.env.ADMIN_NOTIFY_EMAIL || 'alsharqmobile@gmail.com';

      console.log(`[BOOKING ALERT -> ${targetEmail}]`);
      console.log(`Reference #: ${refNumber}`);
      console.log(`Customer: ${name} (${phone} | ${email})`);
      console.log(`Device: ${deviceCategory} - ${deviceModel}`);
      console.log(`Service: ${serviceType} via ${serviceMethod}`);
      console.log(`City: ${city} | Time: ${preferredTime}`);
      console.log(`Estimate: ${estimatedCost}`);

      // If an external email service like Resend is configured, send actual email
      if (process.env.RESEND_API_KEY) {
        try {
          const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
              from: 'Al Sharq Repairs <notifications@allsharq.com>',
              to: [targetEmail],
              reply_to: email || targetEmail,
              subject: `🔧 New Repair Booking [${refNumber}]: ${deviceModel} - ${serviceType}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 10px;">
                  <h2 style="color: #0f172a; border-bottom: 2px solid #f97316; padding-bottom: 10px;">New Repair Booking Received</h2>
                  <p><strong>Ref Number:</strong> <span style="font-family: monospace; font-size: 16px; color: #f97316;">${refNumber}</span></p>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Customer Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone}</a></td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email || 'N/A'}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>City:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${city || 'N/A'}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Device:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${deviceCategory} - ${deviceModel}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service Required:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${serviceType}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Method:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${serviceMethod}</td></tr>
                    <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Estimated Cost:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${estimatedCost}</td></tr>
                  </table>
                  <div style="margin-top: 20px; padding: 12px; background-color: #f8fafc; border-radius: 8px;">
                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(name)},%20we%20received%20your%20booking%20${refNumber}%20at%20Al%20Sharq%20Mobile%20Lab." style="color: #15803d; font-weight: bold; text-decoration: none;">💬 Click to Contact Customer on WhatsApp</a>
                  </div>
                </div>
              `
            })
          });
          const emailData = await emailResponse.json();
          console.log('Resend email dispatched:', emailData);
        } catch (mailErr) {
          console.warn('Resend email API delivery failed:', mailErr);
        }
      }

      res.json({
        success: true,
        targetEmail,
        refNumber,
        message: `Booking received and notification queued for ${targetEmail}`
      });
    } catch (error: any) {
      console.error('Booking notification error:', error);
      res.status(500).json({ error: error.message || 'Notification processing failed' });
    }
  });

  // Contact Form Inquiry Endpoint
  app.post('/api/contact-inquiry', async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      const targetEmail = process.env.ADMIN_NOTIFY_EMAIL || 'alsharqmobile@gmail.com';

      console.log(`[CONTACT INQUIRY -> ${targetEmail}]`);
      console.log(`From: ${name} (${email} | ${phone || 'N/A'})`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);

      if (process.env.RESEND_API_KEY) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
              from: 'Al Sharq Contact <notifications@allsharq.com>',
              to: [targetEmail],
              reply_to: email,
              subject: `📩 Contact Form Message: ${subject || 'New Inquiry'} from ${name}`,
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                  <h3>New Inquiry from Website</h3>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                  <p><strong>Message:</strong></p>
                  <div style="background: #f1f5f9; padding: 12px; border-radius: 6px;">${message}</div>
                </div>
              `
            })
          });
        } catch (e) {
          console.warn('Email dispatch warning:', e);
        }
      }

      res.json({ success: true, targetEmail, message: `Inquiry registered for ${targetEmail}` });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Inquiry processing failed' });
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
