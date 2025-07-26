## Route guard

There is nothing like route guard inbuilt thing in react. Its more like logic developer needs to create to make the app protected for non login users.

Two ways to do - a) normal using wrapper routes b) using context

**React Router hooks like useNavigate, useLocation, etc., only work inside components wrapped by <BrowserRouter>.**

## React lazy and suspense

`React.lazy()` lets you dynamically import a component only when it's needed — great for code splitting and improving performance (initial load time).
Since lazy components take time to load, `<Suspense>` wraps them and provides a fallback UI (like a spinner or text) while waiting.
