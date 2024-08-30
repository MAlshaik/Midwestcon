
import { OpenAI } from "openai";

import { OpenAIStream } from "ai";



// create a new OpenAI client using our key from earlier

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



export const compareScenes = async (description: string[]) => {

  // encode our file as a base64 string so it can be sent in an HTTP request


  // create an OpenAI request with a prompt

  const completion = await openAi.chat.completions.create({

    model: "gpt-4o",

    messages: [

      {

        role: "user",

        content: [

          {

            type: "text",

            text: `Compare the following crime scenes and write a report in a police styled report of the similarities of the crime scenes and what that could entail : ${description.join(", ")}`,

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

