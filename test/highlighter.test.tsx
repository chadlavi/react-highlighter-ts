import * as React from "react";
import { Highlight } from "../lib";
import { shallow } from "enzyme";

const cafeText =
  "Café has a weird e. Cafééééé has five of them. That's how Café works. Cafe has a normal e. Cafeeeee has five of them.";

const longString =
  "The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. The quick brown fox jumped over the lazy dog. ";

describe("<Highlight>", () => {
  it("should contain the matchElement", () => {
    const noMatchElement = shallow(
      <Highlight search={"hel"}>Hello World</Highlight>
    );
    expect(noMatchElement.find("mark").exists()).toBe(true);

    const hasMatchElement = shallow(
      <Highlight matchElement={"em"} search={"hel"}>
        Hello World
      </Highlight>
    );
    expect(hasMatchElement.find("em").exists()).toBe(true);
  });
  it("should have children", () => {
    const wrapper = shallow(
      <Highlight search={"fox"}>
        The quick brown fox jumped over the lazy dog.
      </Highlight>
    );
    expect(wrapper.children()).toHaveLength(3);
    expect(wrapper.find("mark")).toHaveLength(1);
  });
  it("should allow empty search", () => {
    const wrapper = shallow(
      <Highlight search={""}>
        The quick brown fox jumped over the lazy dog.
      </Highlight>
    );
    expect(wrapper.children()).toHaveLength(1);
    expect(wrapper.find("mark")).toHaveLength(0);
  });
  it("should support custom className for matching element", () => {
    const wrapper = shallow(
      <Highlight matchClass={"foo-bar"} search="seek">
        Hide and Seek
      </Highlight>
    );
    expect(wrapper.find("mark").props().className).toBe("foo-bar");
  });
  it("should support custom style for matching element", () => {
    const wrapper = shallow(
      <Highlight matchStyle={{ color: "red" }} search="seek">
        Hide and Seek
      </Highlight>
    );
    expect(wrapper.find("mark").props().style?.color).toBe("red");
  });
  it("should support passing props to parent element", () => {
    const wrapper = shallow(
      <Highlight className={"foo-bar"} search="seek">
        Hide and Seek
      </Highlight>
    );
    expect(wrapper.props().className).toBe("foo-bar");
  });
  it("should support case sensitive searches", () => {
    const wrapper = shallow(
      <Highlight caseSensitive search="seek">
        Hide and Seek
      </Highlight>
    );
    expect(wrapper.find("mark")).toHaveLength(0);
  });
  // stubs; cf.
  // https://github.com/helior/react-Highlight/blob/master/test/testHighlight.js
  it("should support matching diacritics exactly", () => {
    const wrapper = shallow(
      <Highlight caseSensitive search="Cafe">
        {cafeText}
      </Highlight>
    );
    expect(wrapper.find("mark")).toHaveLength(2);
  });
  it("should support ignoring diacritics", () => {
    const wrapper = shallow(
      <Highlight ignoreDiacritics search="Cafe">
        {cafeText}
      </Highlight>
    );
    expect(wrapper.find("mark")).toHaveLength(5);
  });
  it("should support regular expressions in search", () => {
    const wrapper = shallow(
      <Highlight ignoreDiacritics search={/[A-Za-z]+/}>
        Easy as 123, ABC...
      </Highlight>
    );
    const marks = wrapper.find("mark");
    expect(marks).toHaveLength(3);
    expect(marks.at(0).text()).toEqual("Easy");
    expect(marks.at(1).text()).toEqual("as");
    expect(marks.at(2).text()).toEqual("ABC");
  });
  it("should work when regular expressions in search do not match anything", () => {
    const wrapper = shallow(
      <Highlight ignoreDiacritics search={/z+/}>
        Easy as 123, ABC...
      </Highlight>
    );
    expect(wrapper.find("mark")).toHaveLength(0);
  });
  it("should not return matches if the supplied search RegEx matches an empty string", () => {
    const wrapper = shallow(
      <Highlight ignoreDiacritics search={/z*/}>
        Ez as 123, ABC...
      </Highlight>
    );
    expect(wrapper.find("mark")).toHaveLength(0);
  });
  it("should support matching diacritics exactly with regex", () => {
    const noDiacritics = shallow(
      <Highlight search={/Cafe/}>{cafeText}</Highlight>
    );
    expect(noDiacritics.find("mark")).toHaveLength(2);
    const withDiacritics = shallow(
      <Highlight search={/Café/}>{cafeText}</Highlight>
    );
    expect(withDiacritics.find("mark")).toHaveLength(3);
  });
  it("should support ignoring diacritics with regex", () => {
    const wrapper = shallow(
      <Highlight ignoreDiacritics search={/Cafe/}>
        {cafeText}
      </Highlight>
    );
    expect(wrapper.find("mark")).toHaveLength(5);
  });
  it("should support ignoring diacritics with blacklist", () => {
    const text = "Letter ä is a normal letter here: Ääkkösiä";
    const wrapper1 = shallow(
      <Highlight search="Aakkosia" ignoreDiacritics diacriticsBlacklist="Ää">
        {text}
      </Highlight>
    );
    expect(wrapper1.find("mark")).toHaveLength(0);
    const wrapper2 = shallow(
      <Highlight search="Ääkkösiä" ignoreDiacritics diacriticsBlacklist="Ää">
        {text}
      </Highlight>
    );
    expect(wrapper2.find("mark")).toHaveLength(1);
  });
  it("should support ignoring diacritics with blacklist with regex", () => {
    const text = "Letter ä is a normal letter here: Ääkkösiä";
    const wrapper1 = shallow(
      <Highlight search={/k+o/i} ignoreDiacritics diacriticsBlacklist="Ää">
        {text}
      </Highlight>
    );
    expect(wrapper1.find("mark")).toHaveLength(1);
    const wrapper2 = shallow(
      <Highlight search={/ä+/i} ignoreDiacritics diacriticsBlacklist="Ää">
        {text}
      </Highlight>
    );
    expect(wrapper2.find("mark")).toHaveLength(3);
  });
  it("should support escaping arbitrary string in search", () => {
    const wrapper = shallow(
      <Highlight search="Test (">Test (should not throw)</Highlight>
    );
    expect(wrapper.find("mark")).toHaveLength(1);
  });
  it("should be able to handle long strings", () => {
    const wrapper = shallow(
      <Highlight search={/([A-Za-z])+/}>{longString}</Highlight>
    );
    expect(wrapper.find("mark")).toHaveLength(45);
  });
});
