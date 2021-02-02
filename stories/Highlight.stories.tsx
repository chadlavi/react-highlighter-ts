import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { Highlight as H, HighlightProps } from "../lib";

export default {
  title: "Highlight",
  component: H,
  argTypes: {
    search: {
      control: "text",
    },
  },
  args: {
    children: `It is known that there are an infinite number of worlds, simply
    because there is an infinite amount of space for them to be in. However, not
    every one of them is inhabited. Therefore, there must be a finite number of
    inhabited worlds. Any finite number divided by infinity is as near to
    nothing as makes no odds, so the average population of all the planets in
    the Universe can be said to be zero. From this it follows that the
    population of the whole Universe is also zero, and that any people you may
    meet from time to time are merely the products of a deranged imagination.`,
    search: "/infinit(e|y)/",
  },
};

const makeSearch = (s?: string | RegExp) => {
  if (s) {
    if (s instanceof RegExp) return s;
    if (s.match(/^\/.*\/i?$/)) {
      try {
        const flags = s.match(/(i*)$/)?.[1];
        const pattern = s.match(/\/(.*)\//)?.[1];
        return new RegExp(pattern || "", flags);
      } catch {
        return s;
      }
    }
    return s;
  }
};

export const Highlight: Story<HighlightProps> = (args) => {
  const { search, ...rest } = args;
  return <H {...rest} search={makeSearch(search)} />;
};
