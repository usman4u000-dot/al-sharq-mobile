import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generate() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  console.log("Generating image...");
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: "A clean, organized technician's workbench with a disassembled modern smartphone and a sleek laptop. The vibe should be professional, with excellent lighting and a modern blue and white color scheme.",
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: "2K"
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64EncodeString = part.inlineData.data;
      const outputPath = path.join(__dirname, '../public/hero-bg-ai.jpg');
      fs.writeFileSync(outputPath, Buffer.from(base64EncodeString, 'base64'));
      console.log('Image saved to', outputPath);
      return;
    }
  }
  console.log("No image found in response");
}

generate().catch(console.error);
