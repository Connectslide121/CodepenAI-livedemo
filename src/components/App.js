import React, { useState, useEffect } from "react";
import "../style.css";
import Codepen from "./CustomCodePen.js";
import InputArea from "./InputArea.js";
import Header from "./Header.js";

function App() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  //Initialize AI code string variables
  const htmlAI = "";
  const cssAI = "";
  const jsAI = "";

  // Simulating receiving new code strings
  // const htmlAI = "<h1>hello, world!</h1>";
  // const cssAI = "h1 { color: blue; background:yellow; }";
  // const jsAI = 'console.log("Hello from JavaScript!");';

  // Function to update states when new code is received
  const updateCode = (htmlAI, cssAI, jsAI) => {
    setHtml(htmlAI);
    setCss(cssAI);
    setJs(jsAI);
  };

  useEffect(() => {
    updateCode(htmlAI, cssAI, jsAI);
  }, [htmlAI, cssAI, jsAI]); // Empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <Header />
      <InputArea />
      <Codepen html={html} css={css} js={js} />
    </>
  );
}

export default App;
