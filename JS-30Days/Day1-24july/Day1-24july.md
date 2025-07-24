> All notes are from my notebook + LLMs

## Javascript primitive types

String,Number,BigInt,Boolean,Undefined,Null,Symbol.

The data which is built in and that is not an object and has no methods in JS is primitive data types. Why if no methods then string methods are there? - MDN says , JS creates a wrapper object of that type and perform methods. Here comes the new word "Auto boxing"

## Auto boxing

By definition, primitive values do not have methods or properties . The reason a primitive data type like a string appears to have methods is due to a JavaScript process called auto-boxing .

When you try to access a property or call a method on a primitive value (with the exception of null and undefined), JavaScript performs the following steps behind the scenes :

- It creates a temporary "wrapper object" for the primitive value. For a string, it creates a String object; for a number, a Number object, and so on .

- This wrapper object has access to various built-in methods and properties (e.g., toUpperCase(), length for strings) .

- The requested method or property is accessed on this temporary object .

- Once the operation is complete, the temporary wrapper object is discarded, and the result is returned .

---

## Objects

An object in JavaScript is a special data structure used to store collections of related data and functions.All JavaScript values, except for primitives, are objects .
Arrays,Functions,Dates,Regular Expressions,Math, Maps, and Sets

**ways to create object**

1. Normal way that curly braces one.
2. Using object constructor `const person = new Object();`

**ways to target properties of object**
In JavaScript, you can access, target, and manipulate the values of an object in several ways, ranging from direct property access to using built-in methods that provide more control over iteration and property extraction [1][2][3].

Here are the primary methods to target the values and properties of an object:

| Way                                | Description                                                                                                                                                                             |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dot Notation**                   | Access a property using dot syntax (`obj.property`). This is the most common method and works with keys that are valid JavaScript identifiers.                                          |
| **Bracket Notation**               | Access a property using a string key inside brackets (`obj['property']`). This is useful for keys that contain spaces, special characters, or are determined dynamically by a variable. |
| **Object Destructuring**           | Extract multiple properties from an object and assign them to variables in a single statement. This provides a concise way to access the values you need.                               |
| **`Object.keys()`**                | Returns an array containing the names (keys) of an object's own enumerable properties. You can then use these keys to access the corresponding values.                                  |
| **`Object.values()`**              | Returns an array containing the values of all enumerable properties of an object, in the same order as a `for...in` loop would provide.                                                 |
| **`Object.entries()`**             | Returns an array of an object's own enumerable string-keyed property `[key, value]` pairs. This is useful for iterating over both keys and values simultaneously.                       |
| **`Object.getOwnPropertyNames()`** | Returns an array of all properties (both enumerable and non-enumerable) found directly upon a given object .                                                                            |
| **`for...in` loop**                | Iterates over all enumerable properties of an object, including inherited properties from its prototype chain, allowing you to access each key and its corresponding value.             |
| **`Object.assign()`**              | Copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object .                                                        |
| **`Object.hasOwnProperty()`**      | Returns a boolean indicating whether the object has the specified property as its own property (as opposed to inheriting it).                                                           |

## Value vs Reference

- Pass by Value (for Primitives)

When a variable holding a primitive type (`string`, `number`, `boolean`, etc.) is assigned to another variable, the actual value is copied. The two variables are completely independent of each other.

In short: You get a separate copy of the data.

- Pass by Reference (for Objects)

When a variable holding an object (`array`, `function`, etc.) is assigned to another variable, what gets copied is a reference (a pointer) to the object's location in memory—not the object itself. Both variables point to the exact same object.

In short: You get another pointer to the same data.

## Coersion

Type coercion in JavaScript is the automaticconversion of a value from one data type to another.

**How Coercion Works in Different Contexts**

1.  **String Coercion**

This happens when you use the `+` operator with a string. JavaScript converts the other value to a string and then concatenates (joins) them.

Example:

```javascript
let result = 5 + "10";
console.log(result); // Output: "510" (the number 5 is coerced to the string "5")
```

2.  **Numeric Coercion**

This happens when you use arithmetic operators other than `+` (like `-`, `*`, `/`) or comparison operators. JavaScript will try to convert non-numeric values to numbers.

Example:

```javascript
let result = "10" - 5;
console.log(result); // Output: 5 (the string "10" is coerced to the number 10)
```

3.  **Boolean Coercion**

This happens in logical contexts, like `if` statements or with the `&&` and `||` operators. JavaScript converts the value to `true` or `false` to evaluate the condition

> Truthy vs Falsy values

- Falsy values: These are values that coerce to `false`. They include `0`, `""` (empty string), `null`, `undefined`, `NaN`, and of course, `false`.
- Truthy values: Everything else coerces to `true`, including non-empty strings, non-zero numbers, arrays `[]`, and objects `{}`.

**Example:**

```javascript
if ("hello") {
  // This code runs because "hello" is a truthy value and coerces to true
  console.log("This is true!");
}

if (0) {
  // This code does not run because 0 is a falsy value and coerces to false
  console.log("This will not be printed.");
}
```

**Coercion with the `==` Operator (Loose Equality)**

The `==` operator is famous for performing type coercion before comparing two values. This can sometimes lead to confusing results.

Example:

```javascript
console.log(5 == "5"); // Output: true (the string "5" is coerced to the number 5)
console.log(true == 1); // Output: true (the boolean true is coerced to the number 1)
```

To avoid this, it's often recommended to use the strict equality operator (`===`), which checks for both value and type without performing any coercion.

```javascript
console.log(5 === "5"); // Output: false (different types)
```

## Undefined vs null

Undefined as the value never defined or not given any value. Null is we intentionaly give it to null.

## `===` vs `==`

three equals check value and type, 2 equals check value

## Object Wrappers.

In JavaScript, primitive values like numbers and strings are not objects, so they shouldn't have methods. Object wrappers are temporary objects that JavaScript creates behind the scenes to let you use methods on these primitives.

1. Automatic wrapper that is auto boxing (Above)

2. Manaul wrapping

```
// This is a primitive number
let primitiveNum = 10;

// This is a Number object wrapper
let objectNum = new Number(10);
```

## NaN and Object.is

In JavaScript, NaN is a special numeric value that stands for "Not-a-Number".While NaN means "Not-a-Number," its data type is actually 'number' .
Object.is()

The Object.is() method was introduced in ES6 to provide a more reliable way to compare two values for sameness. It determines if two values are the same without performing type coercion .

It behaves almost identically to the strict equality (===) operator, but with two key exceptions that make it more precise:

It correctly treats NaN as equal to itself.

It distinguishes between +0 and -0.

```
let result = 1 / "hello"; // This operation results in NaN
console.log(result === NaN);          // Output: false
console.log(Object.is(result, NaN));  // Output: true
Comparison: === vs. Object.is()
This table highlights the crucial differences when dealing with NaN and signed zeros:
```

## why type of null is object

The reason the typeof operator returns "object" for null is due to a bug in the very first version of JavaScript that was never fixed

## Prototype

In JavaScript, a **prototype** is the underlying mechanism that enables objects to inherit features (properties and methods) from other objects. Think of it as a blueprint or a template that other objects can link to.

Every object in JavaScript has an internal, hidden property called `[[Prototype]]` which is a link to another object. That other object is its prototype.

### The Prototype Chain

When you try to access a property on an object, the JavaScript engine performs the following steps:

1.  It checks if the property exists directly on the object itself.
2.  If it doesn't find the property, it looks at the object's prototype.
3.  If it's not on the prototype, it looks at the prototype's prototype, and so on.
4.  This sequence of linked objects is called the **prototype chain**.
5.  The chain ends when it reaches a prototype that is `null`. If the property isn't found anywhere in the chain, JavaScript returns `undefined`.

### A Simple Analogy

Imagine you are looking for a book.

1.  You first check your own bookshelf (the object itself).
2.  If it's not there, you go to your friend's house (the object's prototype) and check their bookshelf.
3.  If your friend doesn't have it, you go to the public library (the prototype's prototype, which is `Object.prototype`).
4.  If the library doesn't have it, your search ends (the chain ends at `null`), and you conclude the book is not available (`undefined`).

### Why is This Useful?

Prototypes are the foundation of **inheritance** in JavaScript. Instead of copying methods into every single object instance, you can define a method once on a shared prototype. All objects that link to that prototype can then access and use that method, which is highly efficient for memory .

**Example:**

All arrays in JavaScript can use the `.push()` method. This is because every array you create is linked to the `Array.prototype` object, which is where the `.push()` method is defined. You don't have to write the `.push()` logic for every new array; you get it for free through the prototype chain.

```javascript
const myArray = [];

// We didn't define a 'push' method on myArray.
// JS finds it by looking up the prototype chain to Array.prototype.
myArray.push(1);

console.log(myArray); // Output: [1]
```
