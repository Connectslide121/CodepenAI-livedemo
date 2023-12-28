import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function InputArea() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    return inputValue;
  }; //probably take {inputValue} and send it to wherever the request is done

  return (
    <>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <textarea
            autoFocus
            id="input"
            name="input"
            cols={100}
            rows={5}
            placeholder="Enter your prompt and I will generate HTML, CSS, and JavaScript code for you"
            onChange={handleInputChange}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faCircleArrowUp} />
          </button>
        </form>
      </div>
    </>
  );
}
