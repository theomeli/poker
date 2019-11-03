import React from "react";
// import { from } from "animationframes";
import AnimationFrames from "animationframes";

import logo from "./logo.svg";
import "./App.css";
// import { RandomCards } from "./scripts/cardsRating";
import { Deck } from "./Deck";

// const translate = (el, x, y) =>
//   (el.style.transform = `translate(${x}%, ${y}%)`);
// const { from } = AnimationFrames;

// const hello = document.createElement("h1");

// // const hello = React.createElement("h1", {}, "Hello World");

// const animation = new AnimationFrames({
//   delay: 0,
//   duration: 1000,
//   oninit() {
//     console.log(hello);
//     hello.style.display = "none";
//   },
//   onstart() {
//     hello.style.display = "";
//   },
//   onprogress(e) {
//     translate(hello, from(-100, e), 0);
//   },
//   onend() {
//     hello.style.transform = "";
//   }
// });

// hello.textContent = "Hello world!";

function App() {
  return (
    <div>
      {/* {hello} */}
      <Deck />
    </div>
  );
}

export default App;
