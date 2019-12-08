import renderer from "react-test-renderer";
import React from "react";
import { Deck } from "./Deck";
import { toMatchDiffSnapshot } from "snapshot-diff";

expect.extend({ toMatchDiffSnapshot });

describe("Deck", () => {
  it("Test start game", () => {
    const component = renderer.create(<Deck />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();

    component.root.findAllByType("button")[0].props.onClick();

    // onClick to label
    // component.root.findAllByType("input")[2].props.onClick();

    const treeUpdate = component.toJSON();
    expect(tree).toMatchDiffSnapshot(treeUpdate);
  });
});
