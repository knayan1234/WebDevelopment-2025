### useRef

> Some notes are there in 17 July [17 July](https://github.com/knayan1234/WebDevelopment-2025/tree/main/7WeeksRoadmap/17July/)

> Below is loveBabbar notes

## Two scenarios are there -

- Sometime we need one varible that can persist its values across re renders. Why "let" cannot be used ? Because it is not able to persist its value across re renders, it will start from start every time/ or can say it gets initialize every render.
- Its primary use is to access dom elememt easily from other dom element.
  - create ref
  - link ref using ref attribute ony element
  - use that ref anywhere to change the property

### useCalllback

> Below is gemini notes

- **Purpose:**  
  `useCallback` is a React hook that memoizes a function, returning the same instance between renders unless its dependencies change.

- **Syntax:**

  ```javascript
  const memoizedFn = useCallback(() => {
    // function body
  }, [dependencies]);
  ```

- **When to Use:**

  - To prevent unnecessary re-creation of functions.
  - Useful when passing callbacks to optimized child components (e.g., with `React.memo`), to avoid unwanted re-renders.
  - Also helps when function references are used in dependency arrays of other hooks (`useEffect`, etc.).

- **Relation to React.memo:**

  - `useCallback` ensures function props remain the same unless needed.
  - Most effective with `React.memo`-wrapped children.

- **Key Point:**  
  Only use `useCallback` when you see actual performance bottlenecks; otherwise, it may introduce unnecessary complexity.

**One-liner:**  
_`useCallback` memoizes a function in React, helping optimize components by preventing unnecessary re-renders caused by changing function references._
