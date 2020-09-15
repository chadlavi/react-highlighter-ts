import * as React from "react";
import { Highlighter } from "../lib";
import { shallow } from "enzyme";

test("does jest work?", () => {
  const example = shallow(
    <Highlighter search={"hel"}>Hello World</Highlighter>
  );
  expect(example.find("mark").exists()).toBe(true);
});
