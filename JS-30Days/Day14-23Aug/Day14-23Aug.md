> Modern ES Features (from ES2021 to ES2025),Key recent features: optional chaining, nullish coalescing, logical assignment, top-level await, records & tuples (if available), Safe property access with `?`, When `??` differs from `||`, Potential runtime surprises with new features, How would legacy code react to modern patterns? Polyfill issues? , . Describe a scenario where optional chaining solves a real bug., What’s the difference between `??` and `||` ?

## ES2020 Features

#### Optional Chaining (?.)

Safe property access. It lets you read nested properties without crashing if something is null/undefined.

How it works: user?.address?.city returns undefined if user or address is missing, instead of throwing "Cannot read property of undefined."

#### Nullish Coalescing (??)

A way to set defaults only for null/undefined, not other falsy values.

Example:

```js
let name = user.name ?? "Guest";
// uses 'Guest' only if user.name is null/undefined, not if it's '' (empty string) or 0.
```

## ES2021 Features

#### Logical Assignment Operators (e.g., `&&=`, `||=`, `??=`)

These combine logic checks with assignment (setting a value). They're like shortcuts for "if this is true/false, then set it.

Example:

- Instead of `if (x) { x = y; }`, you can do `x &&= y;` (assign y to x only if x is truthy—not false, 0, "", etc.).
- `||=` assigns only if the left side is falsy (e.g., x ||= 'default'; sets x to 'default' if x is falsy).
- `??=` assigns only if the left side is null or undefined

#### String.prototype.replaceAll

for easy string replacements, and numeric separators (e.g., 1_000_000 for readability).

## ES2022 Features

#### Top-Level Await

> ? - Need to check

## ES2023 Features

#### findLast - Array method

search from the end, helps in to search faster as recent data inserted will be searched faster.

## ES2024 Features

#### Promise.withResolvers

A way to create promises with manual resolve/reject functions. Useful for advanced async patterns.

> ? - Need to check

## What's the Difference Between ?? and ||? (And When ?? Differs from ||)

`||` (logical OR) checks for falsy values: `false`, `0`, `''`, `null`,`undefined`, `NaN`. It returns the right side if the left is falsy.

Example:

```js
let age = 0 || 18;
//→ age is 18 (because 0 is falsy).
```

`??` (nullish coalescing) checks only for nullish values: `null` or `undefined`. It ignores other falsy values like `0` or `''`.

Example:

```js
let age = 0 ?? 18;
//→ age is 0 (because 0 isn't null/undefined—it's a valid "zero age").
```

## How Would Legacy Code React to Modern Patterns? Polyfill Issues?

- Legacy Reactions:

  Old JS engines (pre-2020 browsers like IE11) don't understand ?. or ??—they throw syntax errors immediately. Example: Mixing modern patterns in legacy code causes "Unexpected token '?'" crashes.

- Polyfill Issues:

  Polyfills are libraries (e.g., core-js) that add missing features to old environments.
