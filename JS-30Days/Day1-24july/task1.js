/**
 * COPIED CODE FROM GPT
 * A robust function to check if a value is a "plain" object.
 * A plain object is one created via {} or new Object().
 */
function isPlainObject(value) {
  // 1. Rule out non-objects and null.
  if (value === null || typeof value !== "object") {
    return false;
  }

  // 2. Get the direct prototype of the value.
  const proto = Object.getPrototypeOf(value);

  // 3. An object with no prototype (e.g., Object.create(null)) is plain.
  if (proto === null) {
    return true;
  }

  // 4. Check if the prototype is the standard Object.prototype.
  // This ensures it's not an instance of a more specific class like Array or Date.
  let Ctor = proto.hasOwnProperty("constructor") && proto.constructor;
  return (
    typeof Ctor === "function" &&
    Function.prototype.toString.call(Ctor) ===
      Function.prototype.toString.call(Object)
  );
}

// --- Test Cases ---
console.log("--- Plain Objects (Should be true) ---");
console.log("{} is plain object:", isPlainObject({}));
console.log("new Object() is plain object:", isPlainObject(new Object()));
console.log(
  "Object.create(null) is plain object:",
  isPlainObject(Object.create(null))
);

console.log("\n--- Not Plain Objects (Should be false) ---");
console.log("[] is plain object:", isPlainObject([]));
console.log("new Date() is plain object:", isPlainObject(new Date()));
console.log("new Map() is plain object:", isPlainObject(new Map()));
class Person {}
console.log("new Person() is plain object:", isPlainObject(new Person()));

console.log("\n--- Primitives and Null (Should be false) ---");
console.log("null is plain object:", isPlainObject(null));
console.log("undefined is plain object:", isPlainObject(undefined));
console.log('"hello" is plain object:', isPlainObject("hello"));
console.log("123 is plain object:", isPlainObject(123));
console.log("true is plain object:", isPlainObject(true));
