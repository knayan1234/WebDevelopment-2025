### What is `this` keyword in JS

The this keyword in JavaScript is a powerful mechanism that refers to the object executing the current piece of code.

**Use cases :-**

1. Global space

It gives output as diffrent in different places where that piece of code is working. Example (Browser - output Window object, Node - output Global)

2. Function scope

   1. "use-strict" mode
      will output undefined
   2. non strict mode
      will output global object, this is known as `this subsitution`

> It also depends on how functions are called. If `fun();` then undefined in strict mode and window in non strict mode. If `window.fun()`, window in both cases

3. Object

When a function is called as a method of an object (i.e., using obj.method()), this refers to the object to the left of the dot.

```
const person = {
  name: 'Alice',
  greet() {
    console.log(this.name); // 'Alice'
  }
};
person.greet(); // 'Alice'
```

**Call, bind and apply method**
_down of page_

4. Arrow function

Arrow functions do not have their own this. Instead, they capture the `this` value from their defining scope (lexical binding).

```
const obj = {
  value: 42,
  getValue: function() {
    const arrow = () => this.value;
    return arrow();
  }
};
console.log(obj.getValue()); // 42
```

5. HTML

`<button onclick="this.style.backgroundColor='red'">Click me</button>`

## Call method

> Call a Function Right Now with Your Chosen `this`

Imagine you have a function, but you want to run it immediately and tell it exactly what object `this` should refer to. That's what call() does. It's like saying, "Hey function, use `this` object as your `this`, and here's the stuff you need to work with."

Why is it useful? It's great for reusing a function on different objects, like borrowing a method from one person and giving it to another. It runs the function on the spot.

```
function sayHello(age) {
  console.log("Hello, my name is " + this.name + " and I'm " + age + " years old.");
}

const friend1 = { name: "Mia" };  // This is our object

sayHello.call(friend1, 25);  // Output: Hello, my name is Mia and I'm 25 years old.
//this.name inside the function grabs "Mia" from friend1 because we told it to with call();
```

```
const car = {
  brand: "Toyota",
  describe: function(color) {
    console.log("This is a " + color + " " + this.brand + " car.");
  }
};

const bike = { brand: "Honda" };

car.describe.call(bike, "red");  .
```

## Apply

`apply()` is almost the same as call()—it runs the function right away and sets this. The big difference? Instead of listing arguments one by one, you give them all in one array (like a shopping list).

How it works in simple terms: Stick .apply() on your function. First, give it the object for this. Second, give it an array with all the arguments inside.

Why is it useful? Perfect when your arguments are already in an array or something like a list. It's handy for math stuff or when you don't know how many arguments you'll have ahead of time.

```
function findMax() {
  return Math.max.apply(null, arguments);  // We use null because we don't need a special 'this'
}

const numbers = [5, 3, 8, 2];
console.log(findMax(numbers));  // Wait, this won't work directly—see below!

//actually, Math.max expects numbers, not an array. So we do:

console.log(Math.max.apply(null, [5, 3, 8, 2]));  // Output: 8

```

```
function introduce(hobby1, hobby2) {
  console.log(this.name + " likes " + hobby1 + " and " + hobby2 + ".");
}

const kid = { name: "Timmy" };
const hobbies = ["drawing", "playing games"];

introduce.apply(kid, hobbies);  // Output: Timmy likes drawing and playing games.
```

## Bind

bind() is different—it doesn't run the function now. Instead, it makes a copy of the function with this locked to whatever object you choose. You can run this new function later, whenever you want.

How it works in simple terms: Add .bind() to your function. Give it the object for this first. You can also add some arguments right away, which get "stuck" to the new function. Then, call the new function when you're ready.

Why is it useful? Awesome for things like button clicks or timers, where this might get lost. It "binds" everything in place so it doesn't change later.

```
function greet(city) {
  console.log("Hi from " + this.name + " in " + city + "!");
}

const traveler = { name: "Zoe" };

const greetFromZoe = greet.bind(traveler, "London");  // Preset the city
greetFromZoe();  // Output: Hi from Zoe in London!
```

```
const pet = {
  name: "Fluffy",
  bark: function() {
    setTimeout(function() {
      console.log(this.name + " says woof!");
    }.bind(this), 1000);  // Bind keeps 'this' as pet
  }
};

pet.bark();  // After 1 second: Fluffy says woof!
```

## What happens to this inside a regular function when called as a callback? + Binding priority when combined ( bind + new )

| Aspect                                                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Example                                                                                                                                                                                                                                                                                                                    | Notes |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| `this` inside a regular function called as a callback | In JavaScript, when a regular (non-arrow) function is passed as a callback and invoked (e.g., in async operations like `setTimeout` or event listeners), `this` typically loses its original context. It defaults to the global object (`window` in browsers) in non-strict mode or `undefined` in strict mode, because the callback is called standalone without an owning object[1][3][4]. This happens since the invocation doesn't specify a context, leading to common bugs where object properties are inaccessible. Synchronous callbacks (e.g., in `Array.forEach`) may inherit context if provided, but async ones usually don't. | `jsconst obj = {  name: 'Alice',  greet: function() {    console.log('Hello, ' + this.name);  }};setTimeout(obj.greet, 1000);// Output: Hello, undefined (this is global/undefined)`                                                                                                                                       |
| Binding priority: bind vs new                         | When combining `bind` (which hard-binds `this` to a specific object) with the `new` operator (which creates a new instance), `new` has higher priority. The bound `this` is ignored, and `this` inside the function refers to the newly created object. This is per JavaScript specs: `new` overrides explicit bindings to allow bound functions to act as constructors without breaking instantiation[2][5][6]. Without `new`, `bind` enforces its `this`. This priority ensures flexibility in object creation.                                                                                                                          | `jsfunction Person(name) {  this.name = name;}const boundPerson = Person.bind({ name: 'Bob' });boundPerson('Alice'); // Bound this wins, but no new instance createdconsole.log(boundPerson.name); // undefinedconst newPerson = new boundPerson('Charlie'); // new overrides bindconsole.log(newPerson.name); // Charlie` |
