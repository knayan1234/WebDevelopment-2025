> All answer is genrated by grok

# `useMemo` and `React.memo` in React:

## 1. `useMemo`

### What is it?

- **Definition**: `useMemo` saves a value so you don’t redo work every time the component redraws. It only recalculates if something specific changes.
- **Why use it?**: Makes your app faster by skipping repeated calculations.
- **Analogy**: Like writing 2 + 3 = 5 on a piece of paper. You reuse the answer unless the numbers change.

### Example

```jsx
import { useState, useMemo } from "react";

function NumberBox() {
  const [count, setCount] = useState(0);

  // Save the doubled count
  const doubled = useMemo(() => {
    console.log("Doubling...");
    return count * 2;
  }, [count]); // Redo only if count changes

  return (
    <div>
      <p>Doubled: {doubled}</p>
      <button onClick={() => setCount(count + 1)}>Add: {count}</button>
    </div>
  );
}
```

- **Explanation**: `doubled` is calculated only when `count` changes. Clicking the button updates `count`, and `useMemo` redoes the math only then. Without `useMemo`, it would calculate every redraw.

## 2. `React.memo`

### What is it?

- **Definition**: `React.memo` stops a component from redrawing if its props (inputs) stay the same.
- **Why use it?**: Makes your app faster by not redrawing unchanged parts.
- **Analogy**: Like not repainting a wall if it’s already the right color.

### Example

```jsx
import { memo, useState } from "react";

// Stop Child from redrawing if props don't change
const Child = memo(() => {
  console.log("Child drew");
  return <p>Hello!</p>;
});

function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Child />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}
```

- **Explanation**: `Child` only draws once because its props don’t change. Clicking the button changes `count`, but `Child` skips redrawing, saving time.

## Comparison Table

| **What**    | **useMemo**                         | **React.memo**                  |
| ----------- | ----------------------------------- | ------------------------------- |
| **Does**    | Saves a value to skip recalculating | Stops component from redrawing  |
| **Why**     | Avoid slow math                     | Skip redraws if props are same  |
| **Example** | `useMemo(() => count * 2, [count])` | `memo(() => <p>Hello</p>)`      |
| **Analogy** | Write math answer on paper          | Don’t repaint same-colored wall |

**Why It Matters**: `useMemo` saves time on calculations, and `React.memo` saves time on redraws, making apps faster.

## Interview Notes

- **Simple Answer**: "`useMemo` saves a value, like writing 2 \* 3 = 6 on paper to reuse it. `React.memo` skips redrawing a component if its inputs don’t change, like not repainting a wall that’s already good."

---

### CODES-

1.  **Render a large filtered list using useMemo**

```
import React, { useState, useMemo } from 'react';

function App() {
  // Simple large list (manually written for beginners)
  const largeList = [
    'Apple', 'Banana', 'Mango', 'Orange', 'Grapes',
    'Watermelon', 'Pineapple', 'Papaya', 'Strawberry',
    'Blueberry', 'Kiwi', 'Lemon', 'Lime', 'Cherry', 'Peach',
    'Guava', 'Fig', 'Plum', 'Pear', 'Apricot'
  ];

  // User input state
  const [search, setSearch] = useState('');

  // useMemo filters the list only when search changes
  const filteredList = useMemo(() => {
    return largeList.filter(item =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div>
      <h2>Filtered Fruit List</h2>
      <input
        type="text"
        placeholder="Search fruits..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

```

2.  **Wrap child components in React.memo and track when they re-render**

```
import React, { useState, memo } from 'react';

// Child component wrapped in React.memo
const Child = memo(({ name }) => {
  console.log('👶 Child rendered');
  return <p>Child says hello to {name}!</p>;
});

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Alice');

  return (
    <div>
      <h2>React.memo Example</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment Count ({count})
      </button>

      <button onClick={() => setName(name === 'Alice' ? 'Bob' : 'Alice')}>
        Change Name
      </button>

      <Child name={name} />
    </div>
  );
}

export default App;
```
