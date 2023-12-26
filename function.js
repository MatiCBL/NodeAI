import { openai } from "./openai.js";
import math from "advanced-calculator";
const QUESTION = process.argv[2] || "hi";

const messages = [
  {
    role: "user",
    content: QUESTION,
  },
];

const functions = {
  calculate({ expression }) {
    return math.evaluate(expression);
  },
};

const getCompletion = async (messages) => {
  return openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    messages,
    functions: [
      {
        name: "calculate",
        description: "Run a math expression",
        parameters: {
          type: "object",
          properties: {
            expression: {
              type: "string",
              description:
                'The math expression to evaluate like "2 * 3 + (21 / 2 ) ^ 2"',
            },
          },
          required: ["expression"],
        },
      },
    ],
    temperature: 0,
  });

  return response;
};
