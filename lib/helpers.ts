import {
  ReactElement,
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import { HighlightProps } from "./highlight.model";

/**
 * Get the indexes of the first and last characters of the matched string.
 */
export function getMatchBoundaries(
  subject: string,
  search: RegExp
): { first: number; last: number } | undefined {
  const matches = search.exec(subject);
  if (matches) {
    return {
      first: matches.index,
      last: matches.index + matches[0].length,
    };
  }
}

/**
 * Get the search prop, but always in the form of a regular expression. Use
 * this as a proxy to search for consistency.
 */
export function getSearch(props: HighlightProps): RegExp {
  const {
    search,
    ignoreDiacritics,
    diacriticsBlacklist,
    caseSensitive,
  } = props;
  if (search instanceof RegExp) {
    return search;
  }

  let s = escapeStringRegexp(search);

  if (ignoreDiacritics) {
    s = removeDiacritics(s, diacriticsBlacklist);
  }

  return new RegExp(s, caseSensitive ? "" : "i");
}

export const removeDiacritics = (s: string, blacklist?: string): string => {
  if (!String.prototype.normalize) {
    // Fall back to original string
    return s;
  }

  if (!blacklist) {
    // No blacklist, just remove all
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } else {
    const blacklistChars = blacklist.split("");

    // Remove all diacritics that are not a part of a blacklisted character
    // First char cannot be a diacritic
    return s.normalize("NFD").replace(/.[\u0300-\u036f]+/g, function (m) {
      return blacklistChars.indexOf(m.normalize()) > -1 ? m.normalize() : m[0];
    });
  }
};

const escapeStringRegexp = (s?: string): string =>
  s ? s.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d") : "";

const hasChildren = (
  element: ReactNode
): element is ReactElement<{ children: ReactNode[] }> =>
  isValidElement<{ children?: ReactNode[] }>(element) &&
  Boolean(element.props.children);

export type MapFunction = (
  child: ReactNode,
  index?: number,
  children?: readonly ReactNode[]
) => ReactNode;

export const deepMap = (
  children: ReactNode,
  deepMapFn: MapFunction
): ReactNode[] => {
  return Children.toArray(children).map(
    (child: ReactNode, index: number, mapChildren: readonly ReactNode[]) => {
      if (isValidElement(child) && hasChildren(child)) {
        // Clone the child that has children and map them too
        return deepMapFn(
          cloneElement(child, {
            ...child.props,
            children: deepMap(child.props.children, deepMapFn),
          })
        );
      }
      return deepMapFn(child, index, mapChildren);
    }
  );
};

export default deepMap;
