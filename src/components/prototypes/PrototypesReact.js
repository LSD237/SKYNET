import React, { useState } from "react"
import SerchBar from "./serchBar"
import Categories from "./categories"
import ItemsList from "./ItemsList"
import { PrototypeContext } from "./prototypeContext"

export default function PrototypesReact() {
  let itemsArrDefault = [
    { id: 1, category: 'Боевые', name: 'Т-800', img: './assets/Images/bestPrototypes/T800-2.jpg' },
    { id: 2, category: 'Помощники', name: 'Эндрю', img: './assets/Images/bestPrototypes/200years-2.jpg' },
    { id: 3, category: 'Помощники', name: 'ВАЛЛ-И', img: './assets/Images/bestPrototypes/walle-2.jpg' },
    { id: 4, category: 'Помощники', name: 'NS5-Санни', img: './assets/Images/bestPrototypes/ns5-2.jpg' },
    { id: 5, category: 'Помощники', name: 'Бэймакс', img: './assets/Images/secondPage/myPhoto/Baymax.jpg' },
    { id: 6, category: 'Помощники', name: 'Чаппи', img: './assets/Images/secondPage/myPhoto/Chappie.jpg' },
    { id: 7, category: 'Помощники', name: 'Джефф', img: './assets/Images/secondPage/myPhoto/Djeff.jpg' },
    { id: 8, category: 'Боевые', name: '№5', img: './assets/Images/secondPage/myPhoto/№5.jpg' },
    { id: 9, category: 'Помощники', name: 'Родни', img: './assets/Images/secondPage/myPhoto/Rodny.jpg' },
    { id: 10, category: 'Боевые', name: 'Стальной гигант', img: './assets/Images/secondPage/myPhoto/StalnoyGigant.jpg' },
    { id: 11, category: 'Помощники', name: 'Ава', img: './assets/Images/thirdPage/Ава.jpg' },
    { id: 12, category: 'Помощники', name: 'Дубина', img: './assets/Images/thirdPage/Дубина.png' },
    { id: 13, category: 'Помощники', name: 'Дэвид', img: './assets/Images/thirdPage/Дэвид.jpg' },
    { id: 14, category: 'Помощники', name: 'C-3PO', img: './assets/Images/thirdPage/C-3PO.jpg' },
    { id: 15, category: 'Помощники', name: 'ЕВА', img: './assets/Images/thirdPage/Eva.png' },
    { id: 16, category: 'Помощники', name: 'R2-D2', img: './assets/Images/thirdPage/R2-D2.jpg' },
    { id: 17, category: 'Протезы', name: 'Robocop', img: './assets/Images/thirdPage/Robocop.jpg' },
    { id: 18, category: 'Боевые', name: 'Т-1000', img: './assets/Images/thirdPage/T-1000.jpg' },
    { id: 19, category: 'Протезы', name: 'Рука Дэла Спунера', img: './assets/Images/thirdPage/РукаДэлаСпунера.jpg' },
    { id: 20, category: 'Помощники', name: 'Атлас', img: './assets/Images/thirdPage/Атлас.png' },
  ]

  let [itemsArr, setItemsArr] = useState(itemsArrDefault)

  function onItemsArrChange(value) {
    setItemsArr(itemsArrDefault.filter(i => i.name.includes(value)))
  }

  function onItemsArrChangeCategory(value) {
    if (value == 'Все') {
      setItemsArr(itemsArrDefault)
    } else {
      setItemsArr(itemsArrDefault.filter(i => i.category == value))
    }
  }

  return (
    <>
      <PrototypeContext.Provider value={{ onItemsArrChangeCategory }}>
        <SerchBar onItemsArrChange={onItemsArrChange} />
        <Categories />
        <ItemsList itemsArr={itemsArr} />
      </PrototypeContext.Provider>
    </>
  )
}
