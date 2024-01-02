import OpenAI from "openai";
import apiKey from "./config.js";
import promptContext from "./promptContext.js";
import { HandleResponseFromAPI } from "./ResponseSpliter.jsx";

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export default async function CallAPI(prompt) {
  const options = {
    messages: [
      { role: "system", content: promptContext },
      { role: "user", content: prompt }
    ],
    model: "gpt-3.5-turbo-1106"
  };
  console.log("Calling API:", options);

  const responseObject = await openai.chat.completions.create(options);
  const responseCode = responseObject.choices[0].message.content;

  console.log("Response from API (object):", responseObject);
  return HandleResponseFromAPI(responseCode);
}
