### QUICK NOTES

# 🎨 CSS `box-shadow` - Complete Notes

The `box-shadow` property in CSS adds shadow effects to elements, helping to create depth, emphasis, or visual layering.

---

## 🔧 Syntax

```css
box-shadow: [horizontal-offset] [vertical-offset] [blur-radius] [spread-radius]
  [color];
```

> 🔹 `spread-radius` is optional  
> 🔹 Multiple shadows can be added using commas

---

## 🧩 Parameter Breakdown

| Parameter           | Required? | Description                                                                  |
| ------------------- | --------- | ---------------------------------------------------------------------------- |
| `horizontal-offset` | ✅        | Distance to move the shadow left/right (e.g. `10px` right, `-10px` left)     |
| `vertical-offset`   | ✅        | Distance to move the shadow up/down (e.g. `5px` down, `-5px` up)             |
| `blur-radius`       | ⭕        | How blurry the shadow is. Higher value = softer shadow                       |
| `spread-radius`     | ⭕        | How much the shadow size grows/shrinks. Positive = expand, Negative = shrink |
| `color`             | ✅        | Shadow color (`rgba` for transparency works best)                            |

# ⏱️ CSS `transition` - Complete Notes

The `transition` property in CSS allows you to smoothly animate changes in CSS properties over time.

---

## 🔧 Syntax

```css
transition: [property] [duration] [timing-function] [delay];
```

> 🔸 You can also use the shorthand: `transition: all 0.3s ease;`

---

## 🧩 Parameters Explained

| Parameter         | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `property`        | The CSS property to animate (e.g. `background-color`, `transform`, etc.) |
| `duration`        | How long the transition lasts (e.g. `0.5s`, `200ms`)                     |
| `timing-function` | The speed curve of the transition (e.g. `ease`, `linear`, `ease-in-out`) |
| `delay`           | Optional delay before the transition starts (e.g. `0.2s`)                |

---

## ⌛ Timing Functions

| Function       | Description                                                |
| -------------- | ---------------------------------------------------------- |
| `linear`       | Constant speed                                             |
| `ease`         | Starts slow, speeds up, then slows down                    |
| `ease-in`      | Starts slow                                                |
| `ease-out`     | Ends slow                                                  |
| `ease-in-out`  | Starts and ends slow                                       |
| `cubic-bezier` | Custom speed curve (e.g. `cubic-bezier(0.42, 0, 0.58, 1)`) |

---

## ✨ Common Examples

### ➤ Background Color Transition

```css
button {
  background-color: #3498db;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2ecc71;
}
```

---

### ➤ Smooth Width Expansion

```css
.box {
  width: 100px;
  transition: width 0.5s ease-in-out;
}

.box:hover {
  width: 200px;
}
```

---

### ➤ Multiple Properties

```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
```

---

## 🎯 Shorthand Usage

```css
/* Apply transition to all properties */
transition: all 0.3s ease-in-out;
```

> ⚠️ Avoid `all` in performance-critical animations — it may animate unintended properties.
