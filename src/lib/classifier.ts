
import { OpenAI } from "openai";

import { OpenAIStream } from "ai";



// create a new OpenAI client using our key from earlier

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



export const classifyImage = async (file: File) => {

  // encode our file as a base64 string so it can be sent in an HTTP request

  const encoded = await file

    .arrayBuffer()

    .then((buffer) => Buffer.from(buffer).toString("base64"));



  // create an OpenAI request with a prompt

  const completion = await openAi.chat.completions.create({

    model: "gpt-4o",

    messages: [

      {

        role: "user",

        content: [

          {

            type: "text",

            text: "Describe this image as if you were trying to find evidence for a crime scene. very serious, concise, and straightforward tone",

          },

          {

            type: "image_url",

            image_url: {

              url: `data:image/jpeg;base64,${encoded}`,

            },

          },

        ],

      },

    ],

    stream: true,

    max_tokens: 1000,

  });



  // stream the response

  return OpenAIStream(completion);

};