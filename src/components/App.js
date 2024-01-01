import React, { useState, useEffect } from "react";
import "../style.css";
import Codepen from "./CustomCodePen.jsx";
import InputArea from "./InputArea.jsx";
import Header from "./Header.jsx";
import { PromptBuilder } from "./PromptBuilder.jsx";

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

  const handleSubmit = (userMessage) => {
    PromptBuilder(userMessage, currentCode);
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
