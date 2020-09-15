import { CSSProperties } from "react";

export interface HighlighterProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The string of text (or Regular Expression) to highlight
   */
  search: string | RegExp;
  /**
   * Determine whether string matching should be case-sensitive. Not applicable
   * to regular expression searches. Defaults to `false`.
   */
  caseSensitive?: boolean;
  /**
   * Determine whether string matching should ignore diacritics. Defaults to
   * `false`.
   */
  ignoreDiacritics?: boolean;
  /**
   * if `ignoreDiacritics` is true, then the characters supplied in this string
   * are treated as a list of diacritics to _not_ ignore.
   */
  diacriticsBlacklist?: string;
  /**
   * HTML tag name to wrap around highlighted text. Defaults to `mark`.
   */
  matchElement?: string | (() => JSX.Element);
  /**
   * HTML class to wrap around highlighted text. Defaults to `highlight`.
   */
  matchClass?: string;
  /**
   * Custom style for the match element around highlighted text.
   */
  matchStyle?: CSSProperties;
  /**
   * The children passed to `<Highlighter>` must be a string
   */
  children: string;
}
