- Execution Context and Event Loop
- How JavaScript executes code: call stack, event loop, microtasks vs. macrotasks
- Starvation (microtask queue growth)
- setTimeout , Promise.resolve , queueMicrotask
- Blocking the event loop

### Execution context Event loop

An execution context in JavaScript is a special environment created by the engine to handle the transformation and execution of code, containing the currently running code along with variables, functions, and other aids for execution. It determines the scope and accessibility of variables and functions during runtime.

Two blocks are there in execution context -> Memory and Code block . Memory stores the variables memory as undefined and function as full function body. Code block executes the code in a single thread line by line.

There are two types of execution context

1. GEC - Global execution context is created when JS started its program. Same memory and code block
2. Specific EC - It is created for every functions body seperately.

### How JavaScript executes code: call stack, event loop, microtasks vs. macrotasks

> **[JS Visualized](https://youtu.be/eiC58R16hb8?si=l6QKHCQicOws9aA-)**

**_ Callstack _**

Call Stack: The Tracker for Synchronous Code

A simple LIFO (last-in, first-out) stack that holds execution contexts.

Synchronous code runs right away: Push context onto stack → Execute top one → Pop when done.

Example:

```js
function a() {
  b();
}
function b() {
  console.log("hi");
}
//  a(); – Stack: GEC → FEC for a → FEC for b (logs 'hi') → Pop b → Pop a → Pop GEC.
```

**Microtasks vs. Macrotasks: The Two Queues**

Tasks are split into two queues for priority:

1. Microtasks: High-priority, urgent tasks. The event loop clears the entire microtask queue in one go (exhaustively) before moving on. Examples:

Promise resolutions (e.g., .then() or .catch()).

MutationObserver (for DOM changes).

queueMicrotask (explicit microtask scheduling).

In Node.js, process.nextTick.

2. Macrotasks: Lower-priority, everyday tasks. The event loop processes only one per iteration, after microtasks. Examples:

setTimeout or setInterval.

I/O operations (e.g., file reads in Node.js).

UI events (clicks) or rendering.

requestAnimationFrame.

_Key difference: Microtasks "jump the line." If you schedule a microtask and a macrotask at the same time, the microtask runs first (even with setTimeout(fn, 0))._

**EXAMPLE**

```js
console.log("Start"); // Synchronous
setTimeout(() => console.log("Timeout"), 0); // Macrotask
Promise.resolve().then(() => console.log("Promise")); // Microtask
console.log("End"); // Synchronous
// Output: Start → End → Promise → Timeout.
```

`Macro - not important tasks (think as small ,opposite of its english meaning)`

### Starvation

It is when we have many microtasks in the microtask queue and the macro one is not able to come to the call stack. If microtasks endlessly create more microtasks (e.g., a loop with recursive Promises), the queue grows, and the event loop stays busy clearing it – starving macrotasks like timers or events.

> **[VisitThisToUnderstandBetter](https://www.jsv9000.app/)**
