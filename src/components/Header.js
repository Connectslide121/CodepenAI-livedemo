import React from "react";
import Logo from "./logo.png";

export default function Header() {
  return (
    <>
      <div className="header-wrapper">
        <img className="header-logo" src={Logo} alt="Logo" />
        <h1 className="header-title" style={{ color: "white" }}>
          Codepen AI
        </h1>
      </div>
    </>
  );
}
