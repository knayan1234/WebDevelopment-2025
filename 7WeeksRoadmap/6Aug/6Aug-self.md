### a11y

a11y stands for "accessibility" — it's a numeronym where 11 represents the number of letters between "a" and "y"
Accessibility means designing and building websites/apps so that people with disabilities (visual, auditory, cognitive, motor, etc.) can perceive, understand, navigate, and interact with them.

In React and JavaScript, this involves using semantic HTML, correct ARIA attributes, keyboard navigation support, screen reader compatibility, and color contrast considerations.

- Instead of div use proper semantic tags like nav, article etc
- Add aria attributes
- Add alt text to images
- use tabindex whereever needed
- form labels with inputs
- play with focus

Example

```
function AccessibleForm() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form>
      <label htmlFor="name">Name:</label>
      <input ref={inputRef} id="name" type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## modal example

```
import React, { useRef, useEffect, useState } from "react";

function AccessibleModal({ isOpen, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // Focus the modal when it opens
      modalRef.current.focus();

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          onClose(); // Close modal on Escape
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex="-1"
      style={{
        background: "white",
        padding: "20px",
        border: "2px solid black",
        width: "300px",
        margin: "100px auto"
      }}
    >
      <h2 id="modal-title">Simple Modal</h2>
      <p>This is an accessible modal example.</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      <AccessibleModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default App;
```

### ARIA

ARIA stands for Accessible Rich Internet Applications.
It helps screen readers understand UI elements that are not native HTML — like custom dropdowns, modals, sliders, etc.

**3 Main things ARIA can do**

| ARIA Type    | What It Does                         | Example                   |
| ------------ | ------------------------------------ | ------------------------- |
| **Role**     | Tells **what** the element is        | `role="button"`           |
| **Property** | Adds **info** to explain the element | `aria-label="Close menu"` |
| **State**    | Tells current **status**             | `aria-expanded="true"`    |

**Aria label**

You give the element a label directly.

`<button aria-label="Close the modal">❌</button>`

👂 Screen reader reads: “Close the modal”

✅ Use when:

- There’s no visible text.
- You want to add a label for screen readers only.

**Aria-labelledby**
Points to an element that already has the visible label.

```<h2 id="modal-title">Confirm Delete</h2>

<div role="dialog" aria-labelledby="modal-title">
  Are you sure you want to delete?
</div>
```

👂 Screen reader reads: “Confirm Delete” (from <h2>)

✅ Use when:

- You already have a visible label or heading.
- You want to reference that label instead of duplicating.

**Aria-describedby**
Points to extra info (like a paragraph or hint).

```
<p id="modal-desc">This action cannot be undone.</p>

<div role="dialog" aria-describedby="modal-desc">
  Confirm?
</div>
```

👂 Screen reader reads: “Confirm? This action cannot be undone.”

✅ Use when:

- You want to provide more detail or explanation.
- Like tooltips, help text, warnings, etc.

### Tabindex

**Tabindex**
| Value | Meaning | Example |
| --------- | ------------------------------ | ------------------- |
| `0` | Focusable in natural tab order | `div tabIndex="0"` |
| `-1` | Focusable only by code | `div tabIndex="-1"` |
| `1, 2...` | Custom tab order (❌ avoid) | `div tabIndex="2"` |

| 🔢 Value                    | 🔍 Meaning                                                               | ✅ Use Cases                                                                                         |
| --------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `tabIndex="0"`              | Element becomes **focusable** via Tab key, follows **natural DOM order** | - Custom elements (e.g., `<div>`, `<span>`) that act like buttons                                    |
| `tabIndex="-1"`             | Element is **programmatically focusable only**, skipped in tabbing       | - Focus modal/dialog content on open <br> - Skip items in tab order, can use later as in userref etc |
| `tabIndex="1"`<br>and above | Element enters **manual tab order** (higher = later)                     | ❌ Avoid! Breaks accessibility and expected flow unless very intentional                             |
