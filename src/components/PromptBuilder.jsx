import callAPI from "./OpenaiAPI";

export function PromptBuilder(userInput, currentCode) {
  const prompt = ` User input: ${userInput}. Current state of the code blocks:  ${currentCode}`;

  console.log(prompt);

  // async function requestAPI() {
  //   const response = await callAPI(prompt);
  //   console.log(response.message.content);
  // }
  callAPI(prompt);
}
