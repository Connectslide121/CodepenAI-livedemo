import OpenAI from "openai";
import { apiKey as configApiKey } from "./config.js";
import promptContext from "./promptContext.js";
import { HandleResponseFromAPI } from "./ResponseSpliter.jsx";

export default async function CallAPI(prompt, apiKey) {
  const API_KEY = configApiKey || apiKey;
  const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

  const options = {
    messages: [{ role: "system", content: promptContext + prompt }],
    model: "gpt-3.5-turbo-1106"
  };
  // console.log("Calling API:", options);

  const responseObject = await openai.chat.completions.create(options);
  const responseCode = responseObject.choices[0].message.content;

  // console.log("Response from API (object):", responseObject);
  return HandleResponseFromAPI(responseCode);
}
