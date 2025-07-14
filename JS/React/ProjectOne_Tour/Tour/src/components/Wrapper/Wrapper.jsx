import React from 'react'
import Card from '../card/card'
import './Wrapper.css'


const Wrapper = ({data,btnHandler}) => {
  return (
    <div style={{display:'flex',gap:'10px', flexWrap:'wrap'
    }}>
        {data.map((d)=>{
          return <Card key={d.id} {...d} btnHandler={btnHandler}/>
        })}
    </div>
  )
}

export default Wrapper