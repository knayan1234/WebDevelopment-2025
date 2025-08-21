### Rendering

Rendering is the process of turning your code in actual html,css and JS that a browser can display and interact with.
In web apps, the rendering can happen in any of the side , Client and Server side
It matters because it helps in SEO and also in speed of rendering

### SSR vs CSR vs SSG

> Check notes of <u>hard topics</u>

### ISR

Incremental Static Regeneration (ISR): This is an advanced mix of SSG and SSR. It's specific to Next.js. Pages are pre-built statically, but they can "regenerate" (update) incrementally on the server when needed, without rebuilding the whole site.

How it works simply:

1. At build time, pages are generated as static HTML with data.
2. You set a revalidation time (e.g., every 60 seconds), which means the server checks for fresh data and regenerates the page in the background if it's outdated.
3. Users get the fast static version first, but it stays fresh without full rebuilds.

Pros: Super fast (static speeds), good SEO, and handles updates better than pure static. "Incremental" means only changed pages regenerate, not the whole site.

Cons: Not ideal for super real-time data (like live chat). Needs a hosting platform that supports it, like Vercel.

_ISR builds on SSG, so it's like SSG with auto-updates._

**_CSR is browser-only (simple but slow start). SSR adds server power for better speed/SEO. ISR optimizes SSG by adding smart updates, blending static speed with freshness._**

---

> _Build blog using getStaticProps , getServerSideProps , and ISR, Use Vercel to test revalidation behavior -PENDING as it will use nextjs_

---
