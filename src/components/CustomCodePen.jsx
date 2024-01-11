import React, { useEffect, useState, useCallback } from "react";
import JSZip from "jszip";
import CodeMirror from "@uiw/react-codemirror";
import { color } from "@uiw/codemirror-extensions-color";
import { html as htmlLanguage } from "@codemirror/lang-html";
import { css as cssLanguage } from "@codemirror/lang-css";
import { javascript as jsLanguage } from "@codemirror/lang-javascript";
import * as themes from "@uiw/codemirror-themes-all";

import SaveProjectForm from "./SaveProjectForm.jsx";
import ProjectList from "./ProjectList.jsx";
import { GetProjectById, RemoveProjectById } from "../APIs/API";

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
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";

export default function Codepen({
  htmlCode: htmlAI,
  cssCode: cssAI,
  jsCode: jsAI,
  onCodeChange,
  updateImages,
  saveProject,
  updateProject
}) {
  const [htmlCode, setHtml] = useState("");
  const [cssCode, setCss] = useState("");
  const [jsCode, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [outputHeight, setOutputHeight] = useState("");
  const [theme, setTheme] = useState("dark");
  const [htmlUndoHistory, setHtmlUndoHistory] = useState([]);
  const [htmlRedoHistory, setHtmlRedoHistory] = useState([]);
  const [cssUndoHistory, setCssUndoHistory] = useState([]);
  const [cssRedoHistory, setCssRedoHistory] = useState([]);
  const [jsUndoHistory, setJsUndoHistory] = useState([]);
  const [jsRedoHistory, setJsRedoHistory] = useState([]);
  const [showSaveProjectForm, setShowSaveProjectForm] = useState(false);
  const [showOpenProjectList, setShowOpenProjectList] = useState(false);
  const [rerenderKey, setRerenderKey] = useState(0);
  const [openedId, setOpenedId] = useState("");
  const [openedTitle, setOpenedTitle] = useState("");
  const [openedDescription, setOpenedDescription] = useState("");
  const [openedCreateDate, setOpenedCreateDate] = useState("");
  const [isNewProject, setIsNewProject] = useState(true);

  const updateOutput = useCallback(() => {
    const iframe = document.querySelector(".output-frame");

    // Combine HTML, CSS, and JavaScript code
    const combinedOutput = `
        <html>
            <head>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>${jsCode}</script>
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
    ${htmlCode}\n\
    \n\
    Current CSS: \n\
    ${cssCode}\n\
    \n\
    Current Javascript: \n\
    ${jsCode}`;
    onCodeChange(newCodeValue);
  }, [htmlCode, cssCode, jsCode, onCodeChange]);

  useEffect(() => {
    updateOutput();
    return () => {
      const iframe = document.querySelector(".output-frame");
      iframe.onload = null; // Clear the onLoad handler on component unmount
    };
  }, [htmlCode, cssCode, jsCode, updateOutput]);

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
    setHtmlUndoHistory((prevHistory) => [...prevHistory, htmlCode]);
    setHtmlRedoHistory([]);
  };

  const undoHtml = () => {
    const previousHtml = htmlUndoHistory[htmlUndoHistory.length - 1];
    if (previousHtml !== undefined) {
      setHtmlUndoHistory((prevHistory) => prevHistory.slice(0, -1));
      setHtmlRedoHistory((prevRedoHistory) => [...prevRedoHistory, htmlCode]);
      setHtml(previousHtml);
    }
  };

  const redoHtml = () => {
    const redoHtmlState = htmlRedoHistory[htmlRedoHistory.length - 1];
    if (redoHtmlState !== undefined) {
      setHtmlRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
      setHtmlUndoHistory((prevHistory) => [...prevHistory, htmlCode]);
      setHtml(redoHtmlState);
    }
  };

  const updateCssHistory = () => {
    setCssUndoHistory((prevHistory) => [...prevHistory, cssCode]);
    setCssRedoHistory([]);
  };

  const undoCss = () => {
    const previousCss = cssUndoHistory[cssUndoHistory.length - 1];
    if (previousCss !== undefined) {
      setCssUndoHistory((prevHistory) => prevHistory.slice(0, -1));
      setCssRedoHistory((prevRedoHistory) => [...prevRedoHistory, cssCode]);
      setCss(previousCss);
    }
  };

  const redoCss = () => {
    const redoCssState = cssRedoHistory[cssRedoHistory.length - 1];
    if (redoCssState !== undefined) {
      setCssRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
      setCssUndoHistory((prevHistory) => [...prevHistory, cssCode]);
      setCss(redoCssState);
    }
  };

  const updateJsHistory = () => {
    setJsUndoHistory((prevHistory) => [...prevHistory, jsCode]);
    setJsRedoHistory([]);
  };

  const undoJs = () => {
    const previousJs = jsUndoHistory[jsUndoHistory.length - 1];
    if (previousJs !== undefined) {
      setJsUndoHistory((prevHistory) => prevHistory.slice(0, -1));
      setJsRedoHistory((prevRedoHistory) => [...prevRedoHistory, jsCode]);
      setJs(previousJs);
    }
  };

  const redoJs = () => {
    const redoJsState = jsRedoHistory[jsRedoHistory.length - 1];
    if (redoJsState !== undefined) {
      setJsRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
      setJsUndoHistory((prevHistory) => [...prevHistory, jsCode]);
      setJs(redoJsState);
    }
  };

  //********************* download project **************************/

  const downloadFolder = () => {
    const folderContent = {
      "index.html": htmlCode,
      "styles.css": cssCode,
      "script.js": jsCode
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

  //********************* new project **************************/
  const handleNewProjectButtonClick = () => {
    setIsNewProject(true);
    setShowOpenProjectList(false);
    setShowSaveProjectForm(false);
    setHtml("");
    setCss("");
    setJs("");
    setOpenedTitle("");
    setOpenedDescription("");
    setOpenedId("");
    setOpenedCreateDate("");
  };

  //********************* save project **************************/

  const handleSaveProjectButtonClick = () => {
    setShowSaveProjectForm((visible) => !visible);
    setShowOpenProjectList(false);
  };

  const saveButtonClass = showSaveProjectForm
    ? "header-button-active"
    : "codepen-header-button";

  const handleSaveProject = async (
    projectId,
    projectTitle,
    projectDescription,
    projectCreateDate
  ) => {
    if (isNewProject) {
      const projectInfo = {
        projectTitle,
        projectDescription,
        htmlCode,
        cssCode,
        jsCode
      };

      console.log("Is project new: ", isNewProject);
      await saveProject(projectInfo);
      setRerenderKey((prevKey) => prevKey + 1);
    } else {
      const projectInfo = {
        projectId,
        projectTitle,
        projectDescription,
        projectCreateDate,
        htmlCode,
        cssCode,
        jsCode
      };

      console.log("Is project new: ", isNewProject);
      await updateProject(projectInfo);
      setRerenderKey((prevKey) => prevKey + 1);
    }
  };

  //********************* open projects **************************/

  const handleOpenProjectsButtonClick = () => {
    setShowOpenProjectList((prevValue) => !prevValue);
    setShowSaveProjectForm(false);
  };

  const openButtonClass = showOpenProjectList
    ? "header-button-active"
    : "codepen-header-button";

  const openProjectById = async (projectId) => {
    const projectData = await GetProjectById(projectId);
    setHtml(projectData.htmlCode);
    setCss(projectData.cssCode);
    setJs(projectData.jsCode);
    setShowOpenProjectList(false);
    setHtmlUndoHistory([]);
    setCssUndoHistory([]);
    setJsUndoHistory([]);
    setOpenedTitle(projectData.title);
    setOpenedDescription(projectData.description);
    setOpenedId(projectData.projectId);
    setOpenedCreateDate(projectData.createdAt);
    setIsNewProject(false);
  };

  //********************* delete project **************************/

  const deleteProjectById = (projectId) => {
    RemoveProjectById(projectId);
    setRerenderKey((prevKey) => prevKey + 1);
  };

  //********************* clear project **************************/

  const clearProject = () => {
    setHtml("");
    setCss("");
    setJs("");
    updateHtmlHistory();
    updateCssHistory();
    updateJsHistory();
  };

  //********************* select theme **************************/

  const handleThemeChange = (e) => {
    const themeName = e.target.value;
    if (themeName === "dark") {
      setTheme("dark");
    } else setTheme(themes[themeName]);
  };

  //********************* return **************************/

  return (
    <div className="codepen">
      <div className="codepen-header">
        <button
          title="New project"
          onClick={handleNewProjectButtonClick}
          className="codepen-header-button"
        >
          <FontAwesomeIcon icon={faFile} /> New project
        </button>
        <button
          title="Save project"
          onClick={handleSaveProjectButtonClick}
          className={saveButtonClass}
        >
          <FontAwesomeIcon icon={faFloppyDisk} /> Save project
        </button>
        <button
          title="Open project"
          onClick={() => handleOpenProjectsButtonClick()}
          className={openButtonClass}
        >
          <FontAwesomeIcon icon={faFolderOpen} /> My projects
        </button>
        <button
          title="Download zip file"
          onClick={() => downloadFolder()}
          className="codepen-header-button"
        >
          <FontAwesomeIcon icon={faDownload} /> Download ZIP
        </button>
        <button
          title="Clear code in project"
          onClick={() => clearProject()}
          className="codepen-header-button"
        >
          <FontAwesomeIcon icon={faTrashCan} /> Clear code
        </button>
        <select
          name="Select theme"
          className="codepen-header-button"
          onChange={handleThemeChange}
        >
          <option value="dark">Default Dark theme</option>
          <option value="light">Default Light theme</option>
          <option value="abcdef">Abcdef theme</option>
          <option value="abyss">Abyss theme</option>
          <option value="androidstudio">AndroidStudio theme</option>
          <option value="andromeda">Andromeda theme</option>
          <option value="atomome">Atomome theme</option>
          <option value="aura">Aura theme</option>
          <option value="basicLight">Basic Light theme</option>
          <option value="basicDark">Basic Dark theme</option>
          <option value="bbedit">Bbedit theme</option>
          <option value="bespin">Bespin theme</option>
          <option value="copilot">Copilot theme</option>
          <option value="darcula">Darcula theme</option>
          <option value="dracula">Dracula theme</option>
          <option value="duotoneLight">Duotone Light theme</option>
          <option value="duotoneDark">Duotone Dark theme</option>
          <option value="eclipse">Eclipse Theme</option>
          <option value="githubLight">Github Light theme</option>
          <option value="githubDark">Github Dark theme</option>
          <option value="gruvboxDark">Gruvbox Dark theme</option>
          <option value="gruvboxLight">Gruvbox Light theme</option>
          <option value="kimbie">Kimbie theme</option>
          <option value="materialLight">Material Light theme</option>
          <option value="materialDark">Material Dark theme</option>
          <option value="monokai">Monokai theme</option>
          <option value="monokaiDimmed">Monokai Dimmed theme</option>
          <option value="noctisLilac">Noctis Lilac theme</option>
          <option value="nord">Nord theme</option>
          <option value="okaidia">Okaidia theme</option>
          <option value="red">Red theme</option>
          <option value="quietlight">Quietlight theme</option>
          <option value="solarizedLight">Solarized Light theme</option>
          <option value="solarizedDark">Solarized Dark theme</option>
          <option value="sublime">Sublime theme</option>
          <option value="tokyoNight">Tokyo Night theme</option>
          <option value="tokyoNightStorm">Tokyo Night Storm theme</option>
          <option value="tokyoNightDay">Tokyo Night Day theme</option>
          <option value="tomorrowNightBlue">Tomorrow Night Blue theme</option>
          <option value="vscodeDark">Vscode Dark theme</option>
          <option value="whiteLight">White Light theme</option>
          <option value="whiteDark">White Dark theme</option>
          <option value="xcodeLight">Xcode Light theme</option>
          <option value="xcodeDark">Xcode Dark theme</option>
        </select>
      </div>
      <div
        className={`save-project-form-dropdown ${
          showSaveProjectForm ? "active" : ""
        }`}
      >
        <SaveProjectForm
          handleSaveProject={handleSaveProject}
          openedTitle={openedTitle}
          openedDescription={openedDescription}
          openedId={openedId}
          openedCreateDate={openedCreateDate}
        />
      </div>
      <div
        className={`open-project-list-dropdown ${
          showOpenProjectList ? "active" : ""
        }`}
      >
        <ProjectList
          openProject={openProjectById}
          deleteProject={deleteProjectById}
          rerenderKey={rerenderKey}
        />
      </div>
      <div className="codepen">
        <div className="code-boxes">
          {/* html box*/}
          <div className="code-box html-box">
            <div className="box-header">
              <div className="box-title">
                <FontAwesomeIcon className="html-icon" icon={faHtml5} />
                <p>HTML</p>
              </div>
              <div className="box-controls">
                <button
                  title="Update images based on their 'alt' attribute"
                  onClick={() => updateImages(htmlCode)}
                >
                  <FontAwesomeIcon icon={faArrowsRotate} /> Update images
                </button>
                <button title="Undo" onClick={() => undoHtml()}>
                  <FontAwesomeIcon icon={faRotateLeft} />
                </button>
                <button title="Redo" onClick={() => redoHtml()}>
                  <FontAwesomeIcon icon={faRotateRight} />
                </button>
                <button
                  title="Copy code"
                  onClick={() => navigator.clipboard.writeText(htmlCode)}
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
              </div>
            </div>
            <div>
              <CodeMirror
                className="htmlCodeBox"
                value={htmlCode}
                theme={theme}
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
                  onClick={() => navigator.clipboard.writeText(cssCode)}
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
              </div>
            </div>
            <div>
              <CodeMirror
                className="cssCodeBox"
                value={cssCode}
                theme={theme}
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
                  onClick={() => navigator.clipboard.writeText(jsCode)}
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
              </div>
            </div>
            <div>
              <CodeMirror
                className="jsCodeBox"
                value={jsCode}
                theme={theme}
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
            <FontAwesomeIcon
              className="preview-icon"
              icon={faMagnifyingGlass}
            />
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
    </div>
  );
}
