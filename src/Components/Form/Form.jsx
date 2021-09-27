// Dependencies
import React, { useState, useContext } from "react";

// Stylesheet
import "./Form.scss";

// Context
import { ThemeContext } from "../ThemeContext/ThemeContext";

// Asset
import White_Search_Icon from "../../Asset/White_Search_Icon.svg";
import Gray_Search_Icon from "../../Asset/Gray_Search_Icon.svg";

function Form(props) {
  const [SearchedCountry, setSearchCountry] = useState("");
  const [Error, setError] = useState(false);
  const [Region, setRegion] = useState("");

  const Theme = useContext(ThemeContext);

  return (
    <form>
      <section>
        <figure
          style={
            Theme
              ? {
                  background: "hsl(209, 23%, 22%)",
                  borderBottom: "2.5px solid hsl(0, 0%, 100%)",
                }
              : {
                  background: "hsl(0, 0%, 100%)",
                  borderBottom: "2.5px solid hsl(209, 23%, 22%)",
                }
          }
        >
          <img
            src={Theme ? White_Search_Icon : Gray_Search_Icon}
            alt="Serch_Icon"
          />
        </figure>
        <input
          type="text"
          placeholder="Search for a Country..."
          value={SearchedCountry}
          style={
            Theme
              ? {
                  background: "hsl(209, 23%, 22%)",
                  color: "hsl(0, 0%, 100%)",
                  borderBottom: "2.5px solid hsl(0, 0%, 100%)",
                }
              : {
                  background: "hsl(0, 0%, 100%)",
                  color: "hsl(0, 0%, 52%)",
                  borderBottom: "2.5px solid hsl(209, 23%, 22%)",
                }
          }
          onChange={(e) => {
            setSearchCountry(e.target.value);
            props.input(e.target.value);
          }}
          onKeyPress={(e) => {
            if (
              (e.key.charCodeAt() < 65 || e.key.charCodeAt() > 90) &
              (e.key.charCodeAt() < 97 || e.key.charCodeAt() > 122) &
              (e.key.charCodeAt() !== 32)
            ) {
              setError(true);
              e.preventDefault();
            } else {
              setError(false);
            }
          }}
        />
        <span
          style={Error ? { display: "initial" } : { display: "none" }}
          // style={{}}
          id="Error"
        >
          <div
            style={
              Theme
                ? {
                    color: "hsl(0, 0%, 100%)",
                  }
                : {
                    color: "hsl(200, 15%, 8%)",
                  }
            }
            id="Message"
          >
            * Only Alphabets are Allowed
          </div>
        </span>
      </section>
      <select
        style={
          Theme
            ? { background: "hsl(209, 23%, 22%)", color: "hsl(0, 0%, 100%)" }
            : { background: "hsl(0, 0%, 100%)", color: "hsl(200, 15%, 8%)" }
        }
        onChange={(e) => {
          if (e.target.value === "All") {
            setSearchCountry("");
            props.input("");
            setRegion("");
            props.filter("");
          } else {
            setRegion(e.target.value);
            props.filter(e.target.value);
            setSearchCountry("");
            props.input("");
          }
        }}
      >
        <option
          style={{ display: "none" }}
          id="Hidden"
          value={
            Region
          } /* i add the value={Region} just to remove the warning error. */
        >
          Filter By Region
        </option>
        <option value="All">All</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Americas">America</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </form>
  );
}

export default Form;
