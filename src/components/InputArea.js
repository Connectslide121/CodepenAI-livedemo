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
            placeholder="What website would you like to build?"
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </>
  );
}
