import React, { useEffect, useState, useCallback } from "react";
import JSZip from "jszip";
import CodeMirror from "@uiw/react-codemirror";
import { color } from "@uiw/codemirror-extensions-color";
import { html as htmlLanguage } from "@codemirror/lang-html";
import { css as cssLanguage } from "@codemirror/lang-css";
import { javascript as jsLanguage } from "@codemirror/lang-javascript";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { faCss3Alt } from "@fortawesome/free-brands-svg-icons";
import { faJs } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export default function Codepen({
  html: htmlAI,
  css: cssAI,
  js: jsAI,
  onCodeChange
}) {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [outputHeight, setOutputHeight] = useState("");
  const [htmlTheme, setHtmlTheme] = useState("dark");
  const [cssTheme, setCssTheme] = useState("dark");
  const [jsTheme, setJsTheme] = useState("dark");
  const [htmlHistory, setHtmlHistory] = useState([]);
  const [htmlRedoHistory, setHtmlRedoHistory] = useState([]);
  const [cssHistory, setCssHistory] = useState([]);
  const [cssRedoHistory, setCssRedoHistory] = useState([]);
  const [jsHistory, setJsHistory] = useState([]);
  const [jsRedoHistory, setJsRedoHistory] = useState([]);

  const updateOutput = useCallback(() => {
    const iframe = document.querySelector(".output-frame");

    // Combine HTML, CSS, and JavaScript code
    const combinedOutput = `
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
        </html>
    `;

    // Set the output content
    setOutput(combinedOutput);

    // Set an onLoad event handler for the iframe
    iframe.onload = () => {
      // Calculate and set the new height
      const contentHeight = iframe.contentWindow.document.body.scrollHeight;
      const extraHeight = 50;
      const iframeHeight = contentHeight + extraHeight;
      setOutputHeight(`${iframeHeight}px`);
    };

    // Notify the parent component about code changes
    const newCodeValue = `Current html: \n\
    ${html}\n\
    \n\
    Current CSS: \n\
    ${css}\n\
    \n\
    Current Javascript: \n\
    ${js}`;
    onCodeChange(newCodeValue);
  }, [html, css, js, onCodeChange]);

  const toggleTheme = (language) => {
    switch (language) {
      case "html":
        setHtmlTheme(htmlTheme === "dark" ? "light" : "dark");
        break;
      case "css":
        setCssTheme(cssTheme === "dark" ? "light" : "dark");
        break;
      case "js":
        setJsTheme(jsTheme === "dark" ? "light" : "dark");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    updateOutput();
    return () => {
      const iframe = document.querySelector(".output-frame");
      iframe.onload = null; // Clear the onLoad handler on component unmount
    };
  }, [html, css, js, updateOutput]);

  useEffect(() => {
    setHtml(htmlAI);
    updateHtmlHistory();
  }, [htmlAI]);

  useEffect(() => {
    setCss(cssAI);
    updateCssHistory();
  }, [cssAI]);

  useEffect(() => {
    setJs(jsAI);
    updateJsHistory();
  }, [jsAI]);

  //********************* undo redo functions **************************/

  const updateHtmlHistory = () => {
    setHtmlHistory((prevHistory) => [...prevHistory, html]);
    setHtmlRedoHistory([]);
  };

  const undoHtml = () => {
    const previousHtml = htmlHistory[htmlHistory.length - 1];
    if (previousHtml !== undefined) {
      setHtmlHistory((prevHistory) => prevHistory.slice(0, -1));
      setHtmlRedoHistory((prevRedoHistory) => [...prevRedoHistory, html]);
      setHtml(previousHtml);
    }
  };

  const redoHtml = () => {
    const redoHtmlState = htmlRedoHistory[htmlRedoHistory.length - 1];
    if (redoHtmlState !== undefined) {
      setHtmlRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
      setHtmlHistory((prevHistory) => [...prevHistory, html]);
      setHtml(redoHtmlState);
    }
  };

  const updateCssHistory = () => {
    setCssHistory((prevHistory) => [...prevHistory, css]);
    setCssRedoHistory([]);
  };

  const undoCss = () => {
    const previousCss = cssHistory[cssHistory.length - 1];
    if (previousCss !== undefined) {
      setCssHistory((prevHistory) => prevHistory.slice(0, -1));
      setCssRedoHistory((prevRedoHistory) => [...prevRedoHistory, css]);
      setCss(previousCss);
    }
  };

  const redoCss = () => {
    const redoCssState = cssRedoHistory[cssRedoHistory.length - 1];
    if (redoCssState !== undefined) {
      setCssRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
      setCssHistory((prevHistory) => [...prevHistory, css]);
      setCss(redoCssState);
    }
  };

  const updateJsHistory = () => {
    setJsHistory((prevHistory) => [...prevHistory, js]);
    setJsRedoHistory([]);
  };

  const undoJs = () => {
    const previousJs = jsHistory[jsHistory.length - 1];
    if (previousJs !== undefined) {
      setJsHistory((prevHistory) => prevHistory.slice(0, -1));
      setJsRedoHistory((prevRedoHistory) => [...prevRedoHistory, js]);
      setJs(previousJs);
    }
  };

  const redoJs = () => {
    const redoJsState = jsRedoHistory[jsRedoHistory.length - 1];
    if (redoJsState !== undefined) {
      setJsRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
      setJsHistory((prevHistory) => [...prevHistory, js]);
      setJs(redoJsState);
    }
  };

  //********************* download project **************************/

  const downloadFolder = () => {
    const folderContent = {
      "index.html": html,
      "styles.css": css,
      "script.js": js
    };

    const zip = new JSZip();

    Object.keys(folderContent).forEach((fileName) => {
      zip.file(fileName, folderContent[fileName]);
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      const blob = new Blob([content], { type: "application/zip" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "codepenAI-project.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  //********************* clear project **************************/

  const clearProject = () => {
    setHtml("");
    setCss("");
    setJs("");
  };

  return (
    <div className="codepen">
      <div className="codepen-header">
        <button title="Download project zip" onClick={() => downloadFolder()}>
          <FontAwesomeIcon icon={faDownload} /> Download project
        </button>
        <button title="Clear project" onClick={() => clearProject()}>
          <FontAwesomeIcon icon={faTrashCan} /> Clear project
        </button>
      </div>
      <div className="code-boxes">
        {/* html box*/}
        <div className="code-box html-box">
          <div className="box-header">
            <div className="box-title">
              <FontAwesomeIcon className="html-icon" icon={faHtml5} />
              <p>HTML</p>
            </div>
            <div className="box-controls">
              <button title="Undo" onClick={() => undoHtml()}>
                <FontAwesomeIcon icon={faRotateLeft} />
              </button>
              <button title="Redo" onClick={() => redoHtml()}>
                <FontAwesomeIcon icon={faRotateRight} />
              </button>
              <button
                title="Copy code"
                onClick={() => navigator.clipboard.writeText(html)}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              <button
                title="Clear code"
                onClick={() => {
                  setHtml("");
                  updateHtmlHistory();
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
              <button title="Toggle theme" onClick={() => toggleTheme("html")}>
                <FontAwesomeIcon icon={faPalette} />
              </button>{" "}
            </div>
          </div>
          <div>
            <CodeMirror
              className="htmlCodeBox"
              value={html}
              theme={htmlTheme}
              height="350px"
              extensions={[htmlLanguage(), color]}
              onChange={(value) => {
                setHtml(value);
                updateHtmlHistory();
              }}
            />
          </div>
        </div>
        {/* css box*/}
        <div className="code-box css-box">
          <div className="box-header">
            <div className="box-title">
              <FontAwesomeIcon className="css-icon" icon={faCss3Alt} />
              <p>CSS</p>
            </div>
            <div className="box-controls">
              <button title="Undo" onClick={() => undoCss()}>
                <FontAwesomeIcon icon={faRotateLeft} />
              </button>
              <button title="Redo" onClick={() => redoCss()}>
                <FontAwesomeIcon icon={faRotateRight} />
              </button>
              <button
                title="Copy code"
                onClick={() => navigator.clipboard.writeText(css)}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              <button
                title="Clear code"
                onClick={() => {
                  setCss("");
                  updateCssHistory();
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
              <button title="Toggle theme" onClick={() => toggleTheme("css")}>
                <FontAwesomeIcon icon={faPalette} />
              </button>{" "}
            </div>
          </div>
          <div>
            <CodeMirror
              className="cssCodeBox"
              value={css}
              theme={cssTheme}
              height="350px"
              extensions={[cssLanguage(), color]}
              onChange={(value) => {
                setCss(value);
                updateCssHistory();
              }}
            />
          </div>
        </div>
        {/* javascript box*/}
        <div className="code-box js-box">
          <div className="box-header">
            <div className="box-title">
              <FontAwesomeIcon className="js-icon" icon={faJs} />
              <p>JS</p>
            </div>
            <div className="box-controls">
              <button title="Undo" onClick={() => undoJs()}>
                <FontAwesomeIcon icon={faRotateLeft} />
              </button>
              <button title="Redo" onClick={() => redoJs()}>
                <FontAwesomeIcon icon={faRotateRight} />
              </button>
              <button
                title="Copy code"
                onClick={() => navigator.clipboard.writeText(js)}
              >
                <FontAwesomeIcon icon={faCopy} />
              </button>
              <button
                title="Clear code"
                onClick={() => {
                  setJs("");
                  updateJsHistory();
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
              <button title="Toggle theme" onClick={() => toggleTheme("js")}>
                <FontAwesomeIcon icon={faPalette} />
              </button>{" "}
            </div>
          </div>
          <div>
            <CodeMirror
              className="jsCodeBox"
              value={js}
              theme={jsTheme}
              height="350px"
              extensions={[jsLanguage({ jsx: false }), color]}
              onChange={(value) => {
                setJs(value);
                updateJsHistory();
              }}
            />
          </div>
        </div>
      </div>
      {/* preview box*/}
      <div className="preview">
        <div className="box-title preview-title">
          <FontAwesomeIcon className="preview-icon" icon={faMagnifyingGlass} />
          <p>PREVIEW</p>
        </div>
        <iframe
          className="output-frame"
          title="Result"
          srcDoc={output}
          style={{ height: outputHeight }}
        />
      </div>
    </div>
  );
}
