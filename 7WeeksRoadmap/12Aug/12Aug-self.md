> gpt

## RESTfulAPI

**REST(Representational State Transfer)**
It’s not a library, not a framework — it’s an architectural style for designing APIs.

**A RESTful API** = an API that follows REST principles and exposes data/resources via HTTP methods in a predictable format.

HTTP Methods

| Method     | Action    | Example URL | Meaning                       |
| ---------- | --------- | ----------- | ----------------------------- |
| **GET**    | Read data | `/users`    | Get all users                 |
| **GET**    | Read one  | `/users/5`  | Get user with ID 5            |
| **POST**   | Create    | `/users`    | Add a new user                |
| **PUT**    | Replace   | `/users/5`  | Replace user with ID 5        |
| **PATCH**  | Update    | `/users/5`  | Update part of user with ID 5 |
| **DELETE** | Remove    | `/users/5`  | Delete user with ID 5         |

[GeeksforGeeks-RestAPI](https://www.geeksforgeeks.org/node-js/rest-api-introduction/)

### How to cancel fetch request

using ABORTCONTROLLER

- AbortController is a built-in browser API.
- When you create it, you get:
  - controller.abort() → method to stop the operation.
  - controller.signal → a “listening device” that fetch uses to know if it should be cancelled.

JSX=

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch("https://jsonplaceholder.typicode.com/posts", {
    signal: controller.signal,
  })
    .then((res) => res.json())
    .then((data) => setPosts(data))
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        setError(err);
      }
    });

  return () => controller.abort(); // Cleanup
}, []);
```

JS=

```jsx
// Create an AbortController
const controller = new AbortController();

// Start fetch
fetch("https://jsonplaceholder.typicode.com/posts", {
  signal: controller.signal,
})
  .then((res) => res.json())
  .then((data) => console.log("Data:", data))
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      console.error("Fetch error:", err);
    }
  });

// Abort if page is closing or refreshing
window.addEventListener("beforeunload", () => {
  controller.abort();
});

// Abort if user switches tabs
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    controller.abort();
    console.log("Aborted because tab changed");
  }
});
```

### AXIOS

It is an alternative for fetch. Need to install, not predefined in browser.

Difference:

| Feature                                | Fetch                              | Axios                                       |
| -------------------------------------- | ---------------------------------- | ------------------------------------------- |
| Supports old browsers (IE11)           | ❌                                 | ✅                                          |
| Automatic JSON parsing                 | ❌ (`res.json()`)                  | ✅ (no `.json()` needed)                    |
| Request timeout support                | ❌ (manual with `AbortController`) | ✅ Built-in                                 |
| Interceptors (pre/post-process)        | ❌                                 | ✅                                          |
| Automatic request cancellation         | ✅ (with `AbortController`)        | ✅ (with `CancelToken` / `AbortController`) |
| Upload / Download progress events      | Limited                            | ✅                                          |
| Default headers (e.g., `Content-Type`) | ❌                                 | ✅                                          |
| Works in Node.js easily                | ❌                                 | ✅                                          |
