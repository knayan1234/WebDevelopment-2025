# Types of functions

1. **Function Declaration**

```
fucntion fun1(){
   return(console.log("I am inside fun1"))
}
```

2. **Function expression**

```
const returnedValue=function fun1(){
     return(console.log("I am inside fun1"))
}
```

3. **Arrow Fcuntion**

```
const returnedValue =()
=>
     (console.log("I am inside fun1"))
```

# **concise table**

| Aspect                          | Function Declaration                                                                                                                                  | Function Expression                                                                                                             | Arrow Function                                                                                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Syntax**                      | `function foo() { /* code */ }`                                                                                                                       | `const foo = function() { /* code */ };`                                                                                        | `const foo = () => { /* code */ };`                                                                                                                     |
| **Hoisting**                    | Fully hoisted — can call before defining the function.                                                                                                | Not hoisted — variable is hoisted, but function is not ready.                                                                   | Not hoisted — like a `const` variable, must define first.                                                                                               |
| **`this` Binding**              | Has its own dynamic `this`, determined by how it’s called.                                                                                            | Has its own dynamic `this`, also call-dependent.                                                                                | Lexically inherits `this` from surrounding scope — no own `this`.                                                                                       |
| **Anonymous?**                  | No — must have a name.                                                                                                                                | Can be anonymous or named, useful for callbacks and closures                                                                    | Always anonymous, typically used inline and short-hand.                                                                                                 |
| **Arguments Object**            | Available — `arguments` refers to all passed parameters.                                                                                              | Available — `arguments` object is present inside function.                                                                      | Not available — must use rest parameters to access args.                                                                                                |
| **Can be Used as Constructor?** | Yes — functions can be used with `new` to create instances.                                                                                           | Yes — can also be used with `new`.                                                                                              | No — throws error if called with `new`.                                                                                                                 |
| **Suitable for Methods?**       | Good — supports dynamic `this` binding useful for object methods.                                                                                     | Good — behaves like declaration, binds `this` dynamically.                                                                      | Not ideal — `this` is lexical, so problematic in object methods.                                                                                        |
| **Common Use Cases & Why**      | Define reusable, named functions that can be hoisted and used anywhere. Ideal when you want function before declaration or need method-like behavior. | Used for inline or conditional function definitions, callbacks, and closures. Offers flexibility with naming and scope control. | Best for concise functions where lexical `this` is helpful, especially in callbacks or array methods. Preferred for short, simple, one-liner functions. |

# `this`

Sure! Here’s a clear and simple explanation of how the **`this`** keyword behaves differently in **arrow functions** compared to **traditional functions** in JavaScript:

### Traditional Functions (`function` keyword)

- The value of **`this`** depends on **how** you call the function. This means `this` is **dynamic**.
- If you call the function as a method of an object, `this` refers to that object.
- If you call the function alone (not as part of an object), `this` usually refers to the global object (like `window` in browsers) or can be `undefined` in strict mode.
- You can change `this` explicitly using `.call()`, `.apply()`, or `.bind()` methods.
- Traditional functions can also be used as **constructors** with the `new` keyword.
- Traditional functions have their own `arguments` object to access all passed arguments.

**Example:**

```js
const obj = {
  name: "Alice",
  greet: function () {
    console.log(this.name); // 'Alice' because called as obj.greet()
  },
};

obj.greet();

const greet = obj.greet;
greet(); // undefined or global name because now called standalone
```

### Arrow Functions (`=>` syntax)

- The value of **`this`** is **fixed** to whatever `this` is in the **surrounding (parent) scope** when the arrow function is created. This is called **lexical binding**.
- Arrow functions do **not** have their own `this`. They don’t care how you call them — `this` always points to the outer context.
- Because of this, arrow functions are **not suitable** to be used as object methods if you want to access the object via `this`.
- You **cannot** change `this` inside arrow functions using `.call()`, `.apply()`, or `.bind()` — it will be ignored.
- Arrow functions cannot be used as constructors (`new` will throw an error).
- Arrow functions do **not** have their own `arguments` object; you must use rest parameters (`...args`) to access arguments.

**Example:**

```js
const obj = {
  name: "Bob",
  greet: () => {
    console.log(this.name); // undefined, because `this` refers to outer scope (likely global)
  },
};

obj.greet();

const outerThis = {
  name: "Charlie",
  regularFunction: function () {
    const arrowFunc = () => {
      console.log(this.name); // 'Charlie', `this` lexically bound from regularFunction
    };
    arrowFunc();
  },
};
outerThis.regularFunction();
```

### Summary in Simple Terms:

| Point                       | Traditional Function                           | Arrow Function                                   |
| --------------------------- | ---------------------------------------------- | ------------------------------------------------ |
| **How `this` is set**       | Depends on how you call the function (dynamic) | Fixed to where the function is defined (lexical) |
| **Can `this` change?**      | Yes, using `.call()`, `.apply()`, `.bind()`    | No, it’s always the same as outer scope          |
| **Usable as method?**       | Yes, `this` refers to calling object           | No, `this` does not refer to the object          |
| **Can be constructor?**     | Yes                                            | No                                               |
| **Has `arguments` object?** | Yes                                            | No, must use rest parameters                     |

### When to use which?

- Use **traditional functions** when you want flexible `this` behavior, like in object methods or constructors.
- Use **arrow functions** when you want to keep `this` the same as the surrounding scope, such as inside callbacks or nested functions, to avoid having to use `.bind()` or variables like `self = this`.
