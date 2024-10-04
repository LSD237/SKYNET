import React from "react"

export default function ItemsList(props) {

  return (
    <div className="prototypes">
      {props.itemsArr.map(item => {
        return <Item item={item} key={item.id} />
      })}
    </div>
  )
}

function Item({ item }) {
  return (
    <div className="prototype">
      <img src={item.img}></img>
      <p>{item.name}</p>
    </div>
  )
}