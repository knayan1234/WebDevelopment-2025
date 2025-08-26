**1. CSR (Client-Side Rendering)**

**How it works**:

- Browser loads a **bare HTML file** (mostly empty except a `<div id="root">`).
- JavaScript bundles (React, Angular, Vue, etc.) are fetched.
- JS **builds the UI in the browser**.

**Pros**:

- Very fast navigation after first load (SPA feel).
- Rich interactivity.
- Easier to deploy (just static hosting).

**Cons**:

- **Slow first load** (blank screen until JS loads).
- **Bad for SEO** if crawlers can’t run JS.
- More reliance on user device performance.

👉 Example: A React app created with `create-react-app` (pure CSR).

**2. SSR (Server-Side Rendering)**

- **How it works**:
  - On each request, the server generates the **fully rendered HTML** for the page.
  - Browser receives ready-made HTML → shows UI immediately.
  - JS bundle hydrates (attaches interactivity).
- **Pros**:
  - **Better SEO** (HTML is ready for crawlers).
  **Faster first contentful paint (FCP)**.
  - Dynamic data rendered instantly.
- **Cons**:
  - **Higher server load** (HTML generated per request).
  - Slower navigation between pages (unless optimized with caching).
  - More complex infrastructure.

👉 Example: Next.js with `getServerSideProps`.

**3. ISR (Incremental Static Regeneration)** _(Next.js-specific)_

- **How it works**:
  - Pages are **statically pre-rendered at build time**, like SSG (Static Site Generation).
  - But, unlike pure SSG, you can set a **revalidation interval**.
  - When the page is requested after the interval → Next.js regenerates it **in the background**.

**Pros**:

- **Best of static + dynamic**:
  - Fast (served from CDN like static).
  - Fresh (auto-regenerates with new data).
- Scales well (not all pages need to be built upfront).
- **Cons**:
  - Not 100% real-time (depends on revalidate time).
  - Slight complexity in caching strategy.

⚡ 2. `getStaticProps` → **Static Site Generation (SSG)**

Runs **at build time** (when you `next build`).

Next.js calls your API, fetches data, generates **ready-made HTML** for each page.

User gets **pre-rendered HTML instantly** → fast + SEO friendly.

React hydrates on client to add interactivity.

👉 **Why use it?**

For content that **rarely changes** (e.g. blog, docs, portfolio).

Super fast because it’s **just static HTML on CDN**.

📌 Limitation: If data changes, you need to **rebuild & redeploy** (unless you use ISR).

⚡ 3. `getServerSideProps` → **Server-Side Rendering (SSR)**

Runs **on every request**.

Next.js calls your API at **request time**, builds HTML, sends it back.

User sees **fresh data always**.

Still SEO friendly, but **slower than static** because server must fetch + render each time.

👉 **Why use it?**

For data that changes **every request** or must be always real-time.

Example: Logged-in dashboard, stock prices, news feed.

📌 Limitation: More server cost, slower TTFB (time to first byte).

4. ISR → **Incremental Static Regeneration**

Hybrid between SSG & SSR.

Page is static (fast), but Next.js can **rebuild it in the background** every X seconds.

Perfect for **content that changes sometimes** (blog, e-commerce product details).

### GetStaticProps

```jsx
// pages/blog/[id].js
export async function getStaticPaths() {
  const res = await fetch("https://example.com/api/posts");
  const posts = await res.json();

  return {
    paths: posts.map((post) => ({ params: { id: post.id.toString() } })),
    fallback: false, // only build these paths
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://example.com/api/posts/${params.id}`);
  const post = await res.json();

  return {
    props: { post },
  };
}

export default function Blog({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

here what happens is

**1. Build phase (when you run `next build`)**

This is when **Next.js pre-generates HTML files**.

**Next.js sees `[id].js`**

→ Since it’s a dynamic route (`[id]`), Next.js needs to know:

**Which `id`s should I generate pages for?**

**It calls `getStaticPaths()`**

- This fetches all available blog posts (`/api/posts`).
- Builds an array of `paths`, like:

paths: [
{ params: { id: "1" } },{ params: { id: "2" } },{ params: { id: "3" }}
]

This tells Next.js: **Please pre-render `/blog/1`, `/blog/2`, `/blog/3`…**

`fallback: false` → if someone tries `/blog/99` (not in list) → show 404.

For each path, Next.js calls `getStaticProps()`

For each `id` from `getStaticPaths`, Next.js calls this.

Example:

- For `/blog/1` → `params = { id: "1" }`
- For `/blog/2` → `params = { id: "2" }`

It fetches that single blog post and passes it as `props` to the React component.

then render the component based on fetched data

**4. At runtime (when user visits `/blog/1`)**

Browser immediately receives the **ready-made HTML**.

Super fast! ⚡

React then hydrates → attaches JS → makes it interactive.

### GetServerSideProps

always upto date

```jsx
// pages/blog/[id].js
export async function getServerSideProps({ params }) {
  const res = await fetch(`https://example.com/api/posts/${params.id}`);
  const post = await res.json();

  return {
    props: { post },
  };
}

export default function Blog({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

**1. User requests `/blog/1`**

A user types the URL or clicks a link to `/blog/1`.

---

**2. Next.js server intercepts the request**

- Next.js sees that the page (`/blog/[id].js`) exports `getServerSideProps`.
- This means: **don’t use a prebuilt HTML file — generate it fresh now**.
- For `/blog/1`, `params = { id: "1" }`.
- Next.js calls your API → `https://example.com/api/posts/1`.
- It waits for the data, converts it to JSON, and returns it as `props`.

### Blog with ISR (Incremental Static Regeneration)

Hybrid: Static at build time, but regenerates after a set interval.

```jsx
// pages/blog/[id].js
export async function getStaticPaths() {
  const res = await fetch("https://example.com/api/posts");
  const posts = await res.json();

  return {
    paths: posts.map((post) => ({ params: { id: post.id.toString() } })),
    fallback: "blocking", // generate on first request if not prebuilt
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://example.com/api/posts/${params.id}`);
  const post = await res.json();

  return {
    props: { post },
    revalidate: 60, // regenerate every 60 seconds
  };
}

export default function Blog({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

When to choose **SSR (getServerSideProps)** over CSR

⇒ **SEO is important**

**SSR** → HTML is pre-rendered on the server → search engines can crawl it.

**CSR** → HTML is mostly empty at first, crawlers may miss content.

⇒ **Content must be fresh (real-time or per request)**

**SSR** runs on every request → always returns the latest data.

**CSR** also fetches fresh data, but **user first sees a blank/loading screen** before content appears.

⇒ **Personalized content needed**

**SSR** can tailor the response based on cookies, auth headers, geo, etc.

**CSR** can also personalize, but SEO suffers since crawlers won’t see personalized content.

⇒ **Faster First Paint (TTFB) matters**

**SSR** sends complete HTML → user sees content immediately.

**CSR** requires JS to load + fetch data → slower perceived load.

why vercel?

- **ISR (`revalidate`) only works in production**, not in `next dev`.
- To test locally: run `next build && next start`.
- On **Vercel**, ISR works automatically — their CDN + server handle cache + background regeneration.
- That’s why Vercel is the best place to test `revalidate` logic.
