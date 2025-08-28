> Defensive Async: Race Conditions & Deadlocks, Understanding race conditions, avoiding double-resolutions, atomic operations in async code, Locking patterns (JS-only, with references), Idempotency — making promises safe for repeats, Deadlocks with chained or cyclic async code, Using AbortController for cancellation and cleanup,

## Race conditions

```js
let score = 0; // Shared resource

async function incrementScore() {
  const current = await fetchCurrentScoreFromServer(); // Async fetch
  score = current + 1; // Update
  await updateScoreOnServer(score); // Async update
}

// If two users click at once:
incrementScore(); // Call 1 starts, fetches score=0, plans to set to 1
incrementScore(); // Call 2 starts, also fetches score=0, plans to set to 1
// Result: Both set to 1, but it should be 2! Race condition.
```

## Locking Patterns

> Re read this topics

## Deadlocks with Chained or Cyclic Async Code

A deadlock is when async tasks wait for each other forever, like two people each holding a door for the other—neither moves! In JS, it happens in chained promises (A waits for B, B waits for A) or cyclic dependencies.

Why It Happens: Circular waits, like promise A awaits promise B, but B awaits A.

Step-by-Step Example: Chained deadlock.

```javascript
async function taskA() {
  await taskB(); // Waits for B
  console.log("A done");
}

async function taskB() {
  await taskA(); // Waits for A — deadlock!
  console.log("B done");
}

taskA(); // Hangs forever
```

## Using AbortController for Cancellation and Cleanup

AbortController is JS's built-in way to cancel async operations, like hitting "stop" on a download. It's great for cleaning up races or preventing deadlocks by timing out.

Step-by-Step: Create a controller, pass its signal to fetch or other async ops, then abort when needed.

Basic Code Example:

```javascript
const controller = new AbortController();
const signal = controller.signal;

async function fetchWithAbort() {
  try {
    const response = await fetch("/api/data", { signal }); // Attaches signal
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Fetch aborted!");
    }
  }
}

fetchWithAbort();
// Later, to cancel: controller.abort(); // Stops the fetch
```

**12Aug-self.md see (React Notes)**

## What Are Atomic Operations?

Atomic operations (or "atomicity") come from the idea of atoms—tiny, indivisible units. In programming, an atomic operation is one that either completes fully or doesn't happen at all. No halfway states, and no interruptions from other code. This is crucial in async JS because multiple tasks might try to modify the same thing (like a shared variable), leading to race conditions.

Why It Matters in Async Code: In a world of promises and awaits, async tasks can overlap. Atomic ops "lock" the operation so it's treated as a single, unbreakable step. JS doesn't have true atomicity like some languages (because it's single-threaded), but we fake it with techniques like queues or locks.

```js
let balance = 100; // Shared resource

async function deposit(amount) {
  const current = balance; // Read
  balance = current + amount; // Calculate
  // Simulate async save (e.g., to a server)
  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log(`New balance: ${balance}`);
}

deposit(50); // Tries to make balance 150
deposit(50); // Overlaps, might read old balance, resulting in 150 instead of 200!
```

```js
let balance = 100;
let isLocked = false; // Our simple lock

async function atomicDeposit(amount) {
  while (isLocked) {
    await new Promise((resolve) => setTimeout(resolve, 10)); // Wait if locked
  }
  isLocked = true; // Lock it
  try {
    const current = balance; // Read safely
    balance = current + amount; // Calculate
    await new Promise((resolve) => setTimeout(resolve, 100)); // Async save
    console.log(`New balance: ${balance}`);
  } finally {
    isLocked = false; // Always unlock
  }
}

atomicDeposit(50); // Now safe, balance becomes 150
atomicDeposit(50); // Waits, then makes it 200
```

## Idempotency

is a fancy word meaning "unchanging when repeated." An idempotent operation gives the same result no matter how many times you run it. It's perfect for async code because networks can fail, leading to retries—idempotency ensures retries don't cause duplicates or errors.

Why It Matters in Async Code: Promises might be called multiple times (e.g., user clicks a button twice quickly). Without idempotency, you could charge a credit card twice. With it, repeats are harmless.

```js
async function createUser(username) {
  // Imagine this sends to a server and creates a user each time
  await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ username }),
  });
  console.log(`User ${username} created`);
}

createUser("alice"); // Creates user
createUser("alice"); // Creates duplicate user—bad!
```

```js
const createdUsers = new Set(); // Cache to track

async function idempotentCreateUser(username) {
  if (createdUsers.has(username)) {
    console.log(`User ${username} already exists`); // Safe repeat
    return; // Do nothing
  }
  try {
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username }),
    });
    createdUsers.add(username);
    console.log(`User ${username} created`);
  } catch (error) {
    // On error, don't add to set—allow retry
  }
}

idempotentCreateUser("alice"); // Creates user
idempotentCreateUser("alice"); // Does nothing, no duplicate
```
