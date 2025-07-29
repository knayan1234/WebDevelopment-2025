function outerFunction() {
  let fullName = "Nayan";
  function innerFunction() {
    console.log(fullName);
  }
  return innerFunction;
}

let newVarible = outerFunction(); //function execute , goes then returned inner function so newVaribale becomes inner function and main function  done executing, varibles destroyed
newVarible(); //but here can discuss

function mainCounter() {
  let val = 0;
  function closureCounter() {
    val = val + 1;
    console.log(val);
  }
  return closureCounter;
}

let toMakeRefCopy = mainCounter();
toMakeRefCopy();
toMakeRefCopy();
toMakeRefCopy();
