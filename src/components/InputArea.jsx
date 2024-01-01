import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function InputArea({ onUserSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(`${e.target.value}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent the default page reload when submitting
    onUserSubmit(inputValue);
  };

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
            placeholder="What should I build for you?"
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
