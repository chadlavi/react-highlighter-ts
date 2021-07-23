import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { Highlight, HighlightProps } from "../lib";

export default {
  title: "Examples",
  parameters: {
    docs: {
      description: {
        component: "Highlight matches in a string",
      },
    },
  },
  component: Highlight,
  argTypes: {
    search: {
      control: "text",
    },
  },
  args: {
    children:
      "It is known that there are an infinite number of worlds, simply because there is an infinite amount of space for them to be in. However, not every one of them is inhabited. Therefore, there must be a finite number of inhabited worlds. Any finite number divided by infinity is as near to nothing as makes no odds, so the average population of all the planets in the Universe can be said to be zero. From this it follows that the population of the whole Universe is also zero, and that any people you may meet from time to time are merely the products of a deranged imagination.",
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

export const Default: Story<HighlightProps> = (args) => {
  const { search, ...rest } = args;
  return <Highlight {...rest} search={makeSearch(search)} />;
};
Default.storyName = "Highlight";

export const WithMatchStyle = Default.bind({});
WithMatchStyle.storyName = "With matchStyle prop";
WithMatchStyle.args = {
  matchStyle: { background: "lightblue", borderRadius: 4 },
};
WithMatchStyle.parameters = {
  docs: {
    description: {
      story: "In this example, the `matchStyle` prop is used to style matches.",
    },
  },
};

export const WithMatchClass = Default.bind({});
WithMatchClass.storyName = "With matchClass prop";
WithMatchClass.args = {
  matchClass: "example",
};
WithMatchClass.parameters = {
  docs: {
    description: {
      story:
        "In this example, the `matchClass` prop is used to style matches (this requires that you have a css class defined elsewhere).",
    },
  },
};
