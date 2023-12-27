import React, { useEffect, useState, useCallback } from "react";
import SplitPane from "react-split-pane";
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

export default function Codepen() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");

  const updateOutput = useCallback(() => {
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
    setOutput(combinedOutput);
  }, [html, css, js]);

  useEffect(() => {
    updateOutput();
  }, [updateOutput]);

  return (
    <SplitPane
      split="horizontal"
      minSize={0}
      maxSize={-100}
      defaultSize={"70%"}
    >
      <div className="code-boxes">
        <SplitPane
          split="vertical"
          minSize={100}
          maxSize={-100}
          defaultSize={"33%"}
        >
          {/* html box*/}

          <div className="html-box">
            <div className="box-header">
              <div className="box-title">
                <FontAwesomeIcon className="html-icon" icon={faHtml5} />
                <p>HTML</p>
              </div>
              {/* <div className="pane-controls">
              <FontAwesomeIcon icon={faGear} />
              <FontAwesomeIcon icon={faChevronDown} />
            </div> */}
            </div>
            <div>
              <CodeMirror
                value={html}
                theme={"dark"}
                height="50vh"
                extensions={[htmlLanguage()]}
                onChange={(value) => {
                  setHtml(value);
                }}
              />
            </div>
          </div>
          <SplitPane
            split="vertical"
            minSize={100}
            maxSize={-100}
            defaultSize={"50%"}
          >
            {/* css box*/}

            <div className="css-box">
              <div className="box-header">
                <div className="box-title">
                  <FontAwesomeIcon className="css-icon" icon={faCss3Alt} />
                  <p>CSS</p>
                </div>
                {/* <div className="pane-controls">
                <FontAwesomeIcon icon={faGear} />
                <FontAwesomeIcon icon={faChevronDown} />
              </div> */}
              </div>
              <div>
                <CodeMirror
                  value={css}
                  theme={"dark"}
                  height="50vh"
                  extensions={[cssLanguage()]}
                  onChange={(value) => {
                    setCss(value);
                  }}
                />
              </div>
            </div>

            {/* javascript box*/}

            <div className="js-box">
              <div className="box-header">
                <div className="box-title">
                  <FontAwesomeIcon className="js-icon" icon={faJs} />
                  <p>JS</p>
                </div>
                {/* <div className="pane-controls">
                <FontAwesomeIcon icon={faGear} />
                <FontAwesomeIcon icon={faChevronDown} />
              </div> */}
              </div>
              <div>
                <CodeMirror
                  value={js}
                  theme={"dark"}
                  height="50vh"
                  extensions={[jsLanguage({ jsx: false })]}
                  onChange={(value) => {
                    setJs(value);
                  }}
                />
              </div>
            </div>
          </SplitPane>
        </SplitPane>
      </div>
      <div className="preview">
        <div className="box-title preview-title">
          <FontAwesomeIcon className="preview-icon" icon={faMagnifyingGlass} />
          <p>PREVIEW</p>
        </div>

        <iframe className="output-frame" title="Result" srcDoc={output} />
      </div>
    </SplitPane>
  );
}
