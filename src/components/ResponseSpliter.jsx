export function HandleResponseFromAPI(response) {
  const codeBlocks = response.match(/```([\s\S]+?)```/g);

  if (!codeBlocks) {
    // No code blocks found, return an empty string or handle it as needed
    return "";
  }

  // Extract code content from each code block
  const extractedCode = codeBlocks.map((block) =>
    block.replace(/^```([\s\S]+?)\n/, "").replace(/```$/, "")
  );

  return extractedCode;
}
