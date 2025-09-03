
// First example

// Outer function that creates a variable and returns an inner function
function createNamePrinter() {
  let personName = "Nayan";  // Local variable in the outer function – normally destroyed when function ends
  
  // Inner function that will "remember" personName via closure
  function printName() {
    console.log(personName);  // Accesses the outer variable (closure magic!)
  }
  
  return printName;  // Return the inner function (we don't run it here)
}

// Call the outer function and store the returned inner function
let returnedInnerFunc = createNamePrinter();  // Outer function runs, creates personName, returns printName, then finishes

// Now run the inner function – it still remembers personName!
returnedInnerFunc();  // Prints: "Nayan" – even though createNamePrinter() is done and personName should be gone



// Second example

// Outer function that sets up a private counter and returns an inner function
function createCounter() {
  let count = 0;  // Private variable – starts at 0, only accessible via the closure
  
  // Inner function that increments and prints the count
  function incrementAndPrint() {
    count = count + 1;  // Update the remembered count (closure allows this)
    console.log(count);  // Print the updated value
  }
  
  return incrementAndPrint;  // Return the inner function (we don't run it here)
}

// Call the outer function and store the returned inner function
let myCounter = createCounter();  // Outer function runs, creates count=0, returns incrementAndPrint, then finishes

// Now call the inner function multiple times – it remembers and updates count each time!
myCounter();  // Prints: 1 (count becomes 1)
myCounter();  // Prints: 2 (count becomes 2)
myCounter();  // Prints: 3 (count becomes 3)


