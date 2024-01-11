import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiKey } from "../functions/config";
import promptContext from "../functions/promptContext.js";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(geminiKey);

export default async function CallGemini(userPrompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = promptContext + userPrompt;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}
