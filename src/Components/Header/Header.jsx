// Dependencies
import React, { useState } from "react";

// Stylesheet
import "./Header.scss";

// Asset
import Sun from "../../Asset/Bright_Sun.svg";
import Moon from "../../Asset/Half_Moon.svg";

function Header(props) {
  const [DarkTheme, setDarkTheme] = useState(true);

  return (
    <>
      <h1>Where in the World?</h1>
      <button
        style={
          DarkTheme
            ? { color: "hsl(0, 0%, 100%)" }
            : { color: "hsl(200, 15%, 8%)" }
        }
        onClick={() => {
          setDarkTheme((prevState) => !prevState);
          props.theme();
        }}
      >
        <img
          src={DarkTheme ? Sun : Moon}
          alt={DarkTheme ? "Bright_Sun " : "Half_Moon"}
        />
        <h3>{DarkTheme ? "Light Mode" : "Dark Mode"}</h3>
      </button>
    </>
  );
}

export default Header;
