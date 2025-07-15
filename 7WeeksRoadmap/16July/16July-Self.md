## What are props?

- React components use props to communicate with each other.
- Every parent component can pass some information to its child components by giving them props, we can pass any JavaScript value through them, including objects, arrays, and functions.
- Its "read only".
- Props are always passed as an object to the child component.

## Is props are objects?

Yes, props is an object: When you pass props to a child component (e.g., <Child name="Alice" age={30} />), React combines all props into a single object that the child receives.

## ways to use props in child components?

1. take the whole "props" object and then use props.something
2. destructure by keys
3. rest operator to destructure in one go
4. props as a function
5. children

## ways to send props from parent component?

1. props forwarding i.e use spread opeartor
2. normal way
3. whole function
4. children

## children prop?

when we want to give some content inside custom made tags like we do in simple html tags (p , body etc), React gives a special prop known as children

## useState?

1.  A state variable to retain data betweeen renders.
2.  Normal variable will not work - **As react relies on virtual dom , changing somethign in normal variable will not repaint the UI**
3.  const [index, setIndex] = useState(0); **index is a state variable and setIndex is the setter function which can update the state variable and trigger React to render the component again..**

## props vs state

| **Aspect**             | **Props**                                       | **State**                                   |
| ---------------------- | ----------------------------------------------- | ------------------------------------------- |
| **Definition**         | Read-only data passed from parent to child.     | Mutable data managed within a component.    |
| **Purpose**            | Configure/reuse components (e.g., `{...data}`). | Handle dynamic UI updates (e.g., counters). |
| **Mutability**         | Immutable in child; set by parent.              | Mutable via `setState` or `useState`.       |
| **Scope**              | External (from parent).                         | Internal (within component).                |
| **Triggers Re-render** | Yes, when parent updates props.                 | Yes, when state updates.                    |
| **Example**            | `<Child name="Alice" {...data} />`              | `const [count, setCount] = useState(0);`    |
| **Use Case**           | Pass data, callbacks, children.                 | Manage form inputs, API data, toggles.      |
| **Relation to JSX**    | Part of `React.createElement` props object.     | Updates virtual DOM on change.              |
| **Backend Tie**        | Pass API data (e.g., `REACT_APP_API_URL`).      | Store API data for rendering.               |

> Updating something after looking in 16July-other.md (below everything)

## state in functional vs Class

| **Aspect**             | **Functional (`useState`)**                    | **Class (`this.setState`)**                      |
| ---------------------- | ---------------------------------------------- | ------------------------------------------------ |
| **Usage**              | `const [state, setState] = useState(initial);` | `this.state` and `this.setState({ ... })`        |
| **Mutability**         | Mutable via `setState`; immutable updates.     | Mutable via `setState`; immutable updates.       |
| **Direct Mutation**    | Not allowed (e.g., `state++` fails).           | Not allowed (e.g., `this.state++` fails).        |
| **Triggers Re-render** | Yes, via `setState`.                           | Yes, via `setState`.                             |
| **Example**            | `setCount(count + 1)`                          | `this.setState({ count: this.state.count + 1 })` |
| **Props Connection**   | Pass state as props (e.g., `{...state}`).      | Pass state as props (e.g., `{...this.state}`).   |

**Why It Matters**: State mutability via setters ensures re-renders for dynamic UIs. Functional components use `useState` (not available in classes); classes use `setState`. Both require immutable updates for React’s virtual DOM.

## Q: Is useState mutable in class and functional components?

A: "useState is only used in functional components, where state is mutable via its setter (e.g., setCount), but updates must be immutable to trigger re-renders. Class components use this.setState instead, also requiring immutable updates. For example, setCount(count + 1) or this.setState({ count: this.state.count + 1 }) ensures virtual DOM updates. Direct mutation fails to re-render."
