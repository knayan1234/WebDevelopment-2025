## What is node js and express js

Nodejs is a backend and helps to run javascript code outside browser.Node.js runs JavaScript on servers to handle backend tasks. It's not for building UIs (that's frontend like React)—it's for server logic, data, and APIs.

Ways to use node js:

1. Basic way -> Write in any notepad and run in using `node abc.js`

2. create web server using nodejs->

```js
const http = require("http");
// "const" creates a variable (a named box for data).
// "http" is a built-in Node.js tool for web connections.
// "require" means "import this tool so I can use it."

const server = http.createServer((req, res) => {
  // This makes the server.
  // "req" = request (what the visitor asks, like "show me a page").
  // "res" = response (what you send back, like a message).
  // The arrow (=>) means "when a request comes, do this."
  res.end("Hello from my Node.js server!"); // Send this message and "end" the response.
});

server.listen(3000); // "listen" starts the server on port 3000 (it waits for visitors).
// You can change 3000 to another number if needed.
```

Express js is a tool that works on top of node js , its not separate.Express.js is a free add-on (library) for Node.js. It makes building web servers and APIs easier and faster.

| Aspect          | Node.js (Detailed)                                                                              | Express.js (Detailed)                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **What It Is**  | Core tool/runtime for running JS on servers. (The foundation—handles basics like events/files.) | Framework/library on top of Node.js for web apps. (Adds structure; can't run without Node.js.) |
| **Purpose**     | General JS execution (e.g., scripts, servers). Flexible but low-level.                          | Simplifies web servers/APIs (routes, middleware). Higher-level—focus on ease.                  |
| **Code Amount** | More lines for web stuff (manual handling).                                                     | Fewer lines—shortcuts for common tasks.                                                        |
| **Best For**    | Basic tasks or when you need full control. (E.g., custom servers.)                              | Quick web development/APIs for React backends. (E.g., REST APIs.)                              |
| **Example**     | Our Step 2 server (uses built-in http).                                                         | Our Step 4 server (uses Express shortcuts).                                                    |

```js
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS.

// Sample data: A JSON list of products (like from a database).
const products = [
  { id: 1, name: "Laptop", price: 999 }, // Object 1.
  { id: 2, name: "Phone", price: 499 }, // Object 2.
  { id: 3, name: "Headphones", price: 199 }, // Object 3.
];

// The route: When someone visits /api/products with GET.
app.get("/api/products", (req, res) => {
  res.json(products); // Send the list as JSON. (Express auto-sets the content type.)
  // Details: res.json() converts the array to JSON format automatically.
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```
