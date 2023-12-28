import React, { useState, useEffect } from "react";
import "../style.css";
import Codepen from "./CustomCodePen.js";
import InputArea from "./InputArea.js";
import Header from "./Header.js";

function App() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  // Function to update states when new code is received
  const updateCode = (newHtml, newCss, newJs) => {
    setHtml(newHtml);
    setCss(newCss);
    setJs(newJs);
  };

  // Simulating receiving new code strings
  const newHtml = "<div>hello, world!</div>";
  const newCss = "div { color: blue; }";
  const newJs = 'console.log("Hello from JavaScript!");';

  useEffect(() => {
    // Update states when new code is received
    updateCode(newHtml, newCss, newJs);
  }, [newHtml, newCss, newJs]); // Empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <Header />
      <InputArea />
      <Codepen html={html} css={css} js={js} />
    </>
  );
}

export default App;
