## Var, let and const

1. Var

   - scope is functional or global(not block scope).
   - It can be redeclared in the same scope
   - It can be decalared without initiliation
   - it can be accessed with initialization as its default value is "undefined"

2. Let

   - block scope({})
   - It can be updated but cannot be redeclared in the same scope
   - It can be declared without initialization
   - It cannot be accessed without initialization

3. Const
   - Block scope({})
   - Neither redeclare nor re update in any scope
   - cannot be declared without initialization
   - Cannot be access without initialization

# Hositing and TDZ

## Hoisting & TDZ in JavaScript

> AI

### Definition

**Hoisting** means JavaScript sets aside space for your variables and functions before it actually runs your code. So, it “remembers” their names first—even if you write them later.

**TDZ (Temporal Dead Zone)** is a period when a variable exists but you’re not allowed to use it—if you do, you get an error.

### Analogy

**Imagine a School Classroom:**

- Before class, the teacher puts name tags on desks for everyone (hoisting).
- If you use `var`, you’re allowed to sit at your desk any time, but your spot is empty (undefined) until you arrive.
- If you use `let` or `const`, the desk is reserved, but you’re not allowed to sit until roll call. Try too soon, and the teacher scolds you! (That’s the TDZ.)

### Types

| Type                      | What’s "hoisted"?                   | Use before declaration?              | Result before assignment                       |
| ------------------------- | ----------------------------------- | ------------------------------------ | ---------------------------------------------- |
| var variable              | Name hoisted, value set `undefined` | Yes (but it’s just `undefined`)      | `undefined`                                    |
| let/const variable        | Name hoisted, but not usable (TDZ)  | No, will get error (TDZ)             | ReferenceError (not allowed)                   |
| Function declaration      | Name + definition hoisted           | Yes, can use before written          | Full function works                            |
| Function expression/arrow | Only variable name hoisted          | No, get error or `undefined` if used | `undefined` or TypeError if you try to call it |

### Examples

#### 1. var Hoisting

```js
console.log(name); // undefined
var name = "Sita";
console.log(name); // "Sita"
```

- JS “sees” the name early, so it puts an empty tag first (`undefined`) and adds the value later.

#### 2. let/const & TDZ

```js
console.log(city); // ReferenceError!
let city = "Delhi";
console.log(city); // "Delhi"
```

- Try to use before the line `let city=...`, you get an error (the “teacher” won’t let you sit yet!).

#### 3. Function Declaration Hoisting

```js
greet(); // "Hello!"
function greet() {
  console.log("Hello!");
}
```

- The function is ready from the start, like a script for a play given to everyone in advance.

#### 4. Function Expression (not fully hoisted)

```js
sayHi(); // TypeError: sayHi is not a function
var sayHi = function () {
  console.log("Hi!");
};
```

- Only the name is hoisted, the function itself is not ready yet, so you get an error if you try early.

### Reason (Why this happens?)

- JavaScript checks your code FIRST for all the names (hoisting) so it knows what exists.
- `var`: For older code, JS allows you to use your variable anywhere in the function, but it’s undefined before you assign a value.
- `let` and `const`: To avoid mistakes, JS protects these variables with TDZ, so you can’t use them until they’re actually declared.
- Function Declarations: They are fully hoisted, so you can call them anytime in your code.
- Function Expressions/Arrow Functions: Only the variable is hoisted (`var` style), but the function itself is not assigned until the code runs that line.

> **Shortcut:**
>
> - Hoisting prepares names for you.
> - TDZ means "wait until I introduce you properly."
> - Safer code uses `let`/`const`, and knows about TDZ!

## Shadowing

**Shadowing**
Shadowing (or variable shadowing) happens when a variable declared within a certain scope (like a function or block) has the same name as a variable in an outer scope. The inner variable hides or “shadows” the outer one within its scope. As a result, any reference to that variable name in the inner scope refers to the inner variable, not the outer one. Once the inner scope ends, the outer variable is accessible again.

```
let x = 10;
function example() {
  let x = 20; // shadows the outer x
  console.log(x); // 20
}
console.log(x); // 10
```
