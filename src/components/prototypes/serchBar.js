import React from "react"

export default function SerchBar({ onItemsArrChange }) {
  return (
    <form className="serchBar">
      <input type="text" onChange={e => onItemsArrChange(e.target.value)} placeholder="Введите название прототипа"></input>
    </form>
  )
}