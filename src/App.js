import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
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
      <Deck />
    </div>
  );
}

export default App;
