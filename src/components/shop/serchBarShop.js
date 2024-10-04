import React from "react"

export default function SerchBarShop({ changeArrProducts }) {
  return (
    <form className="serchBar">
      <input type="text" onChange={e => changeArrProducts(e.target.value)} placeholder="Название товара"></input>
    </form>
  )
}