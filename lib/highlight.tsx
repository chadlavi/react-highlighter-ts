import React from "react";

import { HighlighterProps } from "./highlight.model";

import { removeDiacritics, getSearch, getMatchBoundaries } from "./helpers";

/**
 * Highlight matches in a string
 */
export const Highlighter = (props: HighlighterProps): JSX.Element => {
  // we increment this each time there's a match -- it's used to ensure thekeys are unique.
  let count = 0;

  const incrementCount = () => count++;

  const {
    search,
    ignoreDiacritics,
    diacriticsBlacklist,
    matchElement = "mark",
    matchClass = "highlight",
    matchStyle = {},
    children,
    ...rest
  } = props;

  /**
   * Responsible for rending a non-highlighted element.
   *
   */
  const renderPlain = (s: string): React.ReactNode => (
    <span key={`${s}-${count}`}>{s}</span>
  );

  /**
   * Responsible for rending a highlighted element.
   *
   */
  const renderHighlight = (s: string): React.ReactNode =>
    React.createElement(
      matchElement,
      {
        key: `${s}-${count}`,
        className: matchClass,
        style: matchStyle,
      },
      s
    );

  /**
   * Determines which strings of text should be highlighted or not.
   *
   */
  const highlightChildren = (
    subject: string,
    search: RegExp
  ): Array<React.ReactNode> => {
    const children = [];
    let remaining = subject;

    while (remaining) {
      const remainingCleaned = ignoreDiacritics
        ? removeDiacritics(remaining, diacriticsBlacklist || "")
        : remaining;

      if (!search.test(remainingCleaned)) {
        children.push(renderPlain(remaining));
        return children;
      }

      const boundaries = getMatchBoundaries(remainingCleaned, search);

      if (boundaries?.first === 0 && boundaries?.last === 0) {
        // Regex zero-width match
        return children;
      }

      // Capture the string that leads up to a match...
      const nonMatch = remaining.slice(0, boundaries?.first);
      if (nonMatch) {
        children.push(renderPlain(nonMatch));
      }

      // Now, capture the matching string...
      const match = remaining.slice(boundaries?.first, boundaries?.last);
      if (match) {
        children.push(renderHighlight(match));
      }

      // And if there's anything left over, recursively run this method again.
      remaining = remaining.slice(boundaries?.last);
      incrementCount();
    }

    return children;
  };

  /**
   * A wrapper to the highlight method to determine when the highlighting
   * process should occur.
   *
   */
  const renderElement = (subject: string): Array<React.ReactNode> => {
    if (search) return highlightChildren(subject, getSearch(props));

    return [children];
  };

  return <span {...rest}>{renderElement(children)}</span>;
};
