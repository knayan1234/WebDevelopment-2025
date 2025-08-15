> Arrays: Methods, Iterability, and Mutation, Arrays as objects, mutative vs.non-mutative array methods, iteration protocols, Array holes vs. undefined values, Spread and destructuring with arrays, Array.from , array-likes and iterables, Creating sparse arrays vs. new Array(size), What’s the difference between .forEach,.map,and.reduce?, How would you convert an array-like object to a true array?

## Arrays as Objects in JavaScript

At the core, arrays in JavaScript are specialized objects that store multiple values in a single variable, acting like ordered collections. Unlike plain objects, arrays have a length property that automatically updates as elements are added or removed, and they use numeric indices as keys

## Ways to create Arrays

1. `const sampleArray =["first","second"]`
2. `const sampleArrayConstructor = new Array(1991,1992,1993)`

> The array constructor has one intersting thing. If you doo `new Array(7)`, it takes 7 as length and give me blank array of 7 length.

| Code           | Resulting Array       | Length | Notes                                    |
| -------------- | --------------------- | ------ | ---------------------------------------- |
| `new Array(7)` | `[ <7 empty items> ]` | `7`    | Creates _empty slots_, not actual values |
| `Array.of(7)`  | `[7]`                 | `1`    | Treats argument as an element            |
| `[7]`          | `[7]`                 | `1`    | Literal, simplest way                    |

## JS Array methods

[w3Schools-ArrayMethods](https://www.w3schools.com/js/js_array_methods.asp)

> See notebook also

## JS Iteration

[w3Scools-ArrayIterations](https://www.w3schools.com/js/js_array_iteration.asp)

## Array

## `.forEach`

Give results without creating new array

```js
const numbers = [1, 2, 3];
numbers.forEach(function (item) {
  console.log(item * 2); // This will print 2, 4, 6
});
console.log(numbers); // Still [1, 2, 3] — no changes!
```

## `.map`

returns new array

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(function (item) {
  return item * 2; // Returns 2, 4, 6
});
console.log(doubled); // [2, 4, 6] — a new array!
console.log(numbers); // Still [1, 2, 3]
```

## `.reduce`

The callback takes an "accumulator" (the running total) and the current item. You can provide an initial value for the accumulator. It goes through each item, updating the accumulator. and returns one reduced value.

```js
const numbers = [1, 2, 3];
const sum = numbers.reduce(function (accumulator, item) {
  return accumulator + item; // Starts with 0 (if no initial), adds 1 (becomes 1), adds 2 (becomes 3), adds 3 (becomes 6)
}, 0); // 0 is the initial accumulator
console.log(sum); // 6
console.log(numbers); // Still [1, 2, 3]
```

## Spread Operator and Destructuring with Arrays

The spread operator (...) is like unpacking a box and spreading its contents out. Destructuring is like assigning those unpacked items to separate spots easily. They're often used together and don't change the original array.

```js
const original = [1, 2, 3];
const copy = [...original]; // Spreads elements into a new array
copy.push(4); // Modify the copy
console.log(copy); // [1, 2, 3, 4]
console.log(original); // [1, 2, 3] — original is safe!
```

Destructuring is a quick way to "unpack" an array's items into separate variables, like opening a package and assigning each toy to a friend. It's easy and makes code shorter—no need for multiple lines to grab values.

Basic Unpacking:-

```js
const toys = ["ball", "doll", "car"];
const [toy1, toy2, toy3] = toys; // Unpacks into variables
console.log(toy1); // 'ball'
console.log(toy2); // 'doll'
// The original toys array doesn't change.
```

## Array.from, Array-likes, and Iterables

Array.from() creates a new array from array-like objects (with length and indexed access, like arguments) or iterables (like strings or sets). Syntax: Array.from(source, mapFn, thisArg);—it optionally maps elements. For example, Array.from('hello') yields ['h', 'e', 'l', 'l', 'o'].

Array-likes lack array methods but mimic structure (e.g., NodeList from DOM queries). Iterables follow the iteration protocol, allowing for...of. Use Array.from() to convert for array method access. It's versatile for creating arrays from generators or maps.

## Sparse Arrays

A array with some holes

How to Create a Sparse Array

1. Using new Array(size): Makes an array of a certain length with all holes.

```js
const train = new Array(3); // Length 3, but cars 0, 1, 2 are holes
console.log(train); // Shows something like [ <3 empty items> ]
console.log(train); // undefined (but it's a hole, not set)
```

2. With commas in literals: Extra commas create holes.

```js
const colors = ["red", , "blue"]; // Hole at index 1
console.log(colors[5]); // undefined (hole)
```

3. Setting high indices: Skips lower ones, making holes.

```js
const items = [];
items[1] = "hat"; // Holes at 0 and 1, length becomes 3
```

- **Holes vs. Undefined**

Hole: Truly empty slot. Test with in: 1 in colors is false.

Undefined: An actual value you set. colors = undefined; makes 1 in colors true.

Difference in action:

```js
const withUndefined = [1, undefined, 3];
withUndefined.map(x => x \* 2); // [2, NaN, 6] (processes undefined)

const withHole = [1, , 3];
withHole.map(x => x \* 2); // [2, , 6] (skips hole)
```

Holes get skipped by some methods like map(), but forEach() treats them as undefined.

## Converting an Array-like Object to a True Array

To convert array-likes (e.g., arguments or NodeList) to true arrays with methods, use `Array.from(arrayLike)` —it creates a new array instance. Alternatives include spread: `const arr = [...arrayLike];`or `Array.prototype.slice.call(arrayLike)`. This enables array methods like `map()` on the result. For example, `Array.from(document.querySelectorAll('div'))` turns a NodeList into an array.

## Rest method?
