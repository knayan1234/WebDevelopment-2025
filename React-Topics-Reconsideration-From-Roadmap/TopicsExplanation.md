### 1. Login form using both state and ref

```
function App() {
  const [formDetails, setFormDetails] = useState({
    name: '',
    email: '',
    bday: '',
    tel: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({...prev, [name]: value}));
  };

  const submitHandler=()=>{
    console.log(formDetails);
  }

  return (
      <form  onSubmit={submitHandler}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formDetails.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formDetails.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Birthday:
          <input
            type="date"
            name="bday"
            value={formDetails.bday}
            onChange={handleChange}
          />
        </label>
        <label>
          Telephone:
          <input
            type="tel"
            name="tel"
            value={formDetails.tel}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
  );
}
```

> **Why Square brackets `[Name]`?** => This is called dynamic property name from ES6.

```
function App() {
  const nameRef = useRef();
  const emailRef = useRef();
  const bdayRef = useRef();
  const telRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      bday: bdayRef.current.value,
      tel: telRef.current.value
    };
    console.log(formData);
  };

  return (
      <form onSubmit={submitHandler}>
        <label>
          Name:
          <input type="text" name="name" ref={nameRef} />
        </label>
        <label>
          Email:
          <input type="email" name="email" ref={emailRef} />
        </label>
        <label>
          Birthday:
          <input type="date" name="bday" ref={bdayRef} />
        </label>
        <label>
          Telephone:
          <input type="tel" name="tel" ref={telRef} />
        </label>
        <button type="submit">Submit</button>
      </form>
  );
}

export default App;
```

---

### 2. Debouncing

Debouncing is a technique to optimize function execution, such as API calls, by ensuring that a function only runs after the user has stopped triggering an event—like typing in an input box, scrolling, or performing any rapid event—for a specified amount of time

```
<input
  class="amount-input"
  type="number"
  placeholder="Enter amount earned today"
/>
<div class="earnings"></div>
```

```
 <script>
      // ES6 Debounce Function
      const debounce = (fn, delay = 400) => {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => fn(...args), delay);
        };
      };

      // Earnings display logic
      const showEarnings = (event) => {
        const value = event.target.value;
        document.querySelector('.earnings').textContent =
          value ? `You could earn $${value * 30} this month!` : '';
      };

      // Setup
      const input = document.querySelector('.amount-input');
      input.addEventListener('input', debounce(showEarnings, 500));
    </script>
```

### 3,4,5. useCallback, useMemo and React.memo

**useCallback** is a React Hook used to memoize a function, preventing its recreation on every re-render unless its dependencies change. It is used to memoize functions so they’re not redefined on every render, useful when **passing functions to child components** or using them as dependencies

```
const memoizedFn = useCallback(() => {
  // function logic
}, [dependencies]);
```

**React.Memo** memoises functional component, `React.memo` stops a component from redrawing if its props (inputs) stay the same.

`const MemoComponent = React.memo(MyComponent);`

> Important - Lets say we have one parent and onechild component, we are passing primitive datatypes(_The data which is built in and that is not an object(String,Number,BigInt,Boolean,Undefined,Null,Symbol)_) as props then React.Memo stop re rendering, but if the props are object including functions **as functions are objects** in js , we need to give useCallback while defining the function in parent component and wrap the child with React.memo.

**useMemo** saves a value so we don’t redo work every time the component redraws. It only recalculates if something specific changes.

```
const doubled = useMemo(() => {
    console.log("Doubling...");
    return count * 2;
  }, [count]);
```

**COMBINED EXAMPLE**

```jsx
const ExpensiveComponent = React.memo(({ onButtonClick, data }) => {
  return <button onClick={onButtonClick}>{data}</button>;
});

function computeData(count) {
  let total = 0;
  for (let i = 0; i < 100000000000; i++) {
    total += i;
  }
  return `Result: ${count + total}`;
}

export default function App() {
  const [count, setCount] = useState(0);

  const data = useMemo(() => computeData(count), [count]);

  const handleButtonClick = useCallback(() => setCount(c => c + 1), []);

  return (<ExpensiveComponent onButtonClick={handleButtonClick} data={data}) />;
}
```

### 6,7. RHF and Formik
