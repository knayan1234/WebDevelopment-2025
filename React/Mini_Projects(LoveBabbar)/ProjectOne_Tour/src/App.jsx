
import { useState } from 'react'
import './App.css'
import Wrapper from './components/Wrapper/Wrapper.jsx'
import data from './data/dummyData.js'

function App() {
  const [dummyData, setDummyData]=useState(data);

  const btnHandler=(id)=>{
    console.log("btnhandler",id)
    let filData= dummyData.filter(dummyData =>id !== dummyData.id);
    setDummyData(filData)
  }

  if(dummyData.length===0){
    return(
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <h4>No Tours</h4>
        <button onClick={()=> setDummyData(data)}>Refresh</button>
      </div>
    )}

  return (
    <div className='main-app'>
        <Wrapper data={dummyData} btnHandler={btnHandler}/>
    </div>
  )
}

export default App
