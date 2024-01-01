import OpenAI from "openai";
import apiKey from "./config.js";
import promptContext from "./promptContext.js";
import { HandleResponseFromAPI } from "./ResponseSpliter.jsx";

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export default async function CallAPI(prompt) {
  const options = {
    messages: [{ role: "system", content: promptContext + prompt }],
    model: "gpt-3.5-turbo-1106"
  };
  const response = await openai.chat.completions.create(options);
  console.log(options);
  return HandleResponseFromAPI(response.choices[0].message.content);
}
