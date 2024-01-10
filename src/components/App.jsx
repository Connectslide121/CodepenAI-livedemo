import React, { useState } from "react";
import "../style.css";

import Codepen from "./CustomCodePen.jsx";
import InputArea from "./InputArea.jsx";
import Header from "./Header.jsx";
import CallAI from "../APIs/Openai.js";
import LoadingState from "./LoadingState.jsx";

import { addImages } from "../functions/ImageAttatcher.js";
import { CreateProject, GetProjects } from "../APIs/API.js";

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
      setLoadingMessage("Getting images...");
      const htmlCodeWithImages = await addImages(htmlCode);

      setHtml(htmlCodeWithImages);
      setCss(codeAI[1]);
      setJs(codeAI[2]);
      setLoadingMessage("");
    }
    requestAPI();
  };

  const updateImages = async (htmlToUpdate) => {
    setLoadingMessage("Getting images...");
    const updatedHtml = await addImages(htmlToUpdate);
    setHtml(updatedHtml);
    setLoadingMessage("");
  };

  return (
    <>
      <Header />
      <InputArea onUserSubmit={handleSubmit} />
      <LoadingState message={loadingMessage} />
      <Codepen
        htmlCode={html}
        cssCode={css}
        jsCode={js}
        onCodeChange={handleCodeChangeFromUser}
        updateImages={updateImages}
        saveProject={CreateProject}
        openProjects={GetProjects}
      />
    </>
  );
}

export default App;
