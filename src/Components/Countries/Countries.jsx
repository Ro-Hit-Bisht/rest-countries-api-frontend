//  Dependencies
import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Stylesheet
import "./Countries.scss";

// Context
import { ThemeContext } from "../ThemeContext/ThemeContext";

function Countries(props) {
  const Theme = useContext(ThemeContext);

  if (props.countrieslist.status === undefined) {
    return (
      <section id="Countries">
        {props.countrieslist.map((country) => {
          const { alpha2Code, flag, name, population, region, capital } =
            country;

          return (
            <article
              id="Countries_Card"
              key={alpha2Code}
              style={
                Theme
                  ? { background: "hsl(209, 23%, 22%)" }
                  : { background: "hsl(0, 0%, 100%)" }
              }
            >
              <Link
                to={`/${name}`}
                style={
                  Theme
                    ? { color: "hsl(0, 0%, 100%)" }
                    : { color: "hsl(200, 15%, 8%)" }
                }
              >
                <figure id="Flag">
                  <img
                    src={`${flag}#svgView(preserveAspectRatio(none))`}
                    alt={`${name}_Flag`}
                  />
                </figure>
                <h1>{name}</h1>
                <h2>Population : {population}</h2>
                <h2>Region : {region}</h2>
                <h2> Capitals : {capital === undefined ? "None" : capital}</h2>
              </Link>
            </article>
          );
        })}
      </section>
    );
  } else {
    return (
      <h1
        style={
          Theme
            ? {
                marginLeft: " 1rem",
                color: "hsl(0, 0%, 100%)",
              }
            : { marginLeft: " 1rem", color: "hsl(200, 15%, 8%)" }
        }
      >
        {props.countrieslist.message} ...
      </h1>
    );
  }
}

export default Countries;
