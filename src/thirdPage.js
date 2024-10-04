import '@styles/scss/stylesThirdPage.scss'
import React from 'react';
import { createRoot } from 'react-dom/client';
import PrototypesReact from './components/prototypes/PrototypesReact';
import RoboShop from './components/shop/RoboShop';

//*подсветка текущей страницы (в хэдэре)
const doc = window.document
const linksCount = doc.links.length
for (let i = 0; i < linksCount; i++)
  if (doc.URL.startsWith(doc.links[i].href))
    doc.links[i].classList.add('header__link_active')

//*React
const root = createRoot(document.getElementById('navigation'));
root.render(
  <React.StrictMode>
    <PrototypesReact />
    <RoboShop />
  </React.StrictMode>
);