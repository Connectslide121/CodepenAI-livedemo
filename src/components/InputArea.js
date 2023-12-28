import React, { useState } from "react";

export default function InputArea() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="input-container">
        <form>
          <input
            type="text"
            id="input"
            name="input"
            placeholder="Enter your prompt and I will generate HTML, CSS, and JavaScript code for you"
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </>
  );
}
