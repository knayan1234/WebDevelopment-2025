## Ref

is a react feature that provides a direct access to the DOM element and when we want a component to “remember” some information, but we don’t want that information to trigger new renders, we can use a ref.

## UseRef

is a hook that returns an object that is mutable (can change) whose `.current` property persits across re renders.
`const ref = useRef(initialValue)`

## When to use Ref?

use a ref when your component needs to “step outside”

1. when we want to access dom element like focus, scroll etc.
2. storing mutable varibles across re renders.
3. when we want to track previous values.

## refs vs state (grok)

| **Aspect**           | **State**                                                                   | **Refs**                                                           |
| -------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Definition**       | Mutable data managed by `useState` (functional) or `this.setState` (class). | Mutable object to access DOM or store values without re-rendering. |
| **Purpose**          | Manage dynamic UI data, triggers re-renders.                                | Access DOM elements or persist values imperatively.                |
| **Mutability**       | Mutable via setter (e.g., `setCount`); requires immutability.               | Mutable via `ref.current`; no re-render on change.                 |
| **Re-rendering**     | Triggers re-render on update.                                               | No re-render on update.                                            |
| **Scope**            | Internal to component; can be passed as props.                              | Internal; typically for DOM or instance access.                    |
| **Functional Usage** | `const [count, setCount] = useState(0);`                                    | `const ref = useRef(null);`                                        |
| **Class Usage**      | `this.setState({ count: 1 })`                                               | `this.ref = React.createRef();`                                    |
| **Example**          | `<button onClick={() => setCount(count + 1)}>{count}</button>`              | `<input ref={ref} />; ref.current.focus();`                        |
| **Use Case**         | Form inputs, API data (e.g., `REACT_APP_API_URL`).                          | Focus input, measure DOM, animations.                              |
| **JSX/Virtual DOM**  | Updates trigger `React.createElement` calls.                                | Refs are part of `React.createElement` props.                      |
| **Props Connection** | State passed as props (e.g., `{...state}`).                                 | Refs can be forwarded with props (e.g., `forwardRef`).             |
