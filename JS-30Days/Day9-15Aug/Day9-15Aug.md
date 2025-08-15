> Promises,chaining, error handling, async/await abstraction,Promise chaining — return vs. side effect,Error propagation and missed catch,Sequential vs. parallel async flows,Await-ing non-Promise values; resolving with another Promise.

### Synchronous and Asynchronous

Sync means that code runs in particular sequence of instructions given in the program. Each instruction waits for the previous instruction to complete its execution.
Async means to run a piece of the code in different thread so that the main thread doesnot gets blocked and program can run.

### Callbacks

functions passed as a parameter to another function is called callback function.

```js
function sum(a, b) {
  console.log(a + b);
}

function anotherCallerFunction(firstNum, secondNum, callbackFunction) {
  callbackFunction(firstNum, secondNum);
}

anotherCallerFunction(2, 4, sum);
```

### Callback hell

Nested callback in one creating a nested callback and this problem is known as callback hell. Sometime refers as "Pyramid of doom".

```js
function getData(dataId, nextGetData) {
  setTimeout(() => {
    console.log(dataId);
    if (nextGetData) {
      nextGetData();
    }
  }, 1000);
}

getData(1, () =>
  getData(2, () =>
    getData(3, () =>
      getData(4, () =>
        getData(5, () =>
          getData(6, () =>
            getData(7, () => getData(8, () => getData(9, () => getData(10))))
          )
        )
      )
    )
  )
);
```

### Promises and Promises chain

A Promise in JavaScript is like a placeholder for something that will happen in the future, usually an asynchronous task (something that doesn't happen right away, like loading a file or making an API call). It represents the eventual result of that task, which could succeed or fail.

States of a Promise: It can be pending (still working), fulfilled (success with a value), or rejected (failed with an error)

> We dont create promises , we as a FE developer consume that. Although we can make a promise also in our code.

**Promise Chaining**
Chaining lets you run multiple async tasks one after another by attaching `.then()` calls. Each `.then()`returns a new Promise, so you can keep going.

```js
function getData(dataId) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log("data", dataId);
      res("Success!!");
    }, 5000);
  });
}

getData(1)
  .then((res) => {
    return getData(2);
  })
  .then((res) => {
    return getData(2);
  })
  .then((res) => console.log(res));
```

### Return vs. Side Effect in Chaining

In chaining, what you return from a `.then()` handler passes to the next one. A side effect is something you do without returning, like logging or updating a variable.

Return (Better Practice): Always return a value or another Promise. This passes data cleanly to the next step and keeps your code functional (easier to test and reuse).

Example:

```js
Promise.resolve(5)
.then(num => num \* 2) // Returns 10 to the next
.then(result => console.log(result)); // Logs 10

```

Example ():

```js
Promise.resolve(5).then((num) => {
  console.log(num);
}); // Side effect, returns undefined
// Stick to returns for predictable chains.
//Side Effect (Avoid if Possible): Doing something without returning can break the chain or lead to unexpected behavior. It might increase "functional core" but can make code harder to follow.
```

### Async await

Can make any function as async . It returns a promise. Await pauses the execution of its down line in the async function scope where it is written.

### Sequential vs. Parallel Async Flows

Async flows control how multiple tasks run: one after another (sequential) or at the same time (parallel).

Sequential (Chain): Tasks wait for the previous to finish. Use chaining or awaits in a row.

Example (with async/await):

```js
async function sequential() {
  let r1 = await doJob(1);
  let r2 = await doJob(2); // Starts after r1
  console.log(r1 + r2);
}
//Total time is sum of all (e.g., 3 seconds for two 1.5s tasks).
```

Parallel (Concurrent): Tasks start together for speed. Use Promise.all() or assign without awaiting immediately.

Example:

```js
async function parallel() {
  let p1 = doJob(1);
  let p2 = doJob(2);
  let [r1, r2] = await Promise.all([p1, p2]); // Waits for both
  console.log(r1 + r2);
}
// Total time is the longest task (e.g., 1.5 seconds for two 1.5s tasks).
```

### What happens if you forget to return a Promise in a `.then`chain? ⁉️

Suppose you have a Promise chain like this:

```js
Promise.resolve(2)
  .then((num) => {
    num = num * 3;
    // Forgot to return num!  return num;
  })
  .then((result) => {
    console.log(result); // This will print 'undefined'
  });
```

If you forget to return `num` inside the first `.then()`, JavaScript acts as if you returned nothing; the next step sees `undefined`.

Now imagine you do something asynchronous:

```js
.then(() => {
  startAsyncTask(); // Started, but didn’t return the Promise!
})
```

Since you didn’t return the Promise from `startAsyncTask`, the chain moves to the next `.then()` without waiting for it to finish.

To fix, always use `return`—like `return num;` or `return startAsyncTask();`—to let the chain work smoothly.
