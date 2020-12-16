import React, { useState } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Header from "./components/header";
import Home from "./components/Home";
import MyBody from "./components/myBody";
import "./App.css";

function App() {
  const [navBg, setNavBg] = useState({home: true, mybody: false});
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header navBg={navBg}/>
        <Switch>
          <Route path="/home">
            <Home setNavBg={setNavBg}/>
          </Route>
          <Route path="/">
            <MyBody setNavBg={setNavBg}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
