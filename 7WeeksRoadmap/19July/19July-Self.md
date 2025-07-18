# React Rendering and Reconciliation – Detailed Notes

## What is Rendering in React?

**Rendering** is the process in which React takes your component logic (JSX, state, props) and turns it into actual DOM elements.

### Types of Rendering

1. **Initial Rendering (Mounting)**  
   When the component is rendered for the first time and added to the DOM.

2. **Re-rendering (Updating)**  
   Triggered when there are changes in:
   - State
   - Props
   - Context
   - Or a parent re-renders

---

## What is Reconciliation?

**Reconciliation** is the process React uses to update the DOM by comparing the new virtual DOM with the previous one and determining the minimal set of changes required.

In simple terms:  
React updates only what has changed, not the entire DOM tree.

---

## How Reconciliation Works

1. React generates a new **Virtual DOM** after a change (state, props, etc.).
2. It compares this new Virtual DOM with the previous one using a **diffing algorithm**.
3. Based on this comparison, it determines what real DOM updates are necessary.
4. React then performs those minimal DOM updates.

---

## Diffing Algorithm(gpt)

React’s diffing algorithm is based on two key assumptions:

1. **Elements of different types** produce different trees.
   - For example, `<div>` vs `<span>` will cause a full subtree re-render.
2. **Keys help in list diffing**:
   - Keys help React identify which list items have changed, are added, or are removed.

Example:

```
items.map(item => <li key={item.id}>{item.name}</li>)
```

### Why Not Use `index` as Key in React?

Using `index` as a key can cause issues when items are reordered, added, or removed.  
It may lead to incorrect DOM reuse, breaking local state (like inputs) and causing bugs.  
React relies on stable keys to track changes efficiently.  
Prefer a unique `id` from your data instead of the array index.  
Use `index` only if the list is static and purely visual.
