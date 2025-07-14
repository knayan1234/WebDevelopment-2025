import React from 'react'
import './Card.css'

const card = ({id,name,info,price,btnHandler}) => {

  const smallDesc = info.substring(0,50);

  return (
    <div style={{border:'1px solid red', width:'30vw', height:'30vh',display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center',flexWrap: 'wrap'
}}>
      
      <h1>{name}</h1>
      <div>
        <p>{smallDesc}</p>
        <p>{price}</p>
      </div>
      <div>
        <button onClick={()=>btnHandler(id)}>Not interested</button>
      </div>
    </div>
  )
}

export default card