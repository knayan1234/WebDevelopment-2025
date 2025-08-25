> Symbols, Hidden Properties, and Metaprogramming, Using symbols for property keys, hiding properties, customizing behavior with meta-programming, Global vs. private symbols, Well-known symbols ( Symbol.iterator , Symbol.toStringTag ), Uses for symbol properties in libraries, Enumeration and property/key visibility, How would you make a property non-enumerable and non-guessable in JS?, What are “well-known” symbols and why are they important?

## Symbols

Symbols are a new primitive data type came in picture on ES6 in 2015. A symbol is unique, one of a kind value in JS. Can be created using `Symbol` keyword. Once created, you can't change them.

[VIDEO](https://youtu.be/E5Bblr-SFbA)

```js
// Creating a symbol – no quotes needed
let myFirstSymbol = Symbol();

// You can add a description (a string) for clarity, but it's optional
let namedSymbol = Symbol("this is just a label");
```

- They are unique: Even if two symbols have the same description, they are not equal.

```js
let symbolA = Symbol("hello");
let symbolB = Symbol("hello"); // Same description, but...
console.log(symbolA === symbolB); // false – they are different!
```

**What is the use of it , why JS created it?**

Symbols are made mainly to make object keys as private and kindof hidden, to make it private keys.
Symbol properties are automatically hidden from loops and lists like Object.keys() or for...in

```js
let secretKey = Symbol("hidden info"); // Create symbol key

let myObject = {
  normalKey: "visible value", // String key
  [secretKey]: "secret value", // Symbol key – **note the brackets []**
};

console.log(myObject.normalKey); // "visible value"
console.log(myObject[secretKey]); // "secret value" – access with the symbol

console.log(Object.keys(myObject)); // ["normalKey"] – symbol key is hidden!
for (let key in myObject) {
  console.log(key); // Only "normalKey" – no symbol
}
```

To see symbol keys, use `Object.getOwnPropertySymbols(myObject)` – a special method. This makes symbols great for private data, like internal notes in an object.

## MetaProgramming

> Difficult topic, need to read again. Not clear!!

## Global vs. Private Symbols

Building on symbols as unique values, there are two types: private (also called local) and global.

1. Private Symbols: Created with `Symbol('description')`. Each one is totally unique, even if descriptions match. They're "private" because they're not stored anywhere shared; they're local to your code. Use them when you want something isolated, like a secret note only you can read.

```javascript
let privateKey1 = Symbol("room"); // Private
let privateKey2 = Symbol("room"); // Another private, but different

console.log(privateKey1 === privateKey2); // false – unique!
```

2. Global Symbols: Created with `Symbol.for('description')`. JS checks a shared "registry" (like a global list). If a symbol with that description exists, it returns the same one; otherwise, it creates and adds it. Use `Symbol.keyFor(sym)` to get the description back (only works for globals). They're "global" for sharing across different parts of code or files.

```javascript
let globalKey1 = Symbol.for("room"); // Checks registry, creates if new
let globalKey2 = Symbol.for("room"); // Gets the same one from registry

console.log(globalKey1 === globalKey2); // true – same symbol!

console.log(Symbol.keyFor(globalKey1)); // 'room'
```

_Why the difference? Private for no-sharing (e.g., internal object keys); global for coordination (e.g., multiple modules agreeing on a key). Note: Descriptions are just labels; they don't make symbols equal._

## Well-Known Symbols

Well-known symbols are special, pre-made symbols built into JavaScript, like standard tools everyone can use. They're "well-known" because their names and purposes are fixed in the language, allowing consistent metaprogramming across all code.

1. `Symbol.iterator`

   Imagine you have a toy box with fruits: apple, banana, cherry. Normally, JavaScript knows how to loop through built-in lists (like arrays) using for...of. But what if your toy box is a plain object? It won't loop automatically. Symbol.iterator lets you add a "loop rule" to make it work like a list.

2. `Symbol.toString`

> Need to check code - hard topic

> Few topics left. - Difficult, Re visit
