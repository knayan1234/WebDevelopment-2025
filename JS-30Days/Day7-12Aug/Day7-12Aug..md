## Objects in detail

1. What are objects?

An object in JavaScript is a special data structure used to store collections of related data and functions.All JavaScript values, except for primitives, are objects .
Arrays,Functions,Dates,Regular Expressions,Math, Maps, and Sets

2. Ways to create objects?

- Object literal - Simply write in between curly braces
- `class Animal { constructor(type) { this.type = type; } } const cat = new Animal("feline");.`
- 'Object.create' = `const proto = { greet: function() { return "Hi"; } }; const obj = Object.create(proto);`
- 'new Object' constructor = `const obj = new Object();`

3. Object literal shorthand

This is a concise way to create objects when variable names match property keys, reducing repetition.

```
Variables: const id = 1; const name = "Item";.

Shorthand: const product = { id, name }; // Same as { id: id, name: name }
```

4. computed properties

```
Variable: const prefix = "user_";.
Object: const obj = { [prefix + "id"]: 123 }; // { user_id: 123 }.
```

5. Object.freeze and Object.seal

Methods to restrict object modifications:

Object.freeze(obj): Sets writable and configurable to false for all properties; prevents additions/deletions.
Details: Shallow—nested objects remain mutable.
Step-by-step: const obj = { prop: 1 }; Object.freeze(obj); obj.prop = 2; // Fails.

Object.seal(obj): Prevents additions/deletions but allows value changes (writable stays true).
Details: Configurable set to false.
Step-by-step: Object.seal(obj); obj.newProp = "add"; // Fails, but obj.prop = 2; // Succeeds.

6. ShallowCopy and deep copy

It is a way to create new copy objects from one object. Two ways are there to create it-

Shallow Copy: Copies top-level properties; nested refs are shared. Use { ...obj } or Object.assign().
Details: Mutating a nested object affects originals.
Example: `const copy = { ...original }; copy.nested.value = "changed"; // Affects original`.

Deep Copy: Recursively copies all levels. Use JSON.parse(JSON.stringify(obj)) (limitations: loses functions).
Details: Fully independent copy.

7. Property descriptors

Property descriptors are essentially the "metadata" or hidden rules that define how a property in a JavaScript object behaves.Every property in an object has a descriptor associated with it.

- Writability
  Writability decides if you can change the property's value after it's set. If true, you can reassign it (e.g., obj.property = newValue); if false, attempts to change it will fail silently (or throw an error in strict mode). However, other attributes like enumerability can still be modified if configurable allows it.

- Enumerability
  Enumerability determines whether a property is visible during iterations over an object, such as in for...in loops, Object.keys(), or when serializing to JSON with JSON.stringify(). If a property is enumerable (set to true), it shows up in these operations; if false, it's hidden from them but still accessible directly via its key.
  For example, non-enumerable properties are useful for internal or metadata fields that you don't want exposed accidentally. By default, properties you add normally are enumerable.

- Configurability
  Configurability controls whether you can delete the property or modify its descriptor attributes later. If set to true, you can use delete obj.propertyName or redefine the descriptor; if false, the property is "locked" in its current state—you can't delete it or change most of its attributes (though you might still update its value if writable is true).

8. Symbol as propety keys

What Are Symbols?
Symbols are a special primitive data type in JavaScript, introduced in ES6. Unlike strings or numbers, they're unique and immutable—meaning once created, they can't be changed, and each one is totally distinct, even if they look similar. You create them with the Symbol() function

Normally, object keys are strings (e.g., { name: 'Alice' }), but symbols let you use them as keys in brackets [] for dynamic, unique properties. This is like adding a "secret" key that won't clash with others, even if someone else adds a property with the same name.

Step-by-Step: Adding a Symbol Key:

Create a symbol: const uniqueKey = Symbol('id');.

Use it in an object: const user = { [uniqueKey]: 123 };. (The brackets compute the key dynamically.)

Access it: console.log(user[uniqueKey]); // 123. (You need the exact symbol to access it—strings won't work!)

Try accessing with a string: `console.log(user['id']); // undefined — No clash!

```js
const id = Symbol("id");
const email = Symbol("email");

const person = {
  name: "Bob", // Regular string key
  [id]: 456, // Symbol key
  [email]: "bob@example.com",
};

console.log(person[id]); // 456
console.log(person[email]); // 'bob@example.com'
console.log(person.name); // 'Bob'
```

`console.log(Object.keys(person));  // ['name'] — Symbols are skipped!`
