import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import { RandomCards } from "./scripts/cardsRating";
import { Deck } from "./Deck";

function App() {
  return (
    // <div className="card"></div>
    <Deck />
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <h1>{RandomCards[0].suit}</h1>
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
