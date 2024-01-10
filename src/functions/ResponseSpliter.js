export function HandleResponseFromAPI(response) {
  const codeBlocks = response.match(/```([\s\S]+?)```/g);

  if (!codeBlocks) {
    // No code blocks found, return an empty string or handle it as needed
    return "";
  }

  // Extract code content and sort based on the first line
  const sortedCode = codeBlocks
    .map((block) => ({
      language: block.match(/^```([^\n]+)\n/)[1], // Extract language from the first line
      content: block.replace(/^```([^\n]+)\n/, "").replace(/```$/, "") // Remove first line and closing triple backticks
    }))
    .sort((a, b) => {
      const order = { html: 0, css: 1, javascript: 2 };
      return order[a.language] - order[b.language];
    });

  const extractedCode = sortedCode.map((block) => block.content);
  return extractedCode;
}
