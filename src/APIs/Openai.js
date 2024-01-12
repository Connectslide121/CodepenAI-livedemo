import OpenAI from "openai";
import { openaiKey as configApiKey } from "../functions/config.js";
import promptContext from "../functions/promptContext.js";
import { HandleResponseFromAPI } from "../functions/ResponseSpliter.js";

export default async function CallOpenai(prompt, apiKey) {
  const API_KEY = configApiKey || apiKey;
  const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

  const options = {
    messages: [{ role: "system", content: promptContext + prompt }],
    model: "gpt-3.5-turbo-1106"
    // model: "gpt-4-1106-preview"
  };

  const responseObject = await openai.chat.completions.create(options);
  const responseCode = responseObject.choices[0].message.content;

  return HandleResponseFromAPI(responseCode);
}
