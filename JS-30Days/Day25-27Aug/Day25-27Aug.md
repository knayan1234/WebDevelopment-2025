> Composition, Higher-Order Functions, and Reusability, Function composition, map/filter/reduce, higher-order function patterns, Currying and partial application, Passing functions and closures safely, Chaining and compositionality, Law of Demeter in JS context, 1. What is a higher-order function? Give examples from built-in JS methods. 2. How can composition make code more testable and modular?

## Higher order Functions

A higher-order function (HOF) is a function that does at least one of these two things:

- Takes another function as an input (like accepting a callback).
- Returns a function as an output (like creating and giving back a new function).

**Built-in JavaScript Methods:**

- Array.map(): Takes a function and applies it to every item in an array, returning a new array with the results.

```js
const numbers = [1, 2, 3];
function double(num) {
  return num * 2; // The callback function
}
const doubled = numbers.map(double); // map is the HOF
console.log(doubled); // Outputs: [2, 4, 6]
```

- Array.filter(): Takes a function that checks a condition and returns a new array with only the items that pass the test.

```js
const ages = [15, 20, 25];
function isAdult(age) {
  return age >= 18; // Callback returns true or false
}
const adults = ages.filter(isAdult); // filter is the HOF
console.log(adults); // Outputs: [20, 25]
```

- Array.reduce(): Takes a function and combines all array items into a single value (like summing them up). It also takes an initial value.

```js
const prices = [10, 20, 30];
function sum(total, price) {
  return total + price; // Callback accumulates the value
}
const totalCost = prices.reduce(sum, 0); // reduce is the HOF, starts with 0
console.log(totalCost); // Outputs: 60
```

## Function Composition

Function composition is combining two or more functions to create a new function. The output of one becomes the input of the next.

```js
function addOne(x) {
  return x + 1;
}
function multiplyByTwo(x) {
  return x * 2;
}
// Composer function (this is a simple HOF that returns a new function)
function compose(fn1, fn2) {
  return function (x) {
    return fn2(fn1(x)); // fn1 runs first, output goes to fn2
  };
}
const addThenMultiply = compose(addOne, multiplyByTwo);

console.log(addThenMultiply(3)); // addOne(3) = 4, then multiplyByTwo(4) = 8. Outputs: 8
```

## Why does compose return a function with parameter x instead of running fn2(fn1(x)) immediately?

Here's the difference:

1. What happens if we try to do this inside compose?

   ```js
   function compose(fn1, fn2, x) {
     // adding x as a parameter here
     return fn2(fn1(x)); // running immediately and returning result
   }
   ```

This means: When you call compose, you must provide the input value x right away.

You lose the ability to create a reusable composed function.

You can only compose for one specific input value, not for any input you want later.

Example usage if compose worked this way:

```js
console.log(compose(double, addOne, 3)); // works and returns 7
console.log(compose(double, addOne, 4)); // works and returns 9
```

But you have to give x every time you call compose. So compose is just "run those functions once" — no new function is created that you can reuse with different inputs.

2. What happens with the normal compose function that returns a function with x?

   ```js
   function compose(fn1, fn2) {
     return function (x) {
       return fn2(fn1(x));
     };
   }
   ```

This means:

compose(fn1, fn2) creates a new function that remembers fn1 and fn2.

You can call that new function many times with any input x you want.

Much more flexible and reusable!

Example usage:

```js
const doubleThenAddOne = compose(double, addOne);

console.log(doubleThenAddOne(3)); // 7
console.log(doubleThenAddOne(10)); // 21
console.log(doubleThenAddOne(100)); // 201
```

You only do the composition once to create the function, then reuse it multiple times with different inputs.

## Map, filter and reduce

- Already done

## Currying a function, Law of demeter, partial application

> Difficult topic, need to read it again
