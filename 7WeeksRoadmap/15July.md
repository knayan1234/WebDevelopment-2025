## What is JSX?

JSX stands for JavaScript XML.It allows us to write HTML look like code in JS. JSX is not HTML, it’s a syntactic sugar that gets transformed into JavaScript.

## Why do multiple JSX tags need to be wrapped?

JSX looks like HTML, but under the hood it is transformed into plain JavaScript objects. You can’t return two objects from a function without wrapping them into an array. This explains why you also can’t return two JSX tags without wrapping them into another tag or a Fragment.

# JSX under the hood

JSX is not a valid JavaScript, so it needs to transpiled into JS that browsers can execute.
Tools like Babel transform JSX into React.createElement calls.

JSX - `const element = <h1>Hello, {name}</h1>;`
JavaScript - `const element = React.createElement('h1', null, 'Hello, ', name);`

React.createElement creates a JavaScript object (React element) that describes the DOM structure. React’s reconciliation process uses these objects to update the DOM efficiently.

Transpilation: Babel parses JSX, converts it to React.createElement calls, and outputs plain JavaScript.

Virtual DOM: React uses the output of React.createElement to build a lightweight in-memory representation of the UI, enabling efficient updates.

Webpack’s Role: As discussed in your previous questions, Webpack integrates Babel (via babel-loader) to transpile JSX during the build process.

## Compilation process of JSX

-1) User write code in JSX. 2) Babel reads the file and transform it into createElement calls. 3) Webpack processes the transpiled JS , along with other assets into a bundle. 4) Webpack generates a bundle.js in the build directory. 5) Browser reads the bundle and renders the virtual DOM and updates the real DOM if needed.

## Alternative to JSX?

If we don't want to use JSX, we can use:

a) `React.createElement` - Its mian,directly creates React elements(beneath JSX).
b) `react-hyperscript` - A JavaScript function (often h) that mimics JSX-like syntax without the HTML-like structure.
c) `htm` - allow writing HTML-like code using tagged template literals, which are processed into React elements without JSX.

---

## React.createElement vs JSX

### createElement

```js
React.createElement("div", null, React.createElement("h1", null, "Hello"));
```

### JSX

```jsx
<div>
  <h1>Hello</h1>
</div>
```

---

## JSX vs react-hyperscript

### Hyperscript

```js
React.createElement("div", null, React.createElement("h1", null, "Hello"));
```

```js
import h from "react-hyperscript";

function App() {
  return h("div.container", [
    h("h1", "Hello, World"),
    h("p", "This is Hyperscript"),
  ]);
}
```

### JSX

```jsx
function App() {
  return (
    <div className="container">
      <h1>Hello, World</h1>
      <p>This is plain JavaScript</p>
    </div>
  );
}
```

---

## JSX vs htm

### HTM

```js
import { render } from "react-dom";
import htm from "htm";
import React from "react";

const html = htm.bind(React.createElement);

function App() {
  return html`<div className="container"><h1>Hello, World</h1></div>`;
}

render(<App />, document.getElementById("root"));
```

### JSX

```jsx
function App() {
  return (
    <div className="container">
      <h1>Hello, World</h1>
      <p>This is plain JavaScript</p>
    </div>
  );
}
```

## Why React Uses Virtual DOM and React.createElement under the hood and nor Real DOM?

React DOM is slow, direct updates trigger costly repaint.
Bad for maps, etc.

Virtual DOM is fast and it is lighweight JS object tree. React updates virtual DOM and updates only necessary real DOM parts.
