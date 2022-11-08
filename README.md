[![npm
version](https://badge.fury.io/js/react-highlighter-ts.svg)](https://www.npmjs.com/package/react-highlighter-ts)

# react-highlighter-ts

This is a TypeScript rewrite of the npm package
[`react-highligher`](https://github.com/helior/react-highlighter), which has no
type support, has very out of date dependencies, and seems to be abandoned (no
activity since 2018).

## Version note

Starting with version 18.0.0, this library's main version will be pinned to the compatible version of React.

For React version 17.x compatability, install version `^2.2.0`.

## Usage

The API for this package is identical to that of the original package,
`react-highlighter`.

```tsx
import * as React from "react";
import { Highlight } from "react-highlighter-ts";

export const Example = () => (
  <Highlight search="hello">Hello, World!</Highlight>
);
```

See [generated type
documentation](https://chadlavi.github.io/react-highlighter-ts/) for details on
properties accepted by `<Highlight>`.

### Styling

By default, this library wraps matches in an html `<mark>` tag, and does not
style it. Most browsers style the `<mark>` tag by giving it a yellow background
and black text. You can style your matches by providing a pre-styled
element type to `matchElement`, passing a CSS class to `matchClass`, or passing
CSS rules to `matchStyle`.

### Migrating from `react-highlighter`

You should be able to migrate directly from `react-highlighter` to
`react-highlighter-ts` without any changes in your source code besides adjusting
your imports.

## Contributing

See something amiss? Please open a PR.

## Development setup

This library does not use any global dependencies, so a simple `npm install`
should suffice.

## Testing

Tests have been adapted from the original `react-highlighter` codebase. Tests
use Jest + Enzyme.

```sh
npm run test
```

or to watch file changes:

```sh
npm run test:watch
```
