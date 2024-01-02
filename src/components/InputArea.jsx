import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function InputArea({ onUserSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(`${e.target.value}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserSubmit(inputValue);
  };

  useEffect(() => {
    const textarea = document.getElementById("input");
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight - 20}px`; // Set height based on content
  }, [inputValue]);

  return (
    <>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <textarea
            autoFocus
            id="input"
            name="input"
            cols={100}
            rows={1}
            placeholder="What should I build for you?"
            value={inputValue}
            onChange={handleInputChange}
            required
          />
          <button type="submit">
            <FontAwesomeIcon icon={faCircleArrowUp} />
          </button>
        </form>
      </div>
    </>
  );
}
