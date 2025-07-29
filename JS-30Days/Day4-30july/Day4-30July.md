## Lexical scoping

Lexical scoping means that the way variables are found (and where they "belong") is based on where they are written in your code. In JavaScript, when a function is created, it remembers the environment or place (the "scope") where it was defined, not where it’s called from.

```
function outer() {
  let a = 10;
  function inner() {
    console.log(a); // inner() can "see" 'a' because of lexical scope
  }
  inner();
}
outer(); // Output: 10
```

## Closure

A closure happens when an inner function “remembers” the variables from the outer function even after the outer function is done running.

It's like an inner worker who, even after leaving the house, still keeps a key to get back and access things inside the house.

**closure in callbacks/loop**

In loops and callbacks, closures help each function remember the right value it was supposed to work with, even after time has passed.

```
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
// This prints: 3, 3, 3 -Every timer function refers to the same i, which becomes 3 after the loop ends.
```

Fixing the problem with IIFE
Here’s how IIFE helps:

```
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, 1000);
  })(i);
}
```

Step-by-step explanation:

- What is (function(j){ ... })(i);?

-It’s a function that accepts j (the current value of i).

- Immediately after defining it, we call it by passing in the current i as an argument.

- What happens inside?

- Inside the IIFE, there is a setTimeout callback.

- This callback refers to j, not the outer i.

- How does the closure work?

- Each time through the loop, a new j is created with the current value of i.

- The function inside setTimeout “remembers” that specific j–not the shared i.

- So, after 1 second, it prints 0, 1, and 2.

## IIFE

immediately invoked fucntion expression, doesn't need to call, called immdiately where defined, only one time call, no function name required.

1. `(function(){.....})();`
2. `(()=>{.....})();`
3. `(async ()=>{...})();`

## When Memory Leaks Happen

If a closure captures a reference to a large object (like a big array or DOM node) and the closure remains accessible somewhere in your code, then that object can’t be cleaned up by the JavaScript garbage collector—even if you don’t use it anymore. As a result, memory usage grows unnecessarily.

## LEGB

The LEGB model is a rule in Python that explains how the interpreter decides where to look for a variable when you use its name in your code. It stands for:

- Local

- Enclosing

- Global

- Built-in
