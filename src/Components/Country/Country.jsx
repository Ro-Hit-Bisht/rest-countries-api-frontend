// Dependencies
import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Stylesheet
import "./Country.scss";

// Component
import CountryDetails from "../CountryDetails/CountryDetails";

// Context
import { ThemeContext } from "../ThemeContext/ThemeContext";

// Asset
import White_Left_Arrow from "../../Asset/White_Left_Arrow.svg";
import Black_Left_Arrow from "../../Asset/Black_Left_Arrow.svg";

function Country(props) {
  const Theme = useContext(ThemeContext);

  return (
    <>
      <button
        id="Back_Btn"
        style={
          Theme
            ? {
                background: "hsl(209, 23%, 22%)",
              }
            : {
                background: "hsl(0, 0%, 100%)",
              }
        }
      >
        <Link
          to="/"
          style={
            Theme
              ? { color: "hsl(0, 0%, 100%)" }
              : { color: "hsl(200, 15%, 8%)" }
          }
        >
          <img
            src={Theme ? White_Left_Arrow : Black_Left_Arrow}
            alt="Left_Arrow"
          />
          Back
        </Link>
      </button>
      <CountryDetails countries={props.countrieslist} />
    </>
  );
}

export default Country;
