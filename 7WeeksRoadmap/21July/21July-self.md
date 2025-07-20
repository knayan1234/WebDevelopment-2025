# 🧠 Understanding Environment Variables in Vite vs Webpack

## 👶 What Are Environment Variables?

Environment variables are like secret notes you give your app to use while it's running.  
They often contain:

- API keys
- Feature flags
- Environment-specific settings (`development`, `production`, etc.)

Instead of hardcoding values like this:

```js
const apiKey = "abc123"; // ❌ not secure
```

We use `.env` files to define them:

```env
API_KEY=abc123
```

Then in your JavaScript code, you use a placeholder to access them.

---

## 🔧 How Webpack Does It

Webpack uses `process.env` like in Node.js.

### Example with Webpack:

1. **`.env` file**

   ```env
   REACT_APP_NAME=Nayan
   ```

2. **In your React component:**

   ```js
   console.log(process.env.REACT_APP_NAME); // ✅ logs "Nayan"
   ```

3. ✅ It works because Webpack replaces `process.env.REACT_APP_NAME` with the actual value at **build time**.

> In Webpack-based setups (like Create React App), environment variables are accessed using `process.env` and must be prefixed with `REACT_APP_`.

---

## 🚀 How Vite Does It (Different!)

Vite is newer and faster than Webpack, but it handles things differently.

### 🟨 Important Differences:

| Feature                      | Webpack                      | Vite                    |
| ---------------------------- | ---------------------------- | ----------------------- |
| Access variable with...      | `process.env`                | `import.meta.env`       |
| Prefix required              | `REACT_APP_`                 | `VITE_`                 |
| Built-in `process` polyfill? | ✅ Yes (via Webpack plugins) | ❌ No (not in browser!) |
| Rebuild needed after change? | ✅ Yes                       | ✅ Yes                  |

---

## ✅ Correct Setup in Vite

### 1. Create `.env` file in root (next to vite.config.js):

```env
VITE_NAME=Nayan
```

### 2. Access it in code:

```js
console.log(import.meta.env.VITE_NAME); // ✅ "Nayan"
```

---

## 💡 Why `import.meta.env` Instead of `process.env`?

### Vite is built for the browser

- Browsers **don’t have `process`** (it’s a Node.js thing).
- Vite avoids "polyfilling" (faking) Node features to keep your bundle smaller and faster.
- So `process.env` is **not available**, and trying to use it gives you this error:

```bash
'process' is not defined. eslint(no-undef)
```

### That's why Vite uses its own syntax:

```js
import.meta.env;
```

This gives you access to all public env vars (those prefixed with `VITE_`).

---

## 🔐 Why the `VITE_` Prefix?

For **security reasons**, Vite only exposes variables that are clearly marked for frontend use.

Without this rule, you might accidentally expose secrets in the browser!

So this:

```env
SECRET_API_KEY=shhh
```

Would NOT be visible in the browser (good!).

But this:

```env
VITE_API_URL=https://api.example.com
```

IS visible (expected behavior for frontend config).

---

## 🧪 Debug Tip: See All Available Env Vars

```js
console.log(import.meta.env);
```

It shows everything Vite knows from your `.env` files.

---

## 🧼 Common Gotchas

| Mistake                         | Fix                            |
| ------------------------------- | ------------------------------ |
| Forgot `VITE_` prefix           | Add `VITE_` in `.env` key      |
| Used `process.env`              | Use `import.meta.env`          |
| Didn't restart Vite dev server  | Run `npm run dev` again        |
| `.env` not in root              | Move `.env` to root of project |
| Extra spaces or invisible chars | Use clean formatting, UTF-8    |

---

## 🧠 TL;DR Summary

| Feature              | Webpack                   | Vite                           |
| -------------------- | ------------------------- | ------------------------------ |
| Env Var Access       | `process.env.REACT_APP_*` | `import.meta.env.VITE_*`       |
| Needs Prefix         | `REACT_APP_`              | `VITE_`                        |
| Polyfills `process`? | ✅ Yes                    | ❌ No (must use `import.meta`) |
