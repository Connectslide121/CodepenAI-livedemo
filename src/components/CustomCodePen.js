import React, { useEffect, useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript as jsLanguage } from "@codemirror/lang-javascript";
import { html as htmlLanguage } from "@codemirror/lang-html";
import { css as cssLanguage } from "@codemirror/lang-css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { faCss3Alt } from "@fortawesome/free-brands-svg-icons";
import { faJs } from "@fortawesome/free-brands-svg-icons";
// import { faGear } from "@fortawesome/free-solid-svg-icons";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Codepen({
  html: initialHtml,
  css: initialCss,
  js: initialJs
}) {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [output, setOutput] = useState("");
  const [outputHeight, setOutputHeight] = useState("");

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
      const extraHeight = 40;
      const iframeHeight = contentHeight + extraHeight;
      setOutputHeight(`${iframeHeight}px`);
    };
  }, [html, css, js]);

  useEffect(() => {
    updateOutput();
    return () => {
      const iframe = document.querySelector(".output-frame");
      iframe.onload = null; // Clear the onLoad handler on component unmount
    };
  }, [updateOutput]);

  return (
    <>
      <div className="code-boxes">
        {/* html box*/}

        <div className="code-box html-box">
          <div className="box-header">
            <div className="box-title">
              <FontAwesomeIcon className="html-icon" icon={faHtml5} />
              <p>HTML</p>
            </div>
          </div>
          <div>
            <CodeMirror
              value={html}
              theme={"dark"}
              height="40vh"
              extensions={[htmlLanguage()]}
              onChange={(value) => {
                setHtml(value);
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
          </div>
          <div>
            <CodeMirror
              value={css}
              theme={"dark"}
              height="40vh"
              extensions={[cssLanguage()]}
              onChange={(value) => {
                setCss(value);
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
          </div>
          <div>
            <CodeMirror
              value={js}
              theme={"dark"}
              height="40vh"
              extensions={[jsLanguage({ jsx: false })]}
              onChange={(value) => {
                setJs(value);
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
    </>
  );
}
