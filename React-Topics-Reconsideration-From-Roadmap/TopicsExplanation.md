### 1. Login form using both state and ref

```jsx
function App() {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    bday: "",
    tel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = () => {
    console.log(formDetails);
  };

  return (
    <form onSubmit={submitHandler}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formDetails.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formDetails.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          name="bday"
          value={formDetails.bday}
          onChange={handleChange}
        />
      </label>
      <label>
        Telephone:
        <input
          type="tel"
          name="tel"
          value={formDetails.tel}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

> **Why Square brackets `[Name]`?** => This is called dynamic property name from ES6.

```jsx
function App() {
  const nameRef = useRef();
  const emailRef = useRef();
  const bdayRef = useRef();
  const telRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      bday: bdayRef.current.value,
      tel: telRef.current.value,
    };
    console.log(formData);
  };

  return (
    <form onSubmit={submitHandler}>
      <label>
        Name:
        <input type="text" name="name" ref={nameRef} />
      </label>
      <label>
        Email:
        <input type="email" name="email" ref={emailRef} />
      </label>
      <label>
        Birthday:
        <input type="date" name="bday" ref={bdayRef} />
      </label>
      <label>
        Telephone:
        <input type="tel" name="tel" ref={telRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
```

---

### 2. Debouncing

Debouncing is a technique to optimize function execution, such as API calls, by ensuring that a function only runs after the user has stopped triggering an event—like typing in an input box, scrolling, or performing any rapid event—for a specified amount of time

```
<input
  class="amount-input"
  type="number"
  placeholder="Enter amount earned today"
/>
<div class="earnings"></div>
```

```
 <script>
      // ES6 Debounce Function
      const debounce = (fn, delay = 400) => {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => fn(...args), delay);
        };
      };

      // Earnings display logic
      const showEarnings = (event) => {
        const value = event.target.value;
        document.querySelector('.earnings').textContent =
          value ? `You could earn $${value * 30} this month!` : '';
      };

      // Setup
      const input = document.querySelector('.amount-input');
      input.addEventListener('input', debounce(showEarnings, 500));
    </script>
```

---

### 3,4,5. useCallback, useMemo and React.memo

**useCallback** is a React Hook used to memoize a function, preventing its recreation on every re-render unless its dependencies change. It is used to memoize functions so they’re not redefined on every render, useful when **passing functions to child components** or using them as dependencies

```jsx
const memoizedFn = useCallback(() => {
  // function logic
}, [dependencies]);
```

**React.Memo** memoises functional component, `React.memo` stops a component from redrawing if its props (inputs) stay the same.

`const MemoComponent = React.memo(MyComponent);`

> Important - Lets say we have one parent and onechild component, we are passing primitive datatypes(_The data which is built in and that is not an object(String,Number,BigInt,Boolean,Undefined,Null,Symbol)_) as props then React.Memo stop re rendering, but if the props are object including functions **as functions are objects** in js , we need to give useCallback while defining the function in parent component and wrap the child with React.memo.

**useMemo** saves a value so we don’t redo work every time the component redraws. It only recalculates if something specific changes.

```
const doubled = useMemo(() => {
    console.log("Doubling...");
    return count * 2;
  }, [count]);
```

**COMBINED EXAMPLE**

```jsx
const ExpensiveComponent = React.memo(({ onButtonClick, data }) => {
  return <button onClick={onButtonClick}>{data}</button>;
});

function computeData(count) {
  let total = 0;
  for (let i = 0; i < 100000000000; i++) {
    total += i;
  }
  return `Result: ${count + total}`;
}

export default function App() {
  const [count, setCount] = useState(0);

  const data = useMemo(() => computeData(count), [count]);

  const handleButtonClick = useCallback(() => setCount(c => c + 1), []);

  return (<ExpensiveComponent onButtonClick={handleButtonClick} data={data}) />;
}
```

---

### 6,7,8. RHF, Formik and Yup

**React Hook form** is a lightweight form library. It is a hook based library and minimizes re renders.

1. `Register` - Connects your input to the form context.
   `<input {...register("firstName", { required: true })} />`

2. `handleSubmit` - Handles form submission and runs validations.
   `<form onSubmit={handleSubmit(onSubmit)} />`

3. `formState.errors` - Tracks validation errors
   `{errors.email && <p>Email is required</p>}`

```jsx
import { useForm } from "react-hook-form";
export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="fname">First Name</label>
      <input
        type="text"
        id="fname"
        {...register("fnameRequired", { required: true })}
      />
      <label htmlFor="lname">Last Name</label>
      <input type="text" id="lname" {...register("lnameRequired")} />
      {errors.fnameRequired && <span>This field is required</span>}
    </form>
  );
}
```

**Formik**

> to do

**Yup**

> Todo

---

### 9.Lazy Loading/Routing, 10.React.lazy() and suspense

**Lazy loading** is a general means deferring the download and execution of JavaScript code (or other assets like images) until a user interacts with a specific part of the application or navigates to a certain section.Core idea: Instead of bundling everything into one file, split your app into smaller chunks. Load only the chunk required for the current view or interaction.

Lazy Loading (The General Technique): This is a broad strategy for delaying any non-essential part of your app, not just navigation. It can apply to components, images, data, or features anywhere in your UI. The goal is to load stuff only when it's about to be used, like on a button click or scroll.

**Lazy Routing** is a specific application of lazy loading focused on navigation in single-page applications (SPAs). It involves deferring the loading of route-specific code until a user navigates to that route. This is particularly useful in apps with many pages or features, as it minimizes the initial payload.

Lazy Routing (The Navigation-Specific Version): This is lazy loading applied specifically to routes in a single-page app (SPA). It focuses on deferring code for entire pages or sections until the user navigates to them via URLs or links. It's all about optimizing how your app handles different paths.

> Lazy Loading(parent) - Lazy Routing is one of the way to do Lazy Loading.

Parts of Lazy Routing :-

1. `React.lazy` is a function that lets you dynamically import a component, splitting your code into smaller bundles that load only when required. This is great for large apps where not all components need to load upfront. Without lazy loading, all code loads at once, which can slow things down. With lazy, you reduce the initial bundle size.

2. `Suspense` is a component that wraps parts of your UI and handles loading states for asynchronous operations, like lazy-loaded components or data fetching

`const Home = lazy(() => import("./components/Home"));`
`<Suspense fallback={<div>Loading...</div>}>`

> **Dynamic imports and lazy loading are not same. Dynamic imports are the easiest, most effective way to achieve lazy loading in JS and React contexts.** Lazy loading is a technique for deferring resource loads until needed, while dynamic imports are a specific JavaScript feature (the import() syntax) for loading modules asynchronously.

**Lazy loading** without dynamic import is possible as dyanamic import is the example/usecase of lazy loading in react and javascript.
one example : `<img src="cat.jpg" alt="A cat" loading="lazy" width="300" height="200">`

---

### 11. Different types of Routing

[GeeksForGeeeks-Routing] (https://www.geeksforgeeks.org/reactjs/reactjs-types-of-routers)

[MDNwebHistoryAPI] (https://developer.mozilla.org/en-US/docs/Web/API/History_API)

---

### 12. Diffing algorithm

[GeeksForGeeksDiffingAlgorithm] (https://www.geeksforgeeks.org/reactjs/what-is-diffing-algorithm/)

---

### 13. Ways to create react app

#### Traditional Methods

1. **Manual Setup with Webpack/Babel**
   - Involves manually configuring Webpack (bundling) and Babel (transpiling JSX/ES6+).
   - Requires setting up project structure, dependencies, and HTML file.
   - Pros: Full control over build process.
   - Cons: Time-consuming, error-prone, not beginner-friendly.
2. **Create React App (CRA)**
   - Introduced by Facebook in 2016 for quick scaffolding.
   - Command: `npx create-react-app my-app`.
   - Pros: Pre-configured, abstracts build tools, ideal for beginners/simple projects.
   - Cons: Limited flexibility, performance issues for larger apps.

#### Modern Methods

1. **Vite**
   - Fast build tool using ES modules for quick dev server startup and HMR.
   - Command: `npm create vite@latest` (select React).
   - Pros: Lightweight, customizable, faster than CRA.
2. **Next.js**
   - Full React framework with SSR, SSG, and built-in routing.
   - Command: `npx create-next-app@latest`.
   - Pros: SEO-friendly, scalable, ideal for production apps (e.g., e-commerce).
3. **Remix**
   - Framework focused on web fundamentals and server-rendered apps.
   - Command: `npx create-remix@latest`.
   - Pros: Great for data-driven apps, enhances user experience.
4. **Other Tools/Frameworks**
   - Gatsby: Static-first React apps (content-heavy sites).
   - Astro: Supports React components, hybrid architectures.

#### Why Multiple Ways Exist

- **Project Needs**: Vary from simple sites (Vite/CRA) to complex apps (Next.js).
- **Performance/Scalability**: Modern tools (Vite) and frameworks (Next.js, Remix) handle larger apps better.
- **Developer Experience**: Options for beginners (zero-config) and experts (custom builds).
- **Innovation**: Community-driven tools evolve with new tech (e.g., ES modules, SSR).

#### Why CRA Was Deprecated/Archived (2023)

- **Outdated Tech**: Relies on older Webpack versions, slower than Vite/esbuild.
- **Limited Flexibility**: Hard to customize without complex "ejecting."
- **Modern Alternatives**: React team recommends Vite, Next.js for better performance.
- **Framework Focus**: React is a library; frameworks handle full app needs (routing, data).

#### Why Frameworks/Build Tools Are Needed

- **Build Complexity**: Tools like Vite/Webpack handle JSX transpiling, bundling, optimization.
- **Performance**: Frameworks offer code splitting, lazy loading, SEO features.
- **Routing/Data**: React lacks native solutions; frameworks (Next.js, Remix) provide these.
- **Scalability**: Ensure production-readiness with minification, tree shaking, SSR.
- **Community Support**: Access to plugins, docs, and troubleshooting resources.

---

### 14. SSR, CSR, SSG, treeshaking, CDN

#### SSR (Server-Side Rendering)

**What it is**: SSR is a technique where the server generates the full HTML for a web page before sending it to the client's browser. In React, this means the server runs your React code, renders components into HTML, and delivers a ready-to-display page. `Tools like Next.js use SSR` for dynamic content that changes per request (e.g., user-specific data). It's great for SEO and initial load speed since the browser gets usable content right away, but it can increase server load.

**Why it's needed**: It ensures fast first-paint (the page appears quickly) and better search engine crawling, as the HTML is pre-built.

**Real-world analogy**: Think of ordering a pizza delivery. With SSR, the pizza is fully baked and topped at the restaurant (server) before it's delivered to your door (browser)—you can eat it immediately without waiting. If it were just dough and ingredients, you'd have to bake it yourself, which takes extra time.

> extra (below)

**SSR (Server-Side Rendering)**

Server: A powerful computer that runs your app's code and sends ready-made pages to browsers.

Server-Side Rendering (SSR): The server does the rendering work. It builds the full HTML with data before sending it to your browser.

How it works simply:

1. You visit a site.
2. Server fetches data (e.g., from a database) and renders the React components into complete HTML.
3. Server sends this ready HTML to your browser.
4. Browser displays it instantly, then adds interactivity with JavaScript.

Pros: Faster initial load, better SEO (search engines get full content), good for pages with dynamic (changing) data.

Cons: Server has to work harder for every request, which can be slower if there are many users. Pages might not update without a refresh.

In React: This is common in Next.js using a function called getServerSideProps.

#### CSR (Client-Side Rendering)

**What it is**: CSR renders the web page entirely in the user's browser using JavaScript. In a React app `(like one built with Create React App or Vite)`, the server sends a minimal HTML file and JavaScript bundle, and the browser executes the JS to build and display the UI. This is common for single-page applications (SPAs) where interactions happen dynamically without full page reloads.

**Why it's needed**: It's efficient for highly interactive apps, as updates (like navigating pages) happen quickly without server round-trips, but it can lead to slower initial loads if the JS bundle is large.

**Real-world analogy**: Continuing the pizza example, CSR is like getting a delivery of raw dough, sauce, cheese, and toppings. You (the browser) have to assemble and bake it at home. It's customizable on the spot (e.g., add extra cheese mid-bake), but you wait longer before your first bite compared to a pre-baked pizza.

> extra (below)

**CSR (Client-Side Rendering)**

- Client: This is your web browser (like Chrome or Firefox) on your device.
- Client-Side Rendering (CSR): The server sends a basic, empty HTML file with JavaScript. Your browser then runs the JavaScript to fetch data and build the full page.

How it works simply:

1. You visit a site.
2. Server sends minimal stuff (like a skeleton page).
3. Browser downloads React code and data (e.g., from an API, which is a way to get info from a server).
4. Browser "renders" the page by filling in the content.

Pros: Great for interactive apps (like a dashboard where you click around). Once loaded, it's fast for navigation.

Cons: Initial load can be slow (blank screen while waiting). Bad for SEO because search engines see empty HTML at first.

In React: Pure React apps (without Next.js) often use CSR by default.

#### SSG (Static Site Generation)

**What it is**: SSG pre-builds entire web pages as static HTML files at build time (before deployment), rather than on each request. In React frameworks like Next.js or Gatsby, pages are generated once during the build process and served as-is. It's ideal for content that doesn't change often, like blogs or marketing sites, and can be combined with rehydration for interactivity.

**Why it's needed**: It offers lightning-fast performance and low server costs since files are static and can be hosted anywhere (e.g., on a CDN). Updates require rebuilding the site.

**Real-world analogy**: Imagine a bakery (build process) pre-baking a batch of identical cookies and packaging them for grab-and-go sales. Customers (browsers) get a ready cookie instantly without waiting for custom baking per order. If you want a fresh batch with changes, the bakery has to bake again.

#### Tree Shaking

**What it is**: Tree shaking is an optimization technique used by build tools (like Webpack or Rollup in React projects) to eliminate unused code from your final JavaScript bundle. It "shakes" the dependency tree to remove dead branches (unused exports or modules), reducing file size and improving load times.

**Why it's needed**: Modern apps pull in libraries with lots of code, but you might only use a small part. Tree shaking trims the fat, making apps faster to download and run, especially on mobile devices.

**Real-world analogy**: Picture packing a suitcase for a trip. You start with a huge wardrobe (all your code and libraries), but tree shaking is like shaking the suitcase to remove clothes you won't wear—only the essentials stay, making your luggage lighter and easier to carry without unnecessary bulk.

#### CDN (Content Delivery Network)

**What it is**: A CDN is a distributed network of servers that caches and delivers web content (like images, CSS, JS files, or videos) from locations closest to the user. In React apps, you might use a CDN to host static assets or even the entire app (e.g., via services like Vercel or Cloudflare), reducing latency by serving files from edge servers worldwide.

**Why it's needed**: It speeds up content delivery, handles high traffic, and improves reliability by offloading work from your main server. It's essential for global apps to minimize load times.

**Real-world analogy**: Think of a chain of coffee shops (CDN servers) spread across cities. Instead of everyone driving to one central roastery (origin server) for coffee, you get it from the nearest shop, which has pre-stocked beans. This way, your coffee arrives hot and fast, no matter where you are, without overwhelming the main roastery.
