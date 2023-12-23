import React, { useEffect, useState } from "react";
import SplitPane from "react-split-pane";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

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

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const updateOutput = () => {
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
  };

  return (
    <SplitPane
      split="horizontal"
      minSize={0}
      maxSize={-100}
      defaultSize={"45%"}
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
                extensions={[javascript({ jsx: true })]}
                onChange={(value, viewUpdate) => {
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
                  extensions={[javascript({ jsx: true })]}
                  onChange={(value, viewUpdate) => {
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
                  extensions={[javascript({ jsx: true })]}
                  onChange={(value, viewUpdate) => {
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
