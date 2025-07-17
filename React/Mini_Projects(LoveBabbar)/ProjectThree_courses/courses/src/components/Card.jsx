import React from 'react'

const Card = ({singleCard}) => {
  return (
    <div>
        <img src={singleCard.image.url}></img>
        <h4>{singleCard.title}</h4>
        <p>{singleCard.description}</p>

    </div>
  )
}

export default Card