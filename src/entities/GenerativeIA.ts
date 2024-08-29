import { GoogleGenerativeAI } from '@google/generative-ai';

export class GenerativeIA {

  private GEMINI_API_KEY: string;

  constructor() {
    if(!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not provided');
    }

    this.GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  }

  async readMeterImage(data: string) {

    const genAI = new GoogleGenerativeAI(this.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = 'Extraia e identifique os números exibidos no mostrador do medidor da imagem fornecida. Forneça a leitura como um número contínuo. Apenas responda com a leitura numérica, sem texto adicional ou formatação. Não use vírgulas.';
    const image = {
      inlineData: {
        data: data,
        mimeType: 'image/png'
      }
    }
    const generatedContent = await model.generateContent([image, prompt]);
    const response = generatedContent.response.text();
    const value = isNaN(+response) ?0 :+response;

    return value;

  }
}