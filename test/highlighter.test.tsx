import * as React from "react";
import { Highlighter } from "../lib";
import { shallow } from "enzyme";

const cafeText =
  "Café has a weird e. Cafééééé has five of them. That's how Café works. Cafe has a normal e. Cafeeeee has five of them.";

const longString =
  "The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. ";

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
  it("should allow empty search", () => {
    const wrapper = shallow(
      <Highlighter search={""}>
        The quick brown fox jumped over the lazy dog.
      </Highlighter>
    );
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.find("mark")).toHaveLength(0);
  });
  it("should support custom className for matching element", () => {
    const wrapper = shallow(
      <Highlighter matchClass={"foo-bar"} search="seek">
        Hide and Seek
      </Highlighter>
    );
    expect(wrapper.find("mark").props().className).toBe("foo-bar");
  });
  it("should support custom style for matching element", () => {
    const wrapper = shallow(
      <Highlighter matchStyle={{ color: "red" }} search="seek">
        Hide and Seek
      </Highlighter>
    );
    expect(wrapper.find("mark").props().style?.color).toBe("red");
  });
  it("should support passing props to parent element", () => {
    const wrapper = shallow(
      <Highlighter className={"foo-bar"} search="seek">
        Hide and Seek
      </Highlighter>
    );
    expect(wrapper.props().className).toBe("foo-bar");
  });
  it("should support case sensitive searches", () => {
    const wrapper = shallow(
      <Highlighter caseSensitive search="seek">
        Hide and Seek
      </Highlighter>
    );
    expect(wrapper.find("mark")).toHaveLength(0);
  });
  // stubs; cf.
  // https://github.com/helior/react-highlighter/blob/master/test/testHighlighter.js
  it("should support matching diacritics exactly", () => {
    const wrapper = shallow(
      <Highlighter caseSensitive search="Cafe">
        {cafeText}
      </Highlighter>
    );
    expect(wrapper.find("mark")).toHaveLength(2);
  });
  it("should support ignoring diacritics", () => {
    const wrapper = shallow(
      <Highlighter ignoreDiacritics search="Cafe">
        {cafeText}
      </Highlighter>
    );
    expect(wrapper.find("mark")).toHaveLength(5);
  });
  it("should support regular expressions in search", () => {
    const wrapper = shallow(
      <Highlighter ignoreDiacritics search={/[A-Za-z]+/}>
        Easy as 123, ABC...
      </Highlighter>
    );
    const marks = wrapper.find("mark");
    expect(marks).toHaveLength(3);
    expect(marks.at(0).text()).toEqual("Easy");
    expect(marks.at(1).text()).toEqual("as");
    expect(marks.at(2).text()).toEqual("ABC");
  });
  it("should work when regular expressions in search do not match anything", () => {
    const wrapper = shallow(
      <Highlighter ignoreDiacritics search={/z+/}>
        Easy as 123, ABC...
      </Highlighter>
    );
    expect(wrapper.find("mark")).toHaveLength(0);
  });
  it("should not return matches if the supplied search RegEx matches an empty string", () => {
    const wrapper = shallow(
      <Highlighter ignoreDiacritics search={/z*/}>
        Ez as 123, ABC...
      </Highlighter>
    );
    expect(wrapper.find("mark")).toHaveLength(0);
  });
  it("should support matching diacritics exactly with regex", () => {
    const noDiacritics = shallow(
      <Highlighter search={/Cafe/}>{cafeText}</Highlighter>
    );
    expect(noDiacritics.find("mark")).toHaveLength(2);
    const withDiacritics = shallow(
      <Highlighter search={/Café/}>{cafeText}</Highlighter>
    );
    expect(withDiacritics.find("mark")).toHaveLength(3);
  });
  it("should support ignoring diacritics with regex", () => {
    const wrapper = shallow(
      <Highlighter ignoreDiacritics search={/Cafe/}>
        {cafeText}
      </Highlighter>
    );
    expect(wrapper.find("mark")).toHaveLength(5);
  });
  it("should support ignoring diacritics with blacklist", () => {
    const text = "Letter ä is a normal letter here: Ääkkösiä";
    const wrapper1 = shallow(
      <Highlighter search="Aakkosia" ignoreDiacritics diacriticsBlacklist="Ää">
        {text}
      </Highlighter>
    );
    expect(wrapper1.find("mark")).toHaveLength(0);
    const wrapper2 = shallow(
      <Highlighter search="Ääkkösiä" ignoreDiacritics diacriticsBlacklist="Ää">
        {text}
      </Highlighter>
    );
    expect(wrapper2.find("mark")).toHaveLength(1);
  });
  it("should support ignoring diacritics with blacklist with regex", () => {
    const text = "Letter ä is a normal letter here: Ääkkösiä";
    const wrapper1 = shallow(
      <Highlighter search={/k+o/i} ignoreDiacritics diacriticsBlacklist="Ää">
        {text}
      </Highlighter>
    );
    expect(wrapper1.find("mark")).toHaveLength(1);
    const wrapper2 = shallow(
      <Highlighter search={/ä+/i} ignoreDiacritics diacriticsBlacklist="Ää">
        {text}
      </Highlighter>
    );
    expect(wrapper2.find("mark")).toHaveLength(3);
  });
  it("should support escaping arbitrary string in search", () => {
    const wrapper = shallow(
      <Highlighter search="Test (">Test (should not throw)</Highlighter>
    );
    expect(wrapper.find("mark")).toHaveLength(1);
  });
  it("should be able to handle long strings", () => {
    const wrapper = shallow(
      <Highlighter search={/([A-Za-z])+/}>{longString}</Highlighter>
    );
    expect(wrapper.find("mark")).toHaveLength(45);
  });
});
