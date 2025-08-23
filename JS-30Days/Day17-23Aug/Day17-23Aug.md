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

| Category                   | Aspect                        | Mutable Approach                                                                                                               | Immutable Alternative                                                                          | Description                                                                                                    | Example Code                                                                                                              | Notes and Risks                                                                                                 |
| -------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Arrays                     | Default Behavior              | Arrays are mutable by default; operations like push, pop, splice, shift, unshift, reverse, and sort change the array in place. | Use non-mutating methods or copies to create new arrays without altering the original.         | Mutability causes side effects if the array is shared; immutability ensures predictability in functional code. | Mutable: `let arr = ; arr.push(3); // arr is now `<br>Immutable: `let arr = ; let newArr = [...arr, 3]; // arr unchanged` | Risk: Shared references lead to unintended changes; immutable methods may consume more memory for large arrays. |
| Arrays                     | Adding Elements (End)         | `push(item)` adds to the end and mutates.                                                                                      | Spread with new array: `[...arr, item]` or `arr.concat([item])` returns a new array.           | Push modifies the original length and content; alternatives create a fresh array.                              | Mutable: `arr.push('apple');`<br>Immutable: `let newArr = [...arr, 'apple'];`                                             | Concat is versatile for merging arrays; spread is concise but shallow.                                          |
| Arrays                     | Adding Elements (Start)       | `unshift(item)` adds to the beginning and mutates.                                                                             | Spread with item first: `[item, ...arr]` returns a new array.                                  | Unshift shifts all elements, which is inefficient and mutating; immutable way avoids this.                     | Mutable: `arr.unshift('banana');`<br>Immutable: `let newArr = ['banana', ...arr];`                                        | Performance: Unshift is O(n) due to shifting; immutable is safer for concurrency.                               |
| Arrays                     | Removing Elements             | `pop()`, `shift()`, or `splice(index, count)` remove and mutate.                                                               | `slice(start, end)` or `filter()` to create a new array without the elements.                  | Mutable removals alter the original; immutable creates a subset.                                               | Mutable: `arr.pop(); // Removes last`<br>Immutable: `let newArr = arr.slice(0, -1); // New without last`                  | Filter is great for conditional removal, e.g., `arr.filter(x => x !== value)`; shallow for nested.              |
| Arrays                     | Sorting/Reversing             | `sort()` or `reverse()` mutate the array in place.                                                                             | Copy then mutate: `[...arr].sort()` or `[...arr].reverse()` returns sorted/reversed new array. | Original order is preserved in immutable; allows chaining without side effects.                                | Mutable: `arr.sort();`<br>Immutable: `let sorted = [...arr].sort();`                                                      | Can chain: `[...arr].sort().reverse();` – original unchanged.                                                   |
| Arrays                     | Freezing                      | N/A (arrays are objects, but mutable by default).                                                                              | `Object.freeze(arr)` prevents mutations (add/remove/change).                                   | Freeze makes array read-only but is shallow; nested objects can still mutate.                                  | mutate.                                                                                                                   | `let arr = [1, {a:2}]; Object.freeze(arr); arr.push(3); // Error`                                               | Shallow: `arr[1].a = 3;` still works; use recursive freeze for depth. |
| Arrays                     | Deep Immutability             | Manual mutations propagate deeply.                                                                                             | `structuredClone(arr)` or libraries like Immutable.js for persistent structures.               | Deep cloning creates fully independent copies; Immutable.js optimizes with shared structure.                   | `let clone = structuredClone(arr);` or `Immutable.List(arr).push(4); // Returns new List`                                 | Immutable.js uses value equality, not reference; better for large data.                                         |
| Arrays                     | Comparison                    | `==` or `===` checks reference, not content.                                                                                   | Use `Immutable.is(a, b)` for value equality or custom deep compare.                            | Reference equality fails for identical but separate arrays; value equality checks contents.                    | Reference: `[1] === [1] // false`<br>Value: `Immutable.is(List([1]), List([1])) // true`                                  | JSON.stringify for simple deep compare, but loses types; order matters in arrays.                               |
| Objects                    | Default Behavior              | Objects are mutable; properties can be added, deleted, or changed directly.                                                    | Create new objects via copies instead of mutating.                                             | Mutability leads to shared state issues; immutability promotes pure functions.                                 | Mutable: `let obj = {a:1}; obj.b = 2; // obj changed`<br>Immutable: `let newObj = {...obj, b:2};`                         | Risk: Deep mutations in shared objects cause bugs in apps like React.                                           |
| Objects                    | Adding/Updating Properties    | Direct assignment: `obj.key = value` mutates.                                                                                  | Spread: `{...obj, key: value}` or `Object.assign({}, obj, {key: value})` creates new.          | Direct changes affect all references; immutable creates a fresh object.                                        | Mutable: `obj.age = 30;`<br>Immutable: `let newObj = {...obj, age:30};`                                                   | Spread is shallow; nested objects remain referenced.                                                            |
| Objects                    | Removing Properties           | `delete obj.key` mutates.                                                                                                      | Omit in new object: `{...obj}` then manually exclude, or use libraries.                        | Delete alters the original; immutable way rebuilds without the key.                                            | Mutable: `delete obj.key;`<br>Immutable: `let {key, ...newObj} = obj; // Destructuring`                                   | Destructuring is clean for removal; Immutable.js has `delete()` returning new Map.                              |
| Objects                    | Freezing                      | N/A (mutable by default).                                                                                                      | `Object.freeze(obj)` prevents add/remove/change.                                               | Makes object read-only; throws errors on mutations in strict mode.                                             | `let obj = {a:1}; Object.freeze(obj); obj.a = 2; // Error`                                                                | Shallow: Nested objects mutable; combine with deep freeze function.                                             |
| Objects                    | Sealing/Preventing Extensions | `Object.seal(obj)` allows value changes but not add/remove; `Object.preventExtensions(obj)` blocks additions.                  | Use in conjunction with copies for controlled immutability.                                    | Seal is less strict than freeze; useful for partial immutability.                                              | `Object.seal(obj); obj.a = 2; // OK, but can't add new`                                                                   | Not fully immutable; values can still change.                                                                   |
| Objects                    | Deep Immutability             | Manual deep mutations.                                                                                                         | `structuredClone(obj)` or Immutable.js for persistent maps.                                    | Ensures nested structures are independent; Immutable.js shares unchanged parts for efficiency.                 | `let clone = structuredClone({nested:{b:2}});` or `Immutable.Map(obj).set('key', value); // New Map`                      | Handles circular references; value equality in Immutable.js.                                                    |
| Objects                    | Comparison                    | `==` or `===` checks reference.                                                                                                | `Immutable.is(a, b)` or deep compare via JSON.stringify or custom function.                    | Value equality ignores references, checks keys/values deeply.                                                  | Reference: `{a:1} === {a:1} // false`<br>Value: `JSON.stringify(obj1) === JSON.stringify(obj2) // true if identical`      | JSON method fails on order, functions, or undefined; use lodash.isEqual for robustness.                         |
| General (Arrays & Objects) | Libraries and Tools           | Built-in mutable methods.                                                                                                      | Immutable.js for persistent collections; Immer for draft-based mutations.                      | Libraries provide efficient immutability without full copies.                                                  | `let list = Immutable.List([1]); let newList = list.push(3); // Original unchanged`                                       | Optimizes memory via structural sharing; great for Redux-like state.                                            |
| General (Arrays & Objects) | Performance Tradeoffs         | Mutations are fast but risky.                                                                                                  | Copies can be O(n) time/space; value equality checks may be O(n) for large data.               | Immutability trades speed for safety; reference equality is O(1) but limited.                                  | N/A                                                                                                                       | Use reference checks first, then value for optimization.                                                        |

```

```
