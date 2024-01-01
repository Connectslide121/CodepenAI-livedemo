import React, { useState, useEffect } from "react";
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

  //Initialize AI code string variables
  const htmlAI = "";
  const cssAI = "";
  const jsAI = "";

  // Function to update states when new code is received
  const updateCodeFromAI = (htmlAI, cssAI, jsAI) => {
    setHtml(htmlAI);
    setCss(cssAI);
    setJs(jsAI);
  };

  useEffect(() => {
    updateCodeFromAI(htmlAI, cssAI, jsAI);
  }, [htmlAI, cssAI, jsAI]);

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
      const htmlCodeWithImages = addImages(htmlCode);

      setHtml(codeAI[0]);
      setCss(codeAI[1]);
      setJs(codeAI[2]);
    }
    requestAPI();
  };

  const addImages = (htmlCode) => {
    // Create a temporary element (a div) to hold the HTML code
    var tempElement = document.createElement("div");
    tempElement.innerHTML = htmlCode;

    // Find all image elements within the temporary element
    var imageElements = tempElement.getElementsByTagName("img");

    // Check if there are any image elements
    const containsImages = imageElements.length > 0;

    // Clean up the temporary element (optional, but good practice)
    tempElement = null;

    console.log("HTML contains images:", containsImages);

    // return htmlWithImages;
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
