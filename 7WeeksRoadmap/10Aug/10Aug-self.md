> gpt

Vite
A fast frontend build tool and dev server.

Uses esbuild for lightning-fast hot reload and build.

Features HMR (Hot Module Replacement) to update modules instantly without full reload.

Turborepo
A high-performance monorepo build system from Vercel.

Optimizes builds with:

Content-based caching – skips tasks if inputs & outputs haven’t changed.

Task dependency tracking – rebuilds only what’s needed.

Parallel execution – runs independent tasks at the same time.

Monorepo
A single repository containing multiple projects/packages (e.g., /apps/web, /packages/ui).

Benefits: shared code, consistent tooling, simpler dependency management.

Build System
Tools + processes that compile, bundle, and optimize your code for deployment.

Example: Vite handles the build step in your frontend, Turborepo orchestrates builds across packages.

Pipelines
A sequence of tasks with dependencies.

In Turborepo, defined in turbo.json (e.g., dev, build, lint).

Each task can depend on outputs from others.

HMR (Hot Module Replacement)
Dev server feature that swaps modules in the browser without a full page reload.

Preserves app state for faster development.

Build Tool
A program that transforms and packages your source code for the browser.

Examples: Vite, Webpack, Parcel.

Handles bundling, minification, asset optimization.
