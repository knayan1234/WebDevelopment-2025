## Redux Toolkit

Redux toolkit is a way to globally store state, actions and reducer(function) to manage it globally as a store and help to reduce prop drilling way.

Major terminology

1. Action = the event associated with some payload
2. Reducer = function what to do
3. slice = it contains the initial state and reducer function
4. store = that store all data
5. state = data to be tracked

| Concept            | Use                        | Analogy                         |
| ------------------ | -------------------------- | ------------------------------- |
| `configureStore`   | Creates the store          | 🧠 Setup control room           |
| `createSlice`      | Creates reducers + actions | ✂️ One file = reducer + actions |
| `createAsyncThunk` | Async API actions          | ⏳ For API requests like fetch  |
| `Provider`         | React hook for access      | 🎒 Backpack of global state     |
| `useSelector`      | Read data from store       | 👓 View current state           |
| `useDispatch`      | Send an action to store    | 📮 Dispatch a change request    |

## Zustang

Alternative of redux.

Simplicity: Ultra-minimal API, no need to create reducers, actions, or providers.

Flexible: Works with both global and local state, in vanilla JS or TypeScript.

Performance: Only re-renders components that use changed state—no unnecessary renders.

No Providers: Unlike Redux or Context API, no need to wrap your app in a provider.

Middleware: Supports powerful add-ons for logging, persistence, devtools, etc.

Tiny Size: Extremely small bundle size (≈3KB minified).
