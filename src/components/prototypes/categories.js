import React, { useContext } from "react"
import { PrototypeContext } from "./prototypeContext"

export default function Categories() {
  const categoriesList = [
    { id: 1, name: 'Боевые' },
    { id: 2, name: 'Помощники' },
    { id: 3, name: 'Протезы' },
    { id: 4, name: 'Все' }
  ]

  return (
    <div className="categories">
      {categoriesList.map(cat => {
        return <Category cat={cat} key={cat.id} />
      })}
    </div>
  )
}

function Category({ cat }) {
  let prototypeContext = useContext(PrototypeContext)

  return (
    <button className="category" onClick={() => prototypeContext.onItemsArrChangeCategory(cat.name)}>
      {cat.name}
    </button>
  )
}
