## React Router

The way to communicate between componets via url without refreshing the UI. SPA.

## Types of routing

1. HashRouter- Uses URL hash (#) to track route
2. MemoryRouter- Stores history in memory; doesn't sync with URL
3. StaticRouter- Routes based on a static location, no UI sync
4. NativeRouter- Custom router for native applications
5. BrowserRouter-	Modern web apps	Uses HTML5 History API for clean URLs

## Browser routing

Instead of anchor tags, we use the Link component for internal navigation as a tag can refrsh the whole UI
Navlink as it gives one active class for styling.

## Important hooks

- useNavigate- Programmatically navigate (replace useHistory in v6)
- useParams- Access route parameters (like IDs in /product/:productId)
