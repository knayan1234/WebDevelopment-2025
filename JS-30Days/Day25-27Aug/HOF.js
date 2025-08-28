// Problem statement - you have to create a function that should take the radius of circle and give area, circumference. diameter

let radius = [1, 2, 3, 4, 5, 6, 7];

/**Old way starts here - not recommended for interview */

const calculateArea = (radius) => {
  let areaArray = [];
  for (i = 0; i < radius.length; i++) {
    areaArray.push(Math.PI * radius[i] * radius[i]);
  }
  return areaArray;
};

const calculateCircumference = (radius) => {
  let circumArray = [];
  for (i = 0; i < radius.length; i++) {
    circumArray.push(2 * Math.PI * radius[i]);
  }
  return circumArray;
};

console.log(calculateArea(radius));
console.log(calculateCircumference(radius));

/** Old way ends here, new way starts */

const area = function (radius) {
  return Math.PI * radius[i] * radius[i];
};

const circumference = function (radius) {
  return 2 * Math.PI * radius[i];
};

const diameter = function (radius) {
  return radius[i] * radius[i];
};

const calculate = function (radius, logic) {
  let output = [];
  for (i = 0; i < radius.length; i++) {
    output.push(logic(radius));
  }
  return output;
};

console.log(calculate(radius, area));
console.log(calculate(radius, circumference));
console.log(calculate(radius, diameter));
