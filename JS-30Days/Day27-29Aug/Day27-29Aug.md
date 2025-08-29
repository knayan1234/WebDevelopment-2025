> Defensive Patterns for Security and Robustness, Secure JS coding: injection risks, prototype pollution, and safe property access, Reading/writing only “own” properties, Defensive input handling (escaping, filtering), Immutability for security, Attacks via prototype chain manipulation.

## Defensive code

Handles unexpected inputs gracefully.

```js
function addNumbers(a, b) {
  return a + b; // Assumes a and b are numbers
}
console.log(addNumbers(5, "hello")); // Outputs: '5hello' (not what we want!)
```

```js
function addNumbers(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both inputs must be numbers!"); // Guard against bad input
  }
  return a + b;
}
```

## Secure JS Coding and Injection Risks

Injection risks happen when untrusted input (like from a user) is treated as code and executed. It's like letting a stranger whisper commands into your ear— they might say something harmful!

```js
let userInput = '<script>alert("Hacked!")</script>'; // Malicious input
document.body.innerHTML = "Hello, " + userInput; // Injects and runs the script!
```

```js
function escapeHTML(input) {
  return input
    .replace(/&/g, "&amp;") // Replace dangerous chars
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

let userInput = '<script>alert("Hacked!")</script>';
document.body.innerHTML = "Hello, " + escapeHTML(userInput); // Outputs safe text, no script runs
```

## Prototype Pollution

**Also read , Day6-7Aug.md file in JS-30Days folder for prototype**

Prototype pollution is a vulnerability in JavaScript where an attacker (or buggy code) can add or change properties on the global Object.prototype—the ultimate parent of almost all objects. Once polluted, every new object you create inherits these unwanted properties, which can break your app or allow hackers to inject malicious behavior.

1. To use `__proto__` and change it
2. To use prototype constuctor and change it

```js
function merge(target, source) {
  for (let key in source) {
    target[key] = source[key]; // Blindly copies everything
  }
  return target;
}

let safeObj = {};
let maliciousInput = JSON.parse(
  '{"__proto__": {"hacked": "You\'re polluted!"}}'
); // Attacker-controlled JSON

merge(safeObj, maliciousInput);

let newObj = {}; // Innocent new object
console.log(newObj.hacked); // Outputs: "You're polluted!" (Inherited from polluted prototype)
```

## Safe Property Access and Reading/Writing Only “Own” Properties

using optional chaining and nullish operator etc. Basically to check if data is there or not before adding to the variable.

## Defensive Input Handling (Escaping and Filtering)

This builds on injection: Always filter (remove bad parts) and escape (neutralize) user input.

Step-by-Step:

1. Filtering: Check and remove invalid data. E.g., if expecting a number, reject non-numbers.
2. Escaping: As shown earlier, convert to safe formats.

When? Anytime you handle input from APIs, forms, or files.

Example Function:

```javascript
function safeInput(input) {
  if (typeof input !== "string") return ""; // Filter: Only allow strings
  // Filter out bad words or patterns (simple regex)
  input = input.replace(/badword/gi, ""); // Remove 'badword'
  // Escape for HTML
  return escapeHTML(input); // From earlier function
}

let badInput = "Hello <script>badword</script>";
console.log(safeInput(badInput)); // Outputs: 'Hello &lt;script&gt;&lt;/script&gt;' (safe, filtered)
```

## Immutability for Security

Immutability means making data unchangeable after creation. It's like sealing a letter—you can't alter it without breaking the seal. like `Object.freeze()`.
