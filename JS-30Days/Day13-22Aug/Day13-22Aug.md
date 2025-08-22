> Destructuring and Spread/Rest, Array and object destructuring; using spread and rest (…syntax) for copies/parameters, Default values in destructuring, Nested destructuring with renaming, Shallow vs. deep copy issues, Performance/footguns with large spreads, Explain how object destructuring assignment works in function parameters, What’s the difference between shallow and deep copy when using spread syntax?, Write a function with destructuring and rest for arguments, then explain the destructured values.

## Destructuring

is a way to "unpack" values from arrays or objects into separate variables

1. Array destructuring

```javascript
let fruits = ["apple", "banana", "cherry"];

// Without destructuring (old way)
let first = fruits[0]; // 'apple'
let second = fruits[1]; // 'banana'

// With destructuring (better way)
let [firstFruit, secondFruit] = fruits;
console.log(firstFruit); // 'apple'
console.log(secondFruit); // 'banana'
```

_If the array has more items, they are ignored (like above). If fewer, the extra variables get undefined._

2. Object destructuring

```js
let person = { name: "Alice", age: 30 };

// Without destructuring
let personName = person.name; // 'Alice'
let personAge = person.age; // 30

// With destructuring
let { name, age } = person;
console.log(name); // 'Alice'
console.log(age); // 30
```

## Default Values in Destructuring

```js
let numbers = [1]; // Only one item
let [a, b = 2] = numbers; // b gets default 2
console.log(a); // 1
console.log(b); // 2
```

```js
let person = { name: "Alice" }; // No age
let { name, age = 25 } = person;
console.log(name); // 'Alice'
console.log(age); // 25 (default)
```

## Nested destructuring

```js
let user = {
  id: 1,
  info: {
    // Nested object
    name: "Bob",
    address: {
      // Even deeper nested
      city: "New York",
    },
  },
};

// Nested destructuring
let {
  info: {
    name,
    address: { city },
  },
} = user;
console.log(name); // 'Bob'
console.log(city); // 'New York'
```

```js
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

let [[a, b, c], [d, e, f], [, h, i]] = matrix;
console.log(a, b, c, d, e, f, h, i);
```

## Renaming

```js
let { name: fullName, age: yearsOld = 30 } = { name: "Charlie", age: 28 };
console.log(fullName); // 'Charlie' (renamed from 'name')
console.log(yearsOld); // 28 (renamed from 'age', default not used)
// Renaming uses a colon (:) like originalName: newName.
```

> Renaming is not possible in array as it in number(index) based not keys based.

## Spread and rest

- **Spread**

Spread "spreads out" items from an array or object into a new one.
Use: For making copies or combining data.

```js
let arr1 = [1, 2];
let arr2 = [...arr1, 3, 4]; // Spread arr1 into new array
console.log(arr2); // [1, 2, 3, 4]
```

```javascript
let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3 }; // Spread obj1 into new object
console.log(obj2); // { a: 1, b: 2, c: 3 }
```

> From notes : Before ES6, the spread operator was gaetting used for only iterables (Arrays, String, Maps, Set, ~~Object [AS IT IS NOT ITERABLES]~~), But after ES6 2018, Spread is getting used for Objects also although it is not iterables.

- **Rest**

Rest "gathers" remaining items into an array.
Use: In destructuring or function parameters to handle extras

```js
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest); // [2, 3, 4] (gathered rest)
```

```js
let { a, ...rest } = { a: 1, b: 2, c: 3 };
console.log(a); // 1
console.log(rest); // { b: 2, c: 3 }
```

## Shallow vs. Deep Copy Issues

**Shallow Copy**: Spread copies only the top level. If there are nested arrays/objects, it copies references (pointers) to them, not new copies. Changes to nested data affect the original.

Spread always makes a shallow copy: It copies top-level properties but shares references to nested objects/arrays.

**Deep Copy**: Copies everything, including nested data. Spread doesn't do this—you need methods like JSON.parse(JSON.stringify(obj)) or libraries (e.g., lodash's deepClone).

Deep copy makes independent copies of everything (no shared references). Spread can't do deep copies alone—you need extra steps (like the JSON method above). Use shallow for simple data; deep for complex nested data to avoid bugs.

```javascript
let original = { name: "Dave", details: { age: 40 } };
let shallowCopy = { ...original }; // Shallow copy

shallowCopy.details.age = 41; // Change nested
console.log(original.details.age); // 41 (original changed too!)
```
