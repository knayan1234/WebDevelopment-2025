> Defensive Coding, Guard Patterns, and Type Resilience, Building fail-safe code (type checks, guards, input validation), Pattern: Defensive “bail-out” (early return), Making code robust to “invalid” inputs, Avoiding Type Coercion Surprises, Pitfalls of overly-defensive code, 1. How do you make a function robust against bad input? 2. What’s the trade-off between fail-fast vs. fail-silent in a reusable JS utility?

## Defensive coding

Since JS is loosely typed language and that is why its prone to errors. Example - we have a function that takes 2 params as numbers and while calign the function lets say we call with strings not numbers. What will happen. Some crazy result because of type coercion. So it is better to handle that using some type checks, this is called defensive coding.

```js
// Non-defensive version: Assumes inputs are always numbers
function addNumbers(a, b) {
  return a + b; // If a is "2" and b is 3, it coerces to 5 (surprise!)
}

// Defensive version: Checks types first
function addNumbers(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    console.error("Error: Both inputs must be numbers!");
    return null; // Gracefully return nothing instead of wrong result
  }
  return a + b;
}

console.log(addNumbers(2, 3)); // 5
console.log(addNumbers("2", 3)); // Logs error and returns null
```

## Guard Patterns and Building Fail-Safe Code

```js
function processUserData(user) {
  // Guard 1: Check if user is an object
  if (typeof user !== "object" || user === null) {
    throw new Error("Invalid input: user must be an object");
  }

  // Guard 2: Validate required fields
  if (!user.name || typeof user.name !== "string") {
    return { error: "Name is missing or not a string" }; // Fail-safe: Return error object
  }

  if (!user.age || typeof user.age !== "number" || user.age < 0) {
    return { error: "Age is invalid" };
  }

  // If all guards pass, proceed
  return { message: `Hello, ${user.name}! You are ${user.age} years old.` };
}

console.log(processUserData({ name: "Alice", age: 30 })); // { message: 'Hello, Alice! You are 30 years old.' }
console.log(processUserData({ name: "Bob", age: -5 })); // { error: 'Age is invalid' }
console.log(processUserData(null)); // Throws Error
```

## Type Resilience

Type resilience means your code is "tough" against type-related issues. JavaScript's loose typing can lead to bugs, so resilience involves making code adaptable but safe.

How to Achieve It: Combine type checks with fallbacks. For resilience in larger apps, consider TypeScript, but in plain JS, use guards.

Connection to Defensive Coding: It's about long-term strength—resilient code handles evolving inputs without breaking.

Example: A resilient function that handles arrays or single items.

```javascript
function sumItems(items) {
  if (!Array.isArray(items)) {
    items = [items]; // Make it resilient: Convert non-array to array
  }
  return items.reduce((total, item) => total + item, 0);
}

console.log(sumItems([1, 2, 3])); // 6
console.log(sumItems(5)); // 5 (resilient!)
```

## Pattern: Defensive “Bail-Out” (Early Return)

The "bail-out" pattern is a simple but powerful guard: If something's wrong, return early from the function. This keeps code clean and avoids nested if-else hell.

Why Use It? It makes functions easier to read—like exiting a maze early if you hit a dead end.

Steps: Place checks at the top; if they fail, return immediately.

Example:

```javascript
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") return "Invalid types"; // Bail-out
  if (b === 0) return "Cannot divide by zero"; // Another bail-out
  return a / b; // Only reaches here if all is good
}

console.log(divide(10, 2)); // 5
console.log(divide(10, 0)); // 'Cannot divide by zero'
```

```js
function sendEmail(to, message) {
  if (typeof to !== "string" || !to.includes("@")) return "Invalid email"; // Robust check
  if (!message) message = "Default message"; // Fallback for robustness
  console.log(`Sending to ${to}: ${message}`);
  return true;
}
```

## What’s the trade-off between fail-fast vs. fail-silent in a reusable JS utility?

Fail-fast means crashing loudly and early (e.g., throw Error) to catch bugs quickly—great for debugging but can break apps if not handled. Fail-silent means quietly handling errors (e.g., return null and log)—keeps the app running but can hide issues, leading to "silent failures" that are hard to trace. Trade-off: Fail-fast is better for development/debugging; fail-silent for production/user-facing code to avoid crashes. In reusable utilities, prefer fail-fast with options for silent mode.

## Pitfalls of Overly-Defensive Code

Being too defensive is like over-locking your house—you might lock yourself out! Pitfalls include:

- Performance Hits: Too many checks slow down code.
- Readability Issues: Functions bloated with guards are hard to follow.
- Over-Engineering: Defending against rare cases wastes time.
- False Security: It might hide deeper bugs instead of fixing them.
- Balance Tip: Defend only what's likely to fail; use tools like ESLint for help.
