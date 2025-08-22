> String & Number Methods, Template Literals, Modern string and number methods, interpolation, and immutability, Method chaining on strings, Numeric separators ( 1_000_000 ), Tagged templates, Unicode and surrogate pairs in strings, How are template literals different from traditional string concatenation?, Give an example where method-chaining on string values would fail.

### Strings and Numbers and its methods

Strings are pieces of text, like words or sentences. You create them with single quotes ('hello'), double quotes ("hello"), or backticks (`hello` – we'll talk about backticks later).

Numbers are just numeric values, like 5 or 3.14. They can be whole numbers (integers) or decimals (floats).

[w3SchoolsStringsMethods](https://www.w3schools.com/js/js_string_methods.asp)
[w3SchoolsNumbersMethods](https://www.w3schools.com/js/js_number_methods.asp)

> read mdn also as new methods also there

Strings in JavaScript are immutable.

### Method chaining

it means calling multiple methods in a row, like a chain: string.method1().method2().

It works because most string methods return a new string, so we can immediately call another method on that new one.

### Interpolation

means embedding variables or expressions directly inside template literals using `${expression}`.

### Numeric Separators (Making Big Numbers Readable)

Numeric separators let you use underscores `(_)` in numbers to group digits, like commas in writing. JavaScript ignores them – it's just for readability.

```js
let million = 1_000_000; // Same as 1000000
console.log(million); // 1000000
let billion = 1_000_000_000;
console.log(billion + 1); // 1000000001
```

### Tagged Templates (Advanced Template Literals)

Tagged templates are like template literals with a "tag" function in front. The function processes the template, letting you customize it (e.g., for safety or formatting).

```js
function tag(strings, ...values) {
  // strings: array of static parts
  // values: array of interpolated values
  return strings[0] + values.toUpperCase() + strings; // Custom logic
}

let name = "alice";
let result = tag`Hello, ${name}!`; // Calls the tag function
console.log(result); // "Hello, ALICE!"
```

> unicode and surrogate??
