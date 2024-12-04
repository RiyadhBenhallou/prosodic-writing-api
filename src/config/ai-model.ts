import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};
export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

// async function run() {
//   const chatSession = model.startChat({
//     generationConfig,
//     history: [],
//   });

//   const result = await chatSession.sendMessage('INSERT_INPUT_HERE');
//   console.log(result.response.text());
// }

// run();
