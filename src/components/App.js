import React, { useState } from "react";
import "../style.css";
import Codepen from "./CustomCodePen.jsx";
import InputArea from "./InputArea.jsx";
import Header from "./Header.jsx";
import CallAPI from "./OpenaiAPI";

function App() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [currentCode, setCurrentCode] = useState("");

  const handleCodeChangeFromUser = (newCode) => {
    setCurrentCode(newCode);
  };

  function PromptBuilder(userInput) {
    const prompt = `User input: ${userInput}.\n\
    \n\
  Current state of the code blocks:  ${currentCode}`;

    return prompt;
  }

  const handleSubmit = (userMessage) => {
    async function requestAPI() {
      const codeAI = await CallAPI(PromptBuilder(userMessage));

      const htmlCode = codeAI[0];
      const htmlCodeWithImages = await addImages(htmlCode);

      console.log(htmlCode);
      console.log(htmlCodeWithImages);

      setHtml(htmlCodeWithImages);
      setCss(codeAI[1]);
      setJs(codeAI[2]);
    }
    requestAPI();
  };

  async function searchImages(query) {
    const url = `https://api.unsplash.com/search/photos?page=${1}&query=${query}&client_id=${"HUBfBOYAY2krhsIhIpu7c0OgMgGPY3ru198GUXrXBy0"}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    return results[0];
  }

  const addImages = async (htmlCode) => {
    // Log the original HTML code
    console.log(htmlCode);

    // Define a regular expression to find image tags with the alt attribute
    const imgRegex = /<img[^>]+alt=["'](.*?)["'][^>]*>/g;

    // Use match to find all image tags with the specified alt attribute
    const imgMatches = htmlCode.match(imgRegex);

    // Check if there are any matches
    if (imgMatches) {
      // Use Promise.all to wait for all async operations to complete
      const modifiedHtml = await Promise.all(
        imgMatches.map(async (imgTag) => {
          // Extract alt text from the matched image tag
          const altTextMatch = imgTag.match(/alt=["'](.*?)["']/);
          const altText = altTextMatch ? altTextMatch[1] : "";

          // Call the searchImages function and wait for the result
          const imageObject = await searchImages(altText);

          if (imageObject) {
            // Replace the src attribute in the matched image tag
            return imgTag.replace(
              /src=["'](.*?)["']/,
              `src="${imageObject.urls.small}"`
            );
          } else {
            // If imageObject is not available, return the original match
            return imgTag;
          }
        })
      );

      // Replace the modified image tags in the original HTML code
      let index = 0;
      const finalHtml = htmlCode.replace(imgRegex, () => modifiedHtml[index++]);

      // Log the modified HTML code
      console.log(finalHtml);

      return finalHtml;
    } else {
      // If there are no matches, return the original HTML code
      return htmlCode;
    }
  };
  return (
    <>
      <Header />
      <InputArea onUserSubmit={handleSubmit} />
      <Codepen
        html={html}
        css={css}
        js={js}
        onCodeChange={handleCodeChangeFromUser}
      />
    </>
  );
}

export default App;
