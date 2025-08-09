## Prototype and Protypal inheritance

In JavaScript, every object has an internal link to another object called its prototype. This prototype object itself has a prototype, forming a chain that ends with the null prototype .Prototypes allow objects to inherit properties and methods from other objects.When you try to access a property on an object, JavaScript first checks the object itself. If it's not found, it looks up the prototype chain until it finds the property or reaches the end.

```js
// Base prototype object
let person = {
  greet: function () {
    console.log("Hello!");
  },
};

// Create a new object that inherits from person
let alice = Object.create(person);
alice.name = "Alice"; // Her own property

alice.greet(); // Hello! (from prototype)
```

```js
class Person {
  greet() {
    console.log("Hello!");
  }
}

class Friend extends Person {
  highFive() {
    console.log("High five!");
  }
}

let bob = new Friend();
bob.greet(); // Hello! (inherited)
bob.highFive(); // High five! (own)
```

**Ways to see proto of any object**

1. `__proto__` (old fashioned)
2. `console.log(Object.getPrototypeOf(alice) === person);  // true`

> **JavaScript is fundamentally prototype-based, not class-based like languages such as Java or C++. It uses prototypes for inheritance and sharing behavior between objects. That said, since ES6 (2015), it has a class keyword that looks like class-based syntax, but it's really just a nicer way to write prototype code under the hood.**

1.  Prototypal inheritance and proto chain
    It is like to grab features from another object, or inheriting things from parent.

2.  `__proto__`
    This is a quick way to see or change an object's parent link, but it's old and not the best to use in real code.

3.  Object.create()
    This makes a new object and sets its parent right away.
    ```js
    const parent = { sayHi: () => "Hi!" };
    const kid = Object.create(parent);
    console.log(kid.sayHi()); // "Hi!" (got it from parent)
    ```
4.  Class sugar
    In newer JS (since 2015), "classes" make this look like traditional coding from other languages, but it's still the same parent-child stuff underneath. Example:

    ```js
    class Parent {
      sayHi() {
        return "Hi!";
      }
    }
    class Kid extends Parent {}
    const littleOne = new Kid();
    console.log(littleOne.sayHi()); // "Hi!"
    ```

5.  Shared Mutable State via Prototypes
    This is when multiple objects share changeable stuff (like a list or another object) through their parent, and if one changes it, everyone sees the update. It can cause surprises if you're not careful, like everyone editing the same shopping list.

    ````js
    const family = { shoppingList: [] };
    const person1 = Object.create(family);
    const person2 = Object.create(family);
    person1.shoppingList.push("Milk"); // Changes the shared list
    console.log(person2.shoppingList); // ["Milk"] (oops, it's changed!)
        ```
    ````

6.  Prototype and proto

Prototype" is something attached to a function that's like a factory for making objects, and proto is attached to particular object
"proto" is on the objects themselves – it's like a tag that says, "Hey, if I don't have what you need, check my factory's prototype
