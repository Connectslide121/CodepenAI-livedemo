import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";

export default function InputArea({ onUserSubmit }) {
  const [inputValue, setInputValue] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleInputChange = (e) => {
    setInputValue(`${e.target.value}`);
  };

  const handleApiKeyChange = (e) => {
    setApiKey(`${e.target.value}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserSubmit(inputValue, apiKey);
  };

  useEffect(() => {
    const textarea = document.getElementById("input");
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
  }, [inputValue]);

  return (
    <>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <div className="form-inputs-wrapper">
            <div className="api-key-input">
              <label htmlFor="apiKey">API Key</label>
              <textarea
                name="apiKey"
                id="apiKey"
                cols="100"
                rows="1"
                placeholder="Insert a valid openAI API key"
                value={apiKey}
                onChange={handleApiKeyChange}
                // required
              ></textarea>
            </div>
            <div className="user-message-input">
              <label htmlFor="input">Message</label>
              <textarea
                autoFocus
                id="input"
                name="input"
                cols={100}
                rows={1}
                placeholder="What should I build for you?"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button type="submit">
            <FontAwesomeIcon icon={faUpLong} />{" "}
          </button>
        </form>
      </div>
    </>
  );
}
