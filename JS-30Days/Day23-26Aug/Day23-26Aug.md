> Async Patterns: Debouncing, Throttling, and Queues, Debounce and throttle patterns for handling async flows and performance, Difference between debounce and throttle, Queueing promises for concurrency control, Edge-case: leading/trailing calls and cancellation, 1. Describe the difference between throttling and debouncing with examples. 2. How would you implement a concurrency-limited promise queue?

## Debouncing

[myGithubNotes](https://github.com/knayan1234/WebDevelopment-2025/blob/main/7WeeksRoadmap/20July/20July-self.md#debouncing-in-general-javascript-and-react)

[VIDEO](https://youtu.be/cjIswDCKgu0?si=zvvjy5VOGOD3CsUw)

Debouncing is a technique to delay running a function until a certain time has passed since the last time it was called. It's perfect for situations where events fire too quickly, like when a user is typing in a search box. You don't want to search the database every keystroke—that would be slow and wasteful. Instead, wait until they stop typing for a bit, then search once.

Step-by-Step Explanation of Debouncing

The Problem: Events like input (typing) or resize (window resizing) can trigger hundreds of times per second, overwhelming your app.

How Debouncing Works: You wrap your function in a "debouncer." Every time the event happens, it resets a timer. Only when the timer finishes (without being reset) does the function run.

Basic Code Example: Here's a simple debounce function. It takes your original function and a delay (in milliseconds).

```javascript
function debounce(func, delay) {
  let timeoutId; // This holds the timer ID
  return function (...args) {
    // This is the wrapped function
    clearTimeout(timeoutId); // Cancel any existing timer
    timeoutId = setTimeout(() => {
      func(...args); // Run the original function after delay
    }, delay);
  };
}

// Example usage: Log something after user stops typing for 500ms
const logSearch = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 500);

// Simulate typing: Call it multiple times quickly
logSearch("h"); // Resets timer
logSearch("he"); // Resets again
logSearch("hel"); // Resets again
// After 500ms of no calls, it logs "Searching for: hel"
```

## Throttling

limits how often a function can run, ensuring it's called at most once every specified time interval. It's great for continuous events like scrolling or mouse movements, where you want updates regularly but not too frequently to avoid performance issues.

In simple terms, after every 1 second (or the given seconds) the function should run. Example, if user scrolling the page, rather than calling thousand time, after every 1second the call will happen when user scrolling

The Problem: Events fire constantly (e.g., scroll event during smooth scrolling), causing your function to run too often and slow down the app.

How Throttling Works: It runs the function immediately (or at the start of the interval), then ignores all calls until the interval passes. After that, it can run again on the next call.

Basic Code Example: Here's a simple throttle function.

```javascript
function throttle(func, limit) {
  let isThrottled = false; // Flag to check if we're in cooldown
  return function (...args) {
    if (!isThrottled) {
      func(...args); // Run the function
      isThrottled = true; // Start cooldown
      setTimeout(() => {
        isThrottled = false; // End cooldown after limit
      }, limit);
    }
  };
}

// Example usage: Log scroll position at most every 1000ms
const logScroll = throttle(() => {
  console.log(`Scrolled to: ${window.scrollY}px`);
}, 1000);

// Attach to scroll event
window.addEventListener("scroll", logScroll);
// During fast scrolling, it logs only once per second
```

## Debouncing vs Throttling

| Aspect           | Debouncing                            | Throttling                         |
| ---------------- | ------------------------------------- | ---------------------------------- |
| Core Idea        | Wait until events stop, then run once | Run at most once per time interval |
| Execution        | After last event + delay              | Immediately, then every delay      |
| Example Scenario | Search input: Wait for typing pause   | Scroll: Update UI every 500ms      |
| Pros             | Reduces calls to minimum              | Provides consistent updates        |
| Cons             | Might delay action too long           | Could skip some rapid events       |

Examples
Debounce Example: In a search bar, debounce a fetch request by 300ms. If user types "hello" quickly, it fetches only once for "hello" after they pause.

Throttle Example: On window resize, throttle a layout recalculation by 200ms. Even if resizing drags on, it recalculates every 200ms, not constantly.

## Queueing promises

[Perplexity-chat-pdf](<Queueing Promises.pdf>)
