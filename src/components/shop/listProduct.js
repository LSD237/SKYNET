import React, { useContext } from "react"
import { ShopContext } from "./shopContext"

export default function ListProduct({ stateArrProducts }) {
  return (
    <div className="prototypes">
      {stateArrProducts.map(item =>
        <Product item={item} key={item.id} />
      )}
    </div>
  )
}

function Product({ item }) {
  let shopContext = useContext(ShopContext)

  function handleChangeF(target) {
    target.classList.toggle("btnFavorites")
    shopContext.changeCountFavorites(target.classList.value.includes("btnFavorites"))
  }

  function handleChangeC(target) {
    target.classList.toggle("btnCart")
    shopContext.changeCountCart(target.classList.value.includes("btnCart"))
  }

  return (
    <div className="prototype">
      <img src={item.img}></img>
      <div className="prototypeWrapButtons">
        <button className="btnPrototype" onClick={e => handleChangeF(e.target)}>Избранное</button>
        <button className="btnPrototype" onClick={e => handleChangeC(e.target)}>Корзина</button>
      </div>
      <p>{item.name}</p>
      <p>{item.cost}$</p>
    </div>
  )
}