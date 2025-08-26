> Event Delegation, Propagation, and Custom Events, Event bubbling, capturing, delegation, and emitting custom events, stopPropagation , preventDefault, Pattern: using delegation for performance, Creating and dispatching CustomEvent, Reentrancy and event queue timing with custom events, . How does event delegation work, and why is it important?, What would happen if you call stopPropagation() in a capturing handler?

## Events

[myReact18JulyLink](https://github.com/knayan1234/WebDevelopment-2025/blob/main/7WeeksRoadmap/18July/18July-self.md#events-in-js)

Events in JavaScript don't just happen in isolation; they "propagate" or travel through the DOM tree.

Two ways are there-

1. Bubbling (going up) - Bubbling is when the event starts at the clicked thing and climbs up to parents. Like a kid yelling "Help!" and the yell going to mom, then grandma.

2. Capturing (going down)- Capturing is the opposite: starts at the top and goes down. Like grandma checking on everyone before the kid even knows. You turn it on with `{ capture: true }`. It's less used, but good for stopping things early.

<u>Most of the time, we use bubbling</u> — it's the default. Capturing is optional.

Example -

```html
<div id="grandma">
  <!-- Big box -->
  <div id="mom">
    <!-- Medium box -->
    <button id="kid">Click Me!</button>
    <!-- Small box -->
  </div>
</div>
```

```js
let grandma = document.getElementById("grandma");
let mom = document.getElementById("mom");
let kid = document.getElementById("kid");

// Listen for clicks (default is bubbling)
grandma.addEventListener("click", () =>
  console.log("Grandma heard the bubble!")
);
mom.addEventListener("click", () => console.log("Mom heard the bubble!"));
kid.addEventListener("click", () => console.log("Kid was clicked!"));

// For capturing (add { capture: true })
grandma.addEventListener(
  "click",
  () => console.log("Grandma capturing down!"),
  { capture: true }
);
mom.addEventListener("click", () => console.log("Mom capturing down!"), {
  capture: true,
});
kid.addEventListener("click", () => console.log("Kid capturing!"), {
  capture: true,
});
```

Click the button (kid). What happens in console?

1. Grandma capturing down!
2. Mom capturing down!
3. Kid capturing!
4. Kid was clicked! (this is at the kid, bubbling starts here)
5. Mom heard the bubble!
6. Grandma heard the bubble!

The event goes down (capturing), hits the kid, then up (bubbling). This "propagation" lets parents know what kids are doing.

## Event Delegation

Delegation uses bubbling to be efficient. Instead of putting a listener on every kid, put one on the mom or grandma. When a kid bubbles up, the parent checks who it was (using `event.target`) and handles it.

**Why is this important?**

- Saves Speed and Memory: If you have 100 buttons, don't add 100 listeners—that slows your page. One listener on the parent is faster.

- Works for New Stuff: If you add more buttons later (with JS), they work automatically because of bubbling.

Example -

```html
<ul id="tasks">
  <li>Buy milk <button class="delete">X</button></li>
  <li>Walk dog <button class="delete">X</button></li>
</ul>
```

Bad way (not delegation):

```js
let deletes = document.querySelectorAll(".delete");
deletes.forEach((button) =>
  button.addEventListener("click", () => console.log("Deleted!"))
);
```

Good way (delegation):

```js
let tasks = document.getElementById("tasks");
tasks.addEventListener("click", (event) => {
  if (event.target.className === "delete") {
    // Check if it's a delete button
    console.log("Deleted this task!");
    // To really delete: event.target.parentElement.remove();
  }
});
```

How it works step by step:

1. Click a delete button (inside `<li>`).
2. Event bubbles to `<ul>` (the parent).
3. The listener checks event.target— is it a `.delete` button?
4. If yes, do the action.

## Stopping Events with `stopPropagation()` and `preventDefault()`

- `stopPropagation()`: Says "Stop! Don't go further." Stops bubbling or capturing. Parents won't hear it.

- `preventDefault()`: Stops the browser's normal action, like stopping a link from opening a page. But the event still travels.

```js
mom.addEventListener("click", (event) => {
  event.stopPropagation(); // No more travel to grandma
  console.log("Mom stops it here!");
});

kid.addEventListener("click", (event) => {
  event.preventDefault(); // If kid was a link, it won't go to the URL
  console.log("Kid says no default!");
});
```

Click kid: Kid logs, mom logs and stops—so grandma is quiet.

## What Happens If You Call stopPropagation() in a Capturing Handler?

If you do this in a capturing listener (like on grandma), it stops everything right there. The event won't go down to mom or kid, and no bubbling happens.

Example: If grandma's capturing handler has `event.stopPropagation()`, clicking kid only runs grandma's code—nothing else. It's like grandma blocks the door early!

## Custom Events

Custom events are events you invent.

1. Make One: `new CustomEvent('myEvent', { detail: { info: 'Something' } })` _detail holds extra info._

2. Send It (Dispatch): `element.dispatchEvent(myEvent)`

3. Listen: Same as normal: `addEventListener('myEvent', (e) => console.log(e.detail.info))`

```js
let box = document.getElementById("myBox"); // Some element

//1. Create a custom event
let custom = new CustomEvent("myEvent", {
  detail: { info: "Hello!" },
  bubbles: true,
});

//2. Dispatch it / Sent it
box.dispatchEvent(custom);

//3. Listen it
box.addEventListener("myEvent", (e) =>
  console.log("Got it! Message: " + e.detail.info)
);
```

It bubbles if you set bubbles: true

## Reentrancy and Timing with Custom Events

JavaScript runs one thing at a time in a "queue" (like a line at a store).

1. Timing: If you send a custom event inside another handler, it waits in line— doesn't jump ahead.

2. Reentrancy: If events call each other in a loop (like event A calls B, B calls A), it can get stuck. But the queue helps prevent total crashes. Use carefully, maybe add a check to stop loops.

Example:

```javascript
box.addEventListener("click", () => {
  console.log("Click start");
  let custom = new CustomEvent("wait", { bubbles: true });
  box.dispatchEvent(custom); // Waits until click finishes
  console.log("Click end");
});

box.addEventListener("wait", () => console.log("Now the custom!"));
```

Click: "Click start", "Click end", THEN "Now the custom!"
