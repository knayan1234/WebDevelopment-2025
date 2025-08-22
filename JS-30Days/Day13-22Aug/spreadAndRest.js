function processUser({ fullName, age = 18, ...otherDetails }, ...hobbies) {
  return `${fullName} is ${age} and likes ${hobbies.join(
    ", "
  )}. Extra info: ${JSON.stringify(otherDetails)}`;
}

let callFunction = processUser(
  {
    fullName: "Nayan",
    age: 26,
    job: "Developer",
    city: "Bengaluru",
  },
  "Coding",
  "Movies"
);

console.log(callFunction);
