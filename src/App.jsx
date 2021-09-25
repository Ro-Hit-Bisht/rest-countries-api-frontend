// Dependencies
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Header from "./Components/Header/Header";
import Form from "./Components/Form/Form";
import Countries from "./Components/Countries/Countries";
import Country from "./Components/Country/Country";

// Stylesheet
import "./App.scss";

// Context
import { ThemeContext } from "./Components/ThemeContext/ThemeContext";

function App() {
  const [Data, setData] = useState([]);
  const [CountriesList, setCountriesList] = useState([]);
  const [Region, setRegion] = useState("");
  const [SearchedCountry, setSearchedCountry] = useState("");
  const [SlectedCountry, setSlectedCountry] = useState("");
  const [DarkTheme, setDarkTheme] = useState(true);

  window.document.body.style.background = DarkTheme
    ? "hsl(207, 26%, 17%)"
    : "hsl(0, 0%, 98%)";

  useEffect(() => {
    if ((Region === "") & (SearchedCountry === "")) {
      fetch("https://restcountries.com/v2/all")
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          setCountriesList(body);
          setData(body);
        });
    } else if (Region !== "") {
      fetch(`https://restcountries.com/v2/continent/${Region}`)
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          setData(body);
        });
    } else if (SearchedCountry.trim() !== "" ) {
      fetch(`https://restcountries.com/v2/name/${SearchedCountry}`)
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          setData(body);
        });
    }
  }, [Region, SearchedCountry, SlectedCountry]);

  return (
    <>
      <Router>
        <ThemeContext.Provider value={DarkTheme}>
          <header
            style={
              DarkTheme
                ? {
                    background: "hsl(209, 23%, 22%)",
                    color: "hsl(0, 0%, 100%)",
                  }
                : {
                    background: "hsl(0, 0%, 100%)",
                    color: "hsl(200, 15%, 8%)",
                  }
            }
            id="Header"
          >
            <Header
              theme={() => {
                setDarkTheme((prevState) => !prevState);
              }}
            />
          </header>
          <Switch>
            <Route exact path="/">
              <main
                style={
                  DarkTheme
                    ? {
                        background: "hsl(207, 26%, 17%)",
                      }
                    : {
                        background: "hsl(0, 0%, 95%)",
                      }
                }
              >
                <Form
                  input={(value) => {
                    setSearchedCountry(value);
                  }}
                  filter={(value) => {
                    setRegion(value);
                  }}
                />
                <Countries
                  countrieslist={Data}
                  ClickedCountry={(value) => {
                    setSlectedCountry(value);
                  }}
                />
              </main>
            </Route>
            <Route path="/:id">
              <main
                style={
                  DarkTheme
                    ? {
                        background: "hsl(207, 26%, 17%)",
                        minHeight: "calc(100vh - 6rem)",
                      }
                    : {
                        background: "hsl(0, 0%, 95%)",
                        minHeight: "calc(100vh - 5rem)",
                      }
                }
              >
                <Country countrieslist={CountriesList} />
              </main>
            </Route>
          </Switch>
        </ThemeContext.Provider>
      </Router>
    </>
  );
}

export default App;
