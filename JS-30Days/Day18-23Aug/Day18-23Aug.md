> Iterators, Generators, and Custom Iteration, Protocols for iterable/iterator/generator. Use-cases for custom iteration patterns., Implementing Symbol.iterator, Lazy evaluation with generators, Async iteration basics, When would you use a generator vs. a traditional function?, How do you make an object iterable in JS?, Write a simple generator for a custom data source.

## Iterables

<u>Firstly, it is not any type of function or thing we do in JS coding, it is something happening under the hood by loops. We can make our custom Iterables also.</u>

**What Are Iterables? (The Things You Can Loop Over)**

An iterable is any object (like a list) that you can loop through using <u>**for...of.**</u>

> for loop is also iterable as it is a looping method, in that case we do manual control step like saying go from 0 index to last minus 5th step

Built-in Iterables: Arrays, strings, maps, and sets are iterables by default. For example, a string is iterable because you can loop through each letter

```js
const word = "hello";

for (let letter of word) {
  console.log(letter); // h, e, l, l, o
}
```

Why This Works: Under the hood, iterables have a special "key" called Symbol.iterator. This is like a secret door that opens to give you an "iterator".

_If something doesn't have this, you can't use `for...of` on it. But you can add it to make custom things iterable._

## Iterators

An **Iterator** is an object that helps you get one item at a time from an iterable. It's like a bookmark that moves forward, telling you the current page and if there are more.

#### The Iterator Protocol (Simple Rule):

An iterator must have a `next()` method. When you call `next()`, it returns an object with two things:

- value: The current item (like the fruit name).
- done: A yes/no (boolean)—false if there are more items, true if finished

▫️Example with Array built it iterator:

```js
const fruits = ["apple", "banana", "orange"];
const iterator = fruits[Symbol.iterator](); // This gets the iterator

console.log(iterator.next()); // { value: 'apple', done: false }
console.log(iterator.next()); // { value: 'banana', done: false }
console.log(iterator.next()); // { value: 'orange', done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

## Making Your Own Iterable Object (Custom Iteration Basics)

```js
function makeIterator(arr) {
  let index = 0;
  return {
    next() {
      if (index < arr.length) {
        return { value: arr[index++], done: false };
      } else {
        return { done: true };
      }
    },
  };
}

const iter = makeIterator(["cat", "dog"]);
console.log(iter.next()); // { value: 'cat', done: false }
console.log(iter.next()); // { value: 'dog', done: false }
console.log(iter.next()); // { done: true }
```

## Generators

Generators are special functions that create iterators automatically.

How to Make One: Use `function*` (with the star) and yield to "give" a value and pause.

```js
function* countToThree() {
  yield 1; // Pause and give 1
  yield 2; // Pause and give 2
  yield 3; // Pause and give 3
}

const gen = countToThree(); // This creates a generator (which is an iterator)
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next()); // { value: undefined, done: true }
// yield is like saying "here's the next thing, now pause."
// Generators are iterables too, so you can use for...of on them.
```

## Generator vs. Traditional Function

A normal function runs all at once and returns one thing. A generator can pause and return many things over time. Use generators when you want to produce values lazily (only when needed), like for big lists to save memory

[GeeksForGeeks](https://www.geeksforgeeks.org/javascript/difference-between-generators-and-iterators-in-javascript/)

## Lazy Evaluation with Generators (Why It's Useful)

Lazy means "do work only when asked." Generators are lazy because they yield one value at a time, not all upfront.

Example: Infinite numbers, but only get what you need:

```javascript
function* infiniteNumbers() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

const nums = infiniteNumbers();
console.log(nums.next().value); // 1
console.log(nums.next().value); // 2
// It never ends, but doesn't crash because it's lazy!
```

## Async Iteration Basics

Sometimes data comes slowly (like from the internet). Async iterators handle that with `Symbol.asyncIterator` and for `await...of`

```js
async function* asyncGen() {
  yield Promise.resolve(1); // Wait for this
  yield Promise.resolve(2);
}

async function test() {
  for await (let num of asyncGen()) {
    console.log(num); // 1, then 2
  }
}
test();
```

## Re-Understanding - How Generators Work in Async and What Is the Need of `yield` if `await` Is There to Pause the Execution of Next Line?

> IMPORTANT - AS ITERATOR NOT A STANDALONE THING TO DO CODING, IS BASICALLY EVERY LOOP DOING UNDER THE HOOD.

### Tiny Step 1: What Is a Function? (The Basic Building Block)

A function is like a little machine that does one job when you turn it on. You "call" it (turn it on) to make it work. It gives back one thing and stops.

```js
function giveBall() {
  return "red ball"; // Gives one ball and stops
}

console.log(giveBall()); // You see: red ball
```

What happens: You call `giveBall()`, it runs, gives 'red ball', done. No pausing, no waiting, no many balls. Simple!

### Tiny Step 2: What Is a Generator? (A Machine That Pauses and Gives Many Things)

Now, imagine a machine that gives balls one by one, but pauses after each until you say "next." This is a generator. Use function\* (the star means "pausable machine"). Inside, yield means "give this ball and pause."

Toy example: Machine gives 3 colors of balls, pausing between.

```js
function* giveBalls() {
  yield "red ball"; // Give red, pause
  yield "blue ball"; // Give blue, pause
  yield "green ball"; // Give green, pause
}

const machine = giveBalls(); // Start the machine (doesn't run yet)
console.log(machine.next().value); // red ball (first push)
console.log(machine.next().value); // blue ball (second push)
console.log(machine.next().value); // green ball (third push)
console.log(machine.next().done); // true (no more balls)
```

What happens: The machine doesn't give all balls at once. It waits for you to call `next()` each time. This is "lazy"—it only makes the next ball when you ask, not all upfront. Good for not wasting balls if you only want one or two.

You can also use a loop to get all without **manual `next()`**:

```javascript
for (const ball of giveBalls()) {
  console.log(ball); // red ball, blue ball, green ball
}
```

### Tiny Step 3: What Is Async? (A Machine That Waits for Slow Things)

Sometimes making a ball takes time, like waiting for paint to dry. "Async" means the machine can wait without stopping the whole playground.

Use async function for this. Inside, await means "pause here until this slow thing finishes." It gives a "promise" (like a ticket saying "I'll give the ball later").

Toy example: Machine waits 1 second to "paint" a ball.

```javascript
async function paintBall() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
  return "painted ball";
}

// To use it (wrap in async because we wait)
async function Test() {
  const ball = await paintBall();
  console.log(ball); // painted ball (after 1 second)
}
Test();
```

What happens: await pauses this machine for 1 second, then gives the ball. The rest of your code (playground) keeps playing—no freeze. But it gives only one ball total, and runs everything in one go

### Tiny Step 4: Now, Async Generators (Mix Pausing + Waiting)

An async generator is a pausable machine (generator) that also waits for slow things (async). It's like a toy machine that:

Makes one ball at a time.

Waits if painting is slow (await).

Pauses completely after each ball until you ask for next (yield).

Use async function\* (async + star). It gives many balls lazily, with waits if needed.

Toy example: Machine gives 3 painted balls, waiting 1 second for each paint, pausing between.

```js
async function* paintBalls() {
  yield await new Promise((resolve) =>
    setTimeout(() => resolve("red ball"), 1000)
  ); // Wait 1 sec, give red, pause
  yield await new Promise((resolve) =>
    setTimeout(() => resolve("blue ball"), 1000)
  ); // Wait 1 sec, give blue, pause
  yield await new Promise((resolve) =>
    setTimeout(() => resolve("green ball"), 1000)
  ); // Wait 1 sec, give green, pause
}

// To use it (wrap in async for waiting)
async function Test() {
  const machine = paintBalls();
  console.log((await machine.next()).value); // red ball (after 1 sec)
  console.log((await machine.next()).value); // blue ball (after another sec)
  console.log((await machine.next()).value); // green ball (after another sec)
}
Test();
```

Easier way with a loop (handles the awaits for you):

```javascript
(async () => {
  for await (const ball of paintBalls()) {
    console.log(ball); // red ball (1 sec), blue ball (1 sec), green ball (1 sec)
  }
})();
```

Table of Differences

| Part          | What It Does (Toy Analogy)             | Why Needed?                        |
| ------------- | -------------------------------------- | ---------------------------------- |
| Await         | Wait for paint to dry on one ball      | For slow things like internet data |
| Yield         | Give ball and sit down (pause machine) | For lazy—one ball at a time        |
| Both Together | Wait for paint, give ball, sit down    | Lazy waiting for many balls        |
