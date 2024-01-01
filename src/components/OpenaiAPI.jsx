import OpenAI from "openai";
import apiKey from "./config.js";
import promptContext from "./promptContext.js";

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export default async function callAPI(prompt) {
  const options = {
    messages: [{ role: "system", content: promptContext + prompt }],
    model: "gpt-3.5-turbo-1106"
  };
  const response = await openai.chat.completions.create(options);

  handleResponseFromAPI(response);

  // console.log(options);

  // return completion.choices[0];
}
