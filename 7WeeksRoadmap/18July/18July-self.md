## Events in JS?

Events are the outcomes triggered by the browser when something significant happens or an action is performed. They are fired within the browser window and are usually associated with a specific element inside it.

> Human analogy(gpt)- "Imagine a light switch in a room. When someone flips the switch (an action), the light turns on (an event happens). In the browser, events work the same way — when you do something like click a button or move your mouse, the browser 'reacts' by triggering an event, just like the light turning on."

## Event Listener?

It listens the events

1. JS

````btn.addEventListener("click", () => {
  const rndCol = `rgb(${random(255)} ${random(255)} ${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}); ```
````

2. React

```
<Card onClick={}/>
```

> Functions passed to event handlers must be passed, not called. For example: passing a function (correct) calling a function (incorrect) <button onClick={handleClick}> <button onClick={handleClick()}> The difference is subtle. In the first example, the handleClick function is passed as an onClick event handler. This tells React to remember it and only call your function when the user clicks the button.n the second example, the () at the end of handleClick() fires the function immediately during rendering, without any clicks. This is because JavaScript inside the JSX { and } executes right away.

## e.stopPropagation() vs e.preventDefault()

> tablel(grok)

| **Aspect**            | **event.stopPropagation**                                                                                                                                                                                                                 | **event.preventDefault**                                                                                                                                                                                                                    |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Definition**        | Stops an event from bubbling up (or capturing down) the DOM tree, preventing parent handlers from firing.                                                                                                                                 | Prevents the browser’s default behavior for an event (e.g., form submission, link navigation).                                                                                                                                              |
| **Keyword Meaning**   | **Bubbling**: Event propagates to ancestors. **Stop**: Halts this propagation.                                                                                                                                                            | **Default**: Browser’s built-in action. **Prevent**: Cancels this action.                                                                                                                                                                   |
| **Purpose**           | Isolates event handling to the current element, avoiding parent interference.                                                                                                                                                             | Allows custom handling by stopping browser defaults (e.g., for SPA form submissions).                                                                                                                                                       |
| **When to Use**       | Nested components where parent and child have event handlers for the same event type.                                                                                                                                                     | Forms, links, or inputs where default browser behavior needs to be overridden.                                                                                                                                                              |
| **Affects Re-render** | No, only controls event flow.                                                                                                                                                                                                             | No, only controls default behavior.                                                                                                                                                                                                         |
| **Common Events**     | `onClick`, `onMouseOver` (events that bubble).                                                                                                                                                                                            | `onSubmit` (forms), `onClick` (links), `onKeyDown` (e.g., prevent Enter key submit).                                                                                                                                                        |
| **Example**           | `jsx<br>function Child({ onClick }) {<br>  const handleClick = (e) => {<br>    e.stopPropagation(); // Stops parent onClick<br>    console.log('Child clicked');<br>  };<br>  return <button onClick={handleClick}>Click</button>;<br>} ` | `jsx<br>function Form() {<br>  const handleSubmit = (e) => {<br>    e.preventDefault(); // Stops page reload<br>    console.log('Form submitted');<br>  };<br>  return <form onSubmit={handleSubmit}><button>Submit</button></form>;<br>} ` |
| **Props Connection**  | Often used in callback props (e.g., `onClick={e => e.stopPropagation()}`) to isolate events.                                                                                                                                              | Used in callback props (e.g., `onSubmit={e => e.preventDefault()}`) for custom logic.                                                                                                                                                       |
| **State/Refs**        | Combine with state (e.g., toggle UI) or refs (e.g., focus after click).                                                                                                                                                                   | Combine with state (e.g., form data) or refs (e.g., reset input after submit).                                                                                                                                                              |
| **Backend Tie**       | Less common, but can isolate clicks before API calls (e.g., `REACT_APP_API_URL`).                                                                                                                                                         | Common in forms to handle API submissions without reloading (e.g., `axios.post`).                                                                                                                                                           |
| **Virtual DOM/JSX**   | Part of synthetic event in `React.createElement` props (e.g., `onClick`).                                                                                                                                                                 | Part of synthetic event in `React.createElement` props (e.g., `onSubmit`).                                                                                                                                                                  |

**Why It Matters**: `event.stopPropagation` ensures event isolation in nested UIs, preventing unintended parent triggers. `event.preventDefault` enables custom control over browser actions, crucial for single-page apps (SPAs). Both enhance React’s declarative event system, integrating with props, state, and refs for dynamic UIs.

## What’s the difference between event.stopPropagation and event.preventDefault?

event.stopPropagation stops an event from bubbling to parent elements, isolating it to the current handler, like preventing a parent onClick in a nested button. event.preventDefault stops the browser’s default action, like preventing a form submission reload. For example, `<form onSubmit={e => e.preventDefault()}>` allows custom form handling, while `<button onClick={e => e.stopPropagation()}>` avoids parent triggers.

## useEffect

useEffect is a React Hook used in functional components to perform side effects, such as fetching data, updating the DOM, or subscribing to events.

> side-Effect means - A side effect is any operation that has an impact outside the scope of the current function. or, A side effect is something your component does besides just rendering UI.

## 4 Ways to write useEffect

1. With no dependency - it runs on every render

```
useEffect(() => {
  console.log("I run after every render");
});
```

2. With empty dependency array - it runs on first mount

```
useEffect(() => {
  console.log("I run only once");
}, []);

```

3. With Dependency array - runs whenever dependency change

```
useEffect(() => {
  console.log("Runs when 'count' changes");
}, [count]);

```

4. useEffect with Cleanup Function - On unmount or before effect re-runs if we want to clear any event kind..

```
useEffect(() => {
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => {
    clearInterval(timer);
    console.log("Cleanup on unmount or before re-run");
  };
}, []);

```

## What is unmount?

Component is removed from the screen (DOM).
Happens on:

- Route change
- Conditional rendering ({show && <Component />})
- Parent unmounts

## Why cleanup important?

Without cleanup, leftover side effects cause:

- Memory leaks
- Event listeners calling dead code
- React warnings (e.g., "can't update unmounted component")

## Class components workaround for useEffect

componentDidMount, componentDidUpdate, and componentWillUnmount
