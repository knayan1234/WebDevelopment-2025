> Immutability, Copy Patterns, and Functional Practices,Value vs. reference, copying arrays/objects, functional JS basics,Shallow copy pitfalls, Object.assign vs. spread vs. structuredClone, Immutability enforcement patterns, Risks around deeply nested objects, . How would you perform a deep clone in JS, and when is it needed?, When does modifying one object unintentionally affect another?, Code: Demonstrate structured cloning, explain what fails with noncloneable objects.

## Value vs. Reference: How JS Stores Data

In JS, data is stored in two ways: by value or by reference.

1. Pass by Value: For primitives `(numbers, strings, booleans, null, undefined, symbols, BigInt)`, JS copies the actual value. Changing one doesn't affect others.

```javascript
let num1 = 5; // num1 holds the value 5
let num2 = num1; // num2 gets a copy of 5
num2 = 10; // Change num2 to 10
console.log(num1); // Still 5, unchanged
```

_Why? Primitives are simple and stored directly in memory. No sharing happens._

2. Pass by Reference: For `objects, arrays, and functions`, JS stores a "reference" (**like** a pointer to the memory location). Assigning to another variable shares the same reference. Changing one affects all.

```javascript
let obj1 = { name: "Alice" }; // obj1 points to a memory spot
let obj2 = obj1; // obj2 points to the SAME spot
obj2.name = "Bob"; // Change via obj2
console.log(obj1.name); // Now 'Bob', affected!
```

_Why? References save memory for complex data but can lead to unexpected changes._

## Deep copy , Shallow copy

[checkDay13Notes](https://github.com/knayan1234/WebDevelopment-2025/blob/main/JS-30Days/Day13-22Aug/Day13-22Aug.md#shallow-vs-deep-copy-issues)

## Comparison: Object.assign vs. Spread vs. structuredClone

These are JS tools for copying or merging objects/arrays. They help avoid changing the original data (immutability). All are shallow except structuredClone, which is deep.

1. Object.assign(target, ...sources)

This function copies properties from source objects to a target. It changes the target and returns it. Use an empty `{}` as target to make a new copy. It's from ES6, works in most browsers, and can trigger special setters. It's shallow (nested items are shared links, not real copies), and a bit slower for basics.

**Example**:

```js
let target = {};
Object.assign(target, { a: 1 }, { b: 2 });
// target is now { a: 1, b: 2 }. Changing a nested part affects the original.
```

**When to Use**: Merging many objects into one, or for old browsers without spread support.  
**Limitations**: Changes the target if not new; skips hidden properties and prototypes.

2.  Spread Operator ({...obj} or [...arr])

This ES6 syntax spreads properties/elements into a new object/array. It's quick, makes a fresh copy without changing originals, and doesn't trigger setters. Still shallow (nested items are shared).

**Example**:

```js
let copy = { ...original, newKey: "value" }; // New object with original plus new key.
let copyArr = [...original, 4]; // New array with original plus 4.
```

**When to Use**: Fast creation of new objects/arrays with extras. More readable than Object.assign for simple tasks.  
**Limitations**: Less flexible for merging into existing objects; skips prototypes and hidden properties.

3.  structuredClone(obj)

A newer (ES2022) function for deep copying. It makes a full, separate copy of everything, including nested items, Maps, Sets, Dates, and loops. No changes to originals.

**Example**:

```js
let clone = structuredClone({ nested: { key: 1 } });
clone.nested.key = 2; // Original stays the same, even nested.
```

**When to Use**: Need a complete, independent copy for nested data, like in apps managing state or data transfer.  
**Limitations**: Not in old browsers; can't copy functions, DOM elements, or prototypes (errors out); slower for big data.

## Demonstrate Structured Cloning and What Fails with Non-Cloneable Objects

```javascript
const original = {
  name: "Test",
  nested: { value: 1 },
  date: new Date(),
};
const clone = structuredClone(original); // Deep copy
clone.nested.value = 2; // Only changes clone
console.log(original.nested.value); // Still 1
```

> structuredClone throws errors on things like functions, DOM elements, or prototypes. Reason: These aren't "structured" data; use custom cloning for them.

```javascript
const objWithFunc = { func: () => {} };
try {
  structuredClone(objWithFunc); // Throws DOMException
} catch (e) {
  console.log("Fails because functions are not cloneable");
}
```

## Immutabiliy

Immutability means once data is created, it can't be changed. In JS, primitives are naturally immutable (you can't change a number; you make a new one). But objects and arrays are mutable by default, which can cause bugs in functional programming.

[Object.freeze and Object.seal](https://github.com/knayan1234/WebDevelopment-2025/blob/main/JS-30Days/Day7-12Aug/Day7-12Aug..md#objects-in-detail)

**A Deatiled table**

| Category    | Aspect                | Mutable Approach                                                                  | Immutable Alternative                                                                        | Description                                                                                            | Example Code                                                                                              | Notes and Risks                                                                                                         |
| :---------- | :-------------------- | :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **Arrays**  | **Default Behavior**  | Operations like `push`, `pop`, `splice`, `sort`, etc., change the array in place. | Use non-mutating methods or copies (`[...arr]`) to create new arrays.                        | Mutability causes side effects if the array is shared; immutability ensures predictability.            | **Mutable**: `let arr = [1]; arr.push(3);`<br>**Immutable**: `let newArr = [...arr, 3];`                  | Shared references can lead to unintended bugs. Immutable copies may use more memory.                                    |
| **Arrays**  | **Adding (End)**      | `arr.push(item)`                                                                  | `[...arr, item]` or `arr.concat([item])`                                                     | `push` modifies the original; immutable alternatives create a new array.                               | **Mutable**: `arr.push('apple');`<br>**Immutable**: `let newArr = [...arr, 'apple'];`                     | `concat` is versatile for merging; the spread operator (`...`) is often more concise.                                   |
| **Arrays**  | **Adding (Start)**    | `arr.unshift(item)`                                                               | `[item, ...arr]`                                                                             | `unshift` is often inefficient (O(n)) as it re-indexes the array.                                      | **Mutable**: `arr.unshift('banana');`<br>**Immutable**: `let newArr = ['banana', ...arr];`                | The immutable approach is safer for concurrent operations and avoids performance hits from re-indexing.                 |
| **Arrays**  | **Removing**          | `pop()`, `shift()`, `splice(index, 1)`                                            | `arr.slice(start, end)` or `arr.filter(...)`                                                 | Mutable removals alter the original; immutable methods create a new subset.                            | **Mutable**: `arr.pop();`<br>**Immutable**: `let newArr = arr.slice(0, -1);`                              | `filter()` is excellent for conditional removal, e.g., `arr.filter(x => x !== value)`.                                  |
| **Arrays**  | **Sorting/Reversing** | `sort()` or `reverse()`                                                           | Create a copy first: `[...arr].sort()`                                                       | The original order is preserved with the immutable approach, preventing side effects.                  | **Mutable**: `arr.sort();`<br>**Immutable**: `let sorted = [...arr].sort();`                              | You can chain immutable operations safely: `[...arr].sort().reverse()`.                                                 |
| **Arrays**  | **Freezing**          | N/A                                                                               | `Object.freeze(arr)`                                                                         | Prevents any mutations (add/remove/change) to the array.                                               | `Object.freeze(arr); arr.push(3); // Throws Error`                                                        | `freeze` is shallow; nested objects or arrays within it can still be mutated.                                           |
| **Arrays**  | **Deep Immutability** | Manual deep mutations.                                                            | `structuredClone(arr)` or libraries like Immutable.js.                                       | Creates a fully independent copy, ensuring no shared references at any level.                          | `let clone = structuredClone(arr);`                                                                       | `structuredClone` is a modern, built-in way to deep copy. Libraries offer performance optimizations.                    |
| **Arrays**  | **Comparison**        | `arr1 === arr2` checks for reference equality.                                    | Custom deep compare function or `JSON.stringify`.                                            | Reference checks will fail for two identical but separate arrays. Value equality checks contents.      | **Reference**: `[1] === [1] // false`<br>**Value**: `JSON.stringify([1]) === JSON.stringify([1]) // true` | `JSON.stringify` has limitations (loses functions, undefined). Use a library for robustness.                            |
| **Objects** | **Default Behavior**  | Properties can be added, deleted, or changed directly.                            | Create new objects with copies instead of mutating.                                          | Mutability can lead to shared state issues, especially in frameworks like React.                       | **Mutable**: `let obj = {a:1}; obj.b = 2;`<br>**Immutable**: `let newObj = {...obj, b:2};`                | Immutable objects lead to more predictable, pure functions.                                                             |
| **Objects** | **Adding/Updating**   | Direct assignment: `obj.key = value`                                              | Spread syntax: `{...obj, key: value}`                                                        | Direct changes affect all references; the spread syntax creates a fresh object.                        | **Mutable**: `obj.age = 30;`<br>**Immutable**: `let newObj = {...obj, age: 30};`                          | Spread syntax is shallow; nested objects will still be shared by reference.                                             |
| **Objects** | **Removing**          | `delete obj.key`                                                                  | Destructuring/rest syntax: `let {key, ...newObj} = obj;`                                     | `delete` alters the original object; the immutable way rebuilds it without the specified key.          | **Mutable**: `delete obj.key;`<br>**Immutable**: `let {key, ...newObj} = obj;`                            | Destructuring is a clean, modern way to handle property removal immutably.                                              |
| **Objects** | **Freezing**          | N/A                                                                               | `Object.freeze(obj)`                                                                         | Makes the object read-only. Throws an error in strict mode if mutations are attempted.                 | `Object.freeze(obj); obj.a = 2; // Error`                                                                 | `freeze` is shallow. For deep freezing, you need a recursive function.                                                  |
| **Objects** | **Deep Immutability** | Manual deep mutations.                                                            | `structuredClone(obj)` or libraries like Immutable.js.                                       | Ensures nested objects are also new copies, not shared references.                                     | `let clone = structuredClone({nested:{b:2}});`                                                            | `structuredClone` handles circular references. Libraries like Immutable.js optimize memory usage.                       |
| **General** | **Libraries**         | Built-in mutable methods.                                                         | **Immutable.js**: for persistent data structures.<br>**Immer**: for "draft"-based mutations. | Libraries provide efficient immutability without the performance cost of full copies.                  | `let list = Immutable.List([1]);`<br>`let newList = list.push(3);`                                        | These tools optimize performance via structural sharing, which is great for state management (e.g., Redux).             |
| **General** | **Performance**       | Mutations are generally fast but can lead to bugs.                                | Immutable copies can be slower and use more memory (O(n) time/space).                        | Immutability often trades a small amount of performance for a large gain in safety and predictability. | N/A                                                                                                       | In performance-critical code, optimize by checking for reference equality (`===`) before attempting a deep value check. |

