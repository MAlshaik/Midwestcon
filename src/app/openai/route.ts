import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest) {
  const { prompt, type } = await req.json();

  if (!prompt || !type) {
    return NextResponse.json({ error: 'Prompt and type are required' }, { status: 400 });
  }

  try {
    if (type === 'text') {
      const completion = await openai.createCompletion({
        model: 'text-davinci-004',
        prompt,
        max_tokens: 150,
      });

      const result = completion.data.choices[0].text;
      return NextResponse.json({ result });
    } else if (type === 'image') {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: prompt,
          n: 1,
          size: '1024x1024',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const imageUrl = response.data.data[0].url;
      return NextResponse.json({ imageUrl });
    } else {
      return NextResponse.json({ error: 'Invalid type specified' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
