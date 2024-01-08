import React, { useState } from "react";
import "../style.css";

import Codepen from "./CustomCodePen.jsx";
import InputArea from "./InputArea.jsx";
import Header from "./Header.jsx";
import CallAI from "./OpenaiAPI";
import SearchImages from "./Unsplash.jsx";
import LoadingState from "./LoadingState.jsx";

function App() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [currentCode, setCurrentCode] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleCodeChangeFromUser = (newCode) => {
    setCurrentCode(newCode);
  };

  function PromptBuilder(userInput) {
    const prompt = `User input:\n\
  ${userInput}.\n\
    \n\
  Current state of the code blocks:\n\
  ${currentCode}`;

    return prompt;
  }

  const handleSubmit = (userMessage, apiKey) => {
    async function requestAPI() {
      setLoadingMessage("Generating code...");
      const codeAI = await CallAI(PromptBuilder(userMessage), apiKey);

      const htmlCode = codeAI[0];
      const htmlCodeWithImages = await addImages(htmlCode);

      setHtml(htmlCodeWithImages);
      setCss(codeAI[1]);
      setJs(codeAI[2]);
    }
    requestAPI();
  };

  const addImages = async (htmlCode) => {
    setLoadingMessage("Getting images...");

    // Define a regular expression to find image tags with the alt attribute
    const imgRegex = /<img(?:\s+[^>]+)?\s+alt=["'](.*?)["'][^>]*>/g;
    const altRegex = /alt=["'](.*?)["']/;
    const srcRegex = /src=["'](.*?)["']/;

    // Use match to find all image tags with the specified alt attribute
    const imgMatches = htmlCode.match(imgRegex);

    // Check if there are any matches
    if (imgMatches) {
      // Use Promise.all to wait for all async operations to complete
      const modifiedHtml = await Promise.all(
        imgMatches.map(async (imgTag) => {
          // Extract alt text from the matched image tag
          const altTextMatch = imgTag.match(altRegex);
          const altText = altTextMatch ? altTextMatch[1] : "";

          // Call the searchImages function and wait for the result
          const imageObject = await SearchImages(altText);

          if (imageObject) {
            // Replace the src attribute in the matched image tag
            return imgTag.replace(srcRegex, `src="${imageObject.urls.small}"`);
          } else {
            // If imageObject is not available, return the original match
            return imgTag;
          }
        })
      );

      // Replace the modified image tags in the original HTML code
      let index = 0;
      const finalHtml = htmlCode.replace(imgRegex, () => modifiedHtml[index++]);

      setLoadingMessage("");
      return finalHtml;
    } else {
      setLoadingMessage("");
      // If there are no matches, return the original HTML code
      return htmlCode;
    }
  };

  const updateImages = async (htmlToUpdate) => {
    const updatedHtml = await addImages(htmlToUpdate);
    setHtml(updatedHtml);
  };

  return (
    <>
      <Header />
      <InputArea onUserSubmit={handleSubmit} />
      <LoadingState message={loadingMessage} />
      <Codepen
        html={html}
        css={css}
        js={js}
        onCodeChange={handleCodeChangeFromUser}
        updateImages={updateImages}
      />
    </>
  );
}

export default App;
