[![npm version](https://badge.fury.io/js/react-highlighter-ts.svg)](https://www.npmjs.com/package/react-highlighter-ts)

# react-highlighter-ts
This is a TypeScript rewrite of the popular npm package
[`react-highligher`](https://github.com/helior/react-highlighter), which has no
type support, has very out of date dependencies, and seems to be abandoned (no
activity since 2018).

See [generated type
documentation](https://chadlavi.github.io/react-highlighter-ts/) for details

## Usage
The API for this package is identical to that of the original package,
`react-highlighter`.

```tsx
import * as React from "react";
import Highlight from "react-highlighter-ts";

export const Example = () => (
  <Highlight search="hello">Hello, World!</Highlight>
);
```

### Migrating from `react-highlighter`
You should be able to migrate directly from `react-highlighter` to
`react-highlighter-ts` without any changes in your source code. All you'll need
to do is adjust your imports to point to this library.

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