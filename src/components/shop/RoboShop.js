import React, { useState } from "react"
import ListProduct from "./listProduct"
import SerchBarShop from "./serchBarShop"
import ListStorages from "./listStorages.js"
import { ShopContext } from "./shopContext"

export default function RoboShop() {
  const arrProducts = [
    { id: 1, name: 'Дубина', cost: 100, img: './assets/Images/thirdPage/Дубина.png' },
    { id: 2, name: 'Джефф', cost: 200, img: './assets/Images/secondPage/myPhoto/Djeff.jpg' },
    { id: 3, name: 'Родни', cost: 300, img: './assets/Images/secondPage/myPhoto/Rodny.jpg' },
  ]
  const [stateArrProducts, setStateArrProducts] = useState(arrProducts)
  function changeArrProducts(value) {
    setStateArrProducts(arrProducts.filter(i => i.name.includes(value)))
  }

  const [stateCountFavorites, setStateCountFavorites] = useState(0)
  function changeCountFavorites(value) {
    value ? setStateCountFavorites(stateCountFavorites + 1) : setStateCountFavorites(stateCountFavorites - 1)
  }

  const [stateCountCart, setStateCountCart] = useState(0)
  function changeCountCart(value) {
    value ? setStateCountCart(stateCountCart + 1) : setStateCountCart(stateCountCart - 1)
  }

  return (
    <>
      <ShopContext.Provider value={{ changeCountFavorites, changeCountCart }}>
        <SerchBarShop changeArrProducts={changeArrProducts} />
        <ListStorages stateCountFavorites={stateCountFavorites} stateCountCart={stateCountCart} />
        <ListProduct stateArrProducts={stateArrProducts} />
      </ShopContext.Provider>
    </>
  )
}
