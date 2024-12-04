import { BadRequestException, Injectable } from '@nestjs/common';
import { chatSession } from './config/ai-model';
import { prompt } from './utils/prompt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async genProsidic(sentence: string): Promise<string> {
    const fullPrompt = prompt(sentence);
    console.log(process.env.GEMINI_API_KEY);
    const result = await chatSession.sendMessage(fullPrompt);
    const output = result.response.text();
    // Find the starting and ending braces of the JSON object
    const startIndex = output.indexOf('{');
    const endIndex = output.lastIndexOf('}') + 1;

    // Extract the JSON string
    if (startIndex !== -1 && endIndex !== -1) {
      const jsonString = output.substring(startIndex, endIndex);

      try {
        const parsedData = JSON.parse(jsonString);
        return parsedData;
      } catch (error) {
        console.error('Invalid JSON:', error);
        throw new BadRequestException();
      }
    } else {
      console.error('No valid JSON found.');
      throw new BadRequestException();
    }
  }
}
