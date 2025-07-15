import { useState } from 'react'
import GreetingCard from './components/GreetingCard'

function App() {
  const [count, setCount] = useState(0);
  let name = "Sample Name"

  return (
    <>
      <div style={{display:'flex', alignItems:'center',justifyContent:'center',flexDirection :'column'}}>
        <p> Click below button</p>
        <button onClick={() => setCount((count) => count + 1)}>
          Increase it...
        </button>
        <p>Current counter - {count} </p>
        {/* task 2 to pass name prop to child */}
        <GreetingCard name={name}/>
      </div>
    </>
  )
}

export default App