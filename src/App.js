import React, { useState } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import ThemeContext from "./context";
import Header from "./components/header";
import Helper from "./components/Helper";

import Home from "./components/Home";
import MyBody from "./components/myBody";
import "./App.css";

const initialElements = [
  {
    id: "1",
    type: "input",
    data: { label: <Test /> },
    position: { x: 0, y: 0 },
  },
  { id: "2", data: { label: "Г" }, position: { x: 50, y: 50 } },
  {
    id: "3",
    type: "output", // выходной узел
    data: { label: "Е" },
    position: { x: 100, y: 100 },
  },
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

function Test() {
  return (
    <>
      <p>Test++</p>
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(initialElements);
  const [navBg, setNavBg] = useState({ home: true, mybody: false }); // подсветка в навигации

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="App">
        <BrowserRouter>
          <Header navBg={navBg} />
          <Switch>
            <Route path="/home">
              <Home setNavBg={setNavBg} />
            </Route>
            <Route path="/">
              <MyBody setNavBg={setNavBg} />
            </Route>
          </Switch>
          <Helper />
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
