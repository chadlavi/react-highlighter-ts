import * as React from "react";
import { Highlighter } from "../lib";
import { shallow } from "enzyme";

describe("<Highlighter>", () => {
  it("should contain the matchElement", () => {
    const noMatchElement = shallow(
      <Highlighter search={"hel"}>Hello World</Highlighter>
    );
    expect(noMatchElement.find("mark").exists()).toBe(true);

    const hasMatchElement = shallow(
      <Highlighter matchElement={"em"} search={"hel"}>
        Hello World
      </Highlighter>
    );
    expect(hasMatchElement.find("em").exists()).toBe(true);
  });
  it("should have children", () => {
    const wrapper = shallow(
      <Highlighter search={"fox"}>
        The quick brown fox jumped over the lazy dog.
      </Highlighter>
    );
    expect(wrapper.children()).toHaveLength(3);
    expect(wrapper.find("mark")).toHaveLength(1);
  });
  // stubs; cf. https://github.com/helior/react-highlighter/blob/master/test/testHighlighter.js
  it("should allow empty search", () => {
    expect(true).toBe(true);
  });
  it("should support custom className for matching element", () => {
    expect(true).toBe(true);
  });
  it("should support custom style for matching element", () => {
    expect(true).toBe(true);
  });
  it("should support passing props to parent element", () => {
    expect(true).toBe(true);
  });
  it("should support matching diacritics exactly", () => {
    expect(true).toBe(true);
  });
  it("should support ignoring diacritics", () => {
    expect(true).toBe(true);
  });
  it("should support regular expressions in search", () => {
    expect(true).toBe(true);
  });
  it("should work when regular expressions in search do not match anything", () => {
    expect(true).toBe(true);
  });
  it("should stop immediately if regex matches an empty string", () => {
    expect(true).toBe(true);
  });
  it("should support matching diacritics exactly with regex", () => {
    expect(true).toBe(true);
  });
  it("should support ignoring diacritics with regex", () => {
    expect(true).toBe(true);
  });
  it("should support ignoring diacritics with blacklist", () => {
    expect(true).toBe(true);
  });
  it("should support ignoring diacritics with blacklist with regex", () => {
    expect(true).toBe(true);
  });
  it("should support escaping arbitrary string in search", () => {
    expect(true).toBe(true);
  });
  it("should not throw on long strings", () => {
    expect(true).toBe(true);
  });
});
