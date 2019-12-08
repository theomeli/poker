import renderer from "react-test-renderer";
import React from "react";
import { App } from "./App";

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { describe, it } from "Jest";

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

describe("Test rendering of App Component", () => {
  it("My Test Case", () => {
    expect(true).toEqual(true);
  });
});

describe("Test App rendering", () => {
  test("snapshots render", () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
