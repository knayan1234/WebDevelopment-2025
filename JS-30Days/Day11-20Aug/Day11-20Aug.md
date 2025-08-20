> Maps, Sets, WeakMaps, WeakSets, Key differences between traditional objects and Maps/Sets, use cases for weak collections, Key types allowed in Map vs Object, Garbage collection with WeakMap/WeakSet, Uniqueness guarantee and performance considerations, Weak collections and non-enumerability, When should you use a Map instead of an Object in JavaScript?, What are the memory management implications of WeakMap.

### Objects

An object in JavaScript is a special data structure used to store collections of related data and functions having key value pairs. Its keys can be string and _symbols_ . If you write `5: "abc"` , It will become `"5":"abc"`

### Maps

An Map is a enhanced object whose keys can be anything unlike traditional objects.

```js
let myMap = new Map();
myMap.set("name", "Alice"); // Add a key-value pair
myMap.set("age", 30);
console.log(myMap.get("name")); // Outputs: "Alice"
```

**Basic operations:**

- set(key, value): Add or update.
- get(key): Get the value.
- has(key): Check if a key exists (true/false).
- delete(key): Remove a key-value pair.
- clear(): Empty the whole Map.
- size: Tells you how many items are in it (like length).

### Sets

A Set is like a list, but it only allows unique items—no duplicates.

```js
let mySet = new Set();
mySet.add(1); // Add an item
mySet.add(2);
mySet.add(1); // This is ignored because 1 is already there
console.log(mySet.has(1)); // Outputs: true
console.log(mySet.size); // Outputs: 2
```

**Basic operations:**

- add(value): Add if it's not already there.
- has(value): Check if it exists.
- delete(value): Remove it.
- clear(): Empty the Set.
- size: Number of unique items.

### WeakMaps and WeakSets

**What Are Normal Maps and Sets?**

- A **Map** is like a box where you store pairs of things: a "key" and a "value." Keys can be anything, and you can add, get, or remove them easily.
- A **Set** is like a list that only keeps unique items—no duplicates allowed.

These are "strong"—they hold onto your data tightly, even if you don't need it anymore.

**What Is a WeakMap?**

A WeakMap is like a normal Map, but with two big twists:

1. Keys must be objects: You can't use simple things like strings or numbers as keys. Keys have to be something like {} (an empty object) or an array.
2. It's "weak": It doesn't hold onto the keys strongly. If the key is no longer used anywhere else in your code, JavaScript's memory cleaner (called the garbage collector) can automatically remove the whole entry. This prevents your program from wasting space.

```javascript
// Create an empty WeakMap
let myWeakMap = new WeakMap();

// Make a key (it has to be an object)
let key1 = { name: "Alice" }; // This is an object

// Add something to it
myWeakMap.set(key1, "Hello!"); // key1 is the key, "Hello!" is the value

// Get it back
console.log(myWeakMap.get(key1)); // Outputs: "Hello!"

// Check if it exists
console.log(myWeakMap.has(key1)); // Outputs: true

// Remove it
myWeakMap.delete(key1);
```

- What you **can't** do:
  - Use non-object keys: myWeakMap.set("stringKey", "value") would cause an error.
  - Loop through it or get its size: WeakMaps are "hidden" on purpose—no listing all items.

_Think of a WeakMap as a secret notebook where you jot notes tied to specific toys (objects). If you throw away a toy, the note disappears automatically—no cleanup needed!_

**What Is a WeakSet?**

A WeakSet is like a normal Set, but again with twists:

1. Only for objects: You can only add objects (like {} or arrays)—no strings, numbers, etc.
2. It's "weak": Like WeakMap, it doesn't hold onto items strongly. If an object is no longer used elsewhere, the garbage collector can remove it from the WeakSet automatically.
3. Uniqueness: Still guarantees no duplicates, just like a regular Set.

```javascript
// Create an empty WeakSet
let myWeakSet = new WeakSet();

// Make some objects
let obj1 = { type: "Car" };
let obj2 = { type: "Bike" };

// Add them
myWeakSet.add(obj1);
myWeakSet.add(obj2);
myWeakSet.add(obj1); // Ignored—it's already there (unique!)

// Check if something is in it
console.log(myWeakSet.has(obj1)); // Outputs: true

// Remove it
myWeakSet.delete(obj1);
```

- What you **can't** do:
  - Add non-objects: myWeakSet.add(5) would error.
  - Loop through it or get its size: Like WeakMap, it's non-listable.

Why Are They "Weak"? (The Memory Magic)

- In JavaScript, programs can use up memory if they keep too much stuff around.
- Normal Maps/Sets hold items **strongly**—they keep things in memory forever, even if you don't need them.
- WeakMaps/WeakSets hold items **weakly**—they let go if the item (key or object) isn't used elsewhere. This is great for:
  - Saving memory in big apps (like games or websites).
  - Avoiding "memory leaks" (when unused stuff piles up and slows things down).

Example: Imagine you have a WeakMap storing extra info about website buttons. If a button is removed from the page, the WeakMap automatically forgets about it—no extra memory used!

**When Would You Use Them?**

- **WeakMap**: For tying temporary data to objects, like caching (storing quick-access info) without wasting space.
  - Example: In a web app, store user preferences tied to a user object. If the user logs out (object gone), the data auto-cleans.
- **WeakSet**: For tracking unique objects that might disappear.
  - Example: Keep a list of "seen" items in a game. If an item is deleted, it's auto-removed from the list.

**Key Differences from Normal Maps and Sets**

- Normal Map/Set: Flexible keys/values, strong hold (no auto-delete), can loop through and get size.
- WeakMap/WeakSet: Only object keys/items, weak hold (auto-delete possible), no looping or size—more private and memory-friendly.
