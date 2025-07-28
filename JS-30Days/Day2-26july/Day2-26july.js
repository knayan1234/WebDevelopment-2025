// ------------------Variable hoisting----------------------
console.log(fullName); // will give undefined as only `var fullname;` goes up fo this line not value
var fullName = "Nayan";
console.log(fullName);

// console.log(age); // breaks as refrence error, no hoisitng// line -7 is TDZ for age
let age = "27";
console.log(age);
//------------------end-------------

// ------------------Function hoisting----------------------
greet(); // works perfectly as function declaration go up.
function greet() {
  console.log("I am inside greet");
}
greet();

// greetNew(); //breaks as function expression dont have hoisting line 19-21 has TDZ
let greetNew = () => {
  console.log("I am greetNew");
};
greetNew();
//------------------end-------------
