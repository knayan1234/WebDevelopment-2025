## Non-enumerable in Objects.

JavaScript Object properties have attributes: `enumerable, writable, and configurable`. Enumerability controls whether a property shows up in typical enumeration mechanisms.
Or, Every property of an object has attributes (metadata) defined in its property descriptor. One of these attributes is enumerable (boolean).

If enumerable: true → the property shows up during enumeration (loops, Object.keys, etc.).
If enumerable: false → the property exists, but is hidden from enumeration.

`getOwnPropertyDescriptor` helps to check it.

```js
const obj = { a: 1 };

console.log(Object.getOwnPropertyDescriptor(obj, "a"));
// { value: 1, writable: true, enumerable: true, configurable: true }
```

- Properties created by **assignment or object literals** are enumerable by default.
- Properties created via **`Object.defineProperty`** are non-enumerable by default unless `enumerable: true` is specified.

**Creating Non-enumerable Properties**

```js
const user = { name: "Alice" };

Object.defineProperty(user, "ssn", {
  value: "123-45-6789",
  enumerable: false, // hidden from loops
  writable: true,
  configurable: true,
});

console.log(user.ssn); // "123-45-6789"
console.log(Object.keys(user)); // ["name"]
console.log(Object.getOwnPropertyNames(user)); // ["name", "ssn"]
```

Enumerable property → shows up in loops (for...in, Object.keys).
Non-enumerable property → still exists and is accessible directly, but hidden from enumeration.

## for...in

It is a loop in JavaScript that iterates over the enumerable string keys of an object (including inherited enumerable properties).
It works on objects, not only just arrays. Returns keys (property names), not values.

**Examples:-**

1. Normal Object

```js
const user = { name: "Alice", age: 25 };

for (let key in user) {
  console.log(key, user[key]);
}
// name Alice
// age 25
```

2. Using defineProperty

```js
const user = { name: "Alice" };

Object.defineProperty(user, "ssn", {
  value: "123-45-6789",
  enumerable: false,
});

for (let key in user) {
  console.log(key); // Only "name"
}
```

3. Inherited Objects

```js
const parent = { species: "human" };
const child = Object.create(parent);
child.name = "Alice";

for (let key in child) {
  console.log(key);
}
// name
// species  (inherited!)
```

4. Arrays

```js
const arr = ["a", "b", "c"];

for (let index in arr) {
  console.log(index, arr[index]);
}
// 0 "a"
// 1 "b"
// 2 "c"
```

_But using `for...in` with arrays is not recommended, because: It iterates over keys as strings, not guaranteed in numeric order. It may include custom/inherited properties._

**Comparison with Other Loops**

- `for...in` → enumerable property keys (own + inherited).
- `Object.keys(obj)` + `forEach` → enumerable own property keys only. `Object.keys(obj).forEach((key) => console.log(key));`
- `for...of` → values of an iterable (like arrays, strings, Maps, Sets).`for (let val of ["a","b","c"]) { console.log(val); }`

## `Object.assign()`

Day17-23Aug

## `in` vs `Object.hasOwnProperty()`

**`in` operator**

- Checks if a property **exists** in an object (own or inherited).
- Returns `true` if the property is found anywhere in the prototype chain.

```js
const person = { name: "Alice" };

console.log("name" in person); // true (own)
console.log("toString" in person); // true (inherited from Object.prototype)
console.log("age" in person); // false
```

---

**`hasOwnProperty()`**

- Checks if a property exists **directly** on the object itself.
- Ignores inherited properties.

```js
const person = { name: "Alice" };

console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("toString")); // false
console.log(person.hasOwnProperty("age")); // false
```

---

**Comparison**

| Feature                      | `in` operator                  | `hasOwnProperty()`                           |
| ---------------------------- | ------------------------------ | -------------------------------------------- |
| Checks own properties?       | ✅ Yes                         | ✅ Yes                                       |
| Checks inherited properties? | ✅ Yes                         | ❌ No                                        |
| Returns                      | Boolean                        | Boolean                                      |
| Use case                     | Quick existence check anywhere | Confirm property truly belongs to the object |

**Example with Prototype**

```js
const parent = { species: "human" };
const child = Object.create(parent);
child.name = "Alice";

console.log("name" in child); // true (own)
console.log("species" in child); // true (inherited)
console.log(child.hasOwnProperty("name")); // true
console.log(child.hasOwnProperty("species")); // false
```

**Best Practice**

Sometimes objects don’t inherit from `Object.prototype` (like `Object.create(null)`), in which case calling `obj.hasOwnProperty` throws.
Safer way:

```js
Object.prototype.hasOwnProperty.call(obj, "key");
```
