// Dependencies
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";

// Stylesheet
import "./CountryDetails.scss";

// Context
import { ThemeContext } from "../ThemeContext/ThemeContext";

function CountryDetails(props) {
  const { countries } = props;
  const { id } = useParams();

  const Theme = useContext(ThemeContext);

  return (
    <>
      {countries
        .filter((country) => {
          return country.name === id;
        })
        .map((country) => {
          const {
            alpha2Code, // "String"
            flag, // "svg"
            name, // "string"
            nativeName, // "string"
            population, // Int
            region, // "String"
            subregion, // "String"
            capital, // "String"
            area, // Int
            topLevelDomain, // Array with String Element
            currencies, // Array with Object Element
            languages, // Array with Object Element
            borders, // Array with String Element or None
          } = country;
          return (
            <section
              id="CountryInfo"
              key={alpha2Code}
              style={
                Theme
                  ? { color: "hsl(0, 0%, 100%)" }
                  : { color: "hsl(200, 15%, 8%)" }
              }
            >
              <figure id="Country_Flag">
                <img
                  src={`${flag}#svgView(preserveAspectRatio(none))`}
                  alt={`${name}_Flag`}
                />
              </figure>
              <section id="Country_Info">
                <h1>{name}</h1>
                <section id="Info">
                  <section id="Info_1">
                    <article>
                      <h3>Native Name : </h3>
                      <p>{nativeName}</p>
                    </article>
                    <article>
                      <h3>Population : </h3>
                      <p>{population}</p>
                    </article>
                    <article>
                      <h3>Region : </h3>
                      <p>{region}</p>
                    </article>
                    <article>
                      <h3>Sub Region : </h3>
                      <p>{subregion === undefined ? "None" : subregion}</p>
                    </article>
                    <article>
                      <h3>Capital : </h3>
                      <p>{capital === undefined ? "None" : capital}</p>
                    </article>
                  </section>
                  <section id="Info_2">
                    <article>
                      <h3>Area : </h3>
                      <p>{area}</p>
                    </article>
                    <article>
                      <h3>Top Level Domain :</h3>
                      <p>{topLevelDomain.join(", ")}</p>
                    </article>
                    <article>
                      <h3>Currencies : </h3>
                      <p>
                        {currencies === undefined
                          ? "None"
                          : currencies
                              .map((currency) => {
                                return currency.name;
                              })
                              .join(", ")}
                      </p>
                    </article>
                    <article>
                      <h3>Languages : </h3>
                      <p>
                        {languages
                          .map((language) => {
                            return language.name;
                          })
                          .join(", ")}
                      </p>
                    </article>
                  </section>
                </section>
                <section id="Borders">
                  <h2>Border Countries</h2>
                  <ul>
                    {borders === undefined ? (
                      <li
                        style={
                          Theme
                            ? { background: "hsl(209, 23%, 22%)" }
                            : { background: "hsl(0, 0%, 100%)" }
                        }
                        id="None"
                      >
                        None
                      </li>
                    ) : (
                      countries
                        .filter((country) => {
                          let present = false;
                          for (let i = 0; i < borders.length; i++) {
                            if (country.alpha3Code === borders[i]) {
                              present = true;
                            }
                          }
                          return present === true;
                        })
                        .map((country) => {
                          return (
                            <li
                              key={country.alpha2Code}
                              style={
                                Theme
                                  ? { background: "hsl(209, 23%, 22%)" }
                                  : { background: "hsl(0, 0%, 100%)" }
                              }
                            >
                              <Link
                                to={`/${country.name}`}
                                style={
                                  Theme
                                    ? { color: "hsl(0, 0%, 100%)" }
                                    : { color: "hsl(200, 15%, 8%)" }
                                }
                              >
                                {country.name}
                              </Link>
                            </li>
                          );
                        })
                    )}
                  </ul>
                </section>
              </section>
            </section>
          );
        })}
    </>
  );
}

export default CountryDetails;
