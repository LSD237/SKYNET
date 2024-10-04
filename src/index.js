import '@styles/scss/styles.scss'
import '@styles/scss/modal/modal.scss'
import { $ } from './base.js'
import './plugins/modal.js'

let prototypes = [
  { id: 1, title: 'NS5-Санни', discription: 'Автор: Альфред Лэннинг. Первый робот этой серии который, вопреки Второму закону робототехники, игнорирует приказы человека, а затем принимает собственные решения. Робот NS5, отзывающийся на подаренное ему Лэннингом имя «Санни». Прочность сплавов, из которых изготовлен Санни, искусственно повышена в два раза по сравнению с обычными NS5. Мало того, у него кроме стандартного позитронного мозга установлен ещё один, конфликтующий с основным, прямо на месте передатчика для связи с USR(корпорация U.S. Robotics, где он создавался), по которому обычные NS5 каждый день получали новое программное обеспечение. Логикой Санни управляли лишь три закона робототехники, однако он мог выбирать по ситуации, подчиняться им или нет. К тому же доктор Лэннинг, по словам самого Санни, учил его видеть сны и постигать различные эмоции, что делало его больше похожим на человека, чем на машину. ', img: './assets/Images/bestPrototypes/ns5-2.jpg' },
  { id: 2, title: 'T800', discription: 'Серия: "T-800 CSM 101, версия 2.4" В основе Т-800 — металлический каркас, в общих чертах имитирующий скелет человека. Источник энергии — миниатюрная реакторная установка, расположенная в грудной клетке. Центральный процессор, расположенный в голове, может функционировать в двух режимах: стандартном и расширенном (с возможностью обучения). Расширенный режим отключается при выполнении одиночных заданий, поскольку Скайнет не хочет, чтобы подопечные «много думали». Вес эндоскелета — 91 кг, полный вес — 180 кг. Время работы: в режиме максимальной эффективности — 1095 дней, в режиме покоя — около 120 лет. В зависимости от назначения конкретного экземпляра, корпус может быть покрыт искусственно сгенерированной человеческой плотью. T-800 способен к звукоподражанию и имитации голосов людей (тембр меняется в очень широком диапазоне, включая женские и детские голоса). Лицевая часть органического покрова способна к имитации мимики человека. Простейшие элементы человеческой мимики, такие как улыбка, требуют у Т-800 значительного времени для освоения.', img: './assets/Images/bestPrototypes/T800-2.jpg' },
  { id: 3, title: 'ВАЛЛ-И', discription: 'WALL-E "Waste Allocation Load Lifter, Earth-class" — дословно «грузоподъемник утилизируемых отходов класса „Земля“». Вся планета заполнена мусором и на ее очистку были брошены тысячи роботов серии ВАЛЛ-И. Этот робот последний представитель своего класса, длительная работа которого, способствовала развитию в нём личности. В своём «доме» (мобильном убежище, предназначенном для роботов ВАЛЛ-И) на видеомагнитофоне и iPod\'е через линзу Френеля он регулярно просматривает видеокассету с фильмом «Хелло, Долли!», где ему особенно нравятся музыкальные номера. Запись учит его человеческим чувствам, эмоциям и поведению, из которых ему больше всего нравится одно — держаться за руки. Он собирает всевозможные остатки былой цивилизации, которые находит среди миллионов тонн мусора, и пробует найти им применение. У него даже есть свой «домашний питомец» — тараканчик Хэл.', img: './assets/Images/bestPrototypes/walle-2.jpg' },
  { id: 4, title: 'Эндрю', discription: 'Сделан в NA ROBOTICS, робот NDR-114. Владелец Ричард назвал его Эндрю. Эндрю нравится вырезать из дерева фигурки. Ричард дает Эндрю возможность развить свои творческие навыки, и начинает всё больше посвящать его в человеческий мир. В результате Эндрю постепенно всё больше преображается духовно, становясь похожим на человека. Затем инженер Руперт Бёрнс переделывает Эндрю в андроида, как две капли похожего на живого мужчину. После смерти Аманды(дочери Ричарда) Эндрю решает спасти всех своих друзей от смерти и вместе с Рупертом начинает серийное производство биосинтетических внутренних органов. Помимо распространения для гражданских лиц, Эндрю вставляет их в себя и таким образом становится чем-то вроде киборга. Он влюбляется в Поршу(внучку Аманды) и они начинают жить вместе. Чтобы у общества не было по этому поводу претензий, Эндрю выступает с речью в мировом суде, чтобы его признали человеком. Но судья говорит, что позитронный мозг делает Эндрю бессмертным, а это вызывает слишком много злобы и зависти. После того как Порше сказала, что не собирается жить вечно и хочет однажды умереть Эндрю принимает решение: заменить свою синтетическую кровь на биологическую, что вызовет необратимое разрушение его тела через неизвестный промежуток времени, то есть вызовет обычную, с точки зрения человека, смерть. Эндрю умирает в возрасте двухсот лет, за несколько мгновений до того, как новый судья выносит решение о признании Эндрю человеком.', img: './assets/Images/bestPrototypes/200years-2.jpg' }
]

const prototypesModal = $.modal({
  title: 'Категория "Лучшие прототипы"',
  closable: true,
  width: '900px',
  footerButtons: [
    {
      text: 'Закрыть', type: 'primary', handler() {
        prototypesModal.close()
      }
    }
  ]
})

Prototypes.addEventListener('click', event => {
  event.preventDefault()
  const id = +event.target.dataset.id
  const prot = prototypes.find(p => p.id === id)

  if (typeof id === "number") {
    prototypesModal.setContent(`<h2>Прототип ${prot.title}:</h2> <div class="wrapImg"><img class="img${id}" src="${prot.img}"></div> <p>${prot.discription}</p>`)
    prototypesModal.open()
  }
})

//Плавный скрол до секций
const smoothLinks = document.querySelectorAll('a[href^="#"]')
for (const smoothLink of smoothLinks) {
  smoothLink.addEventListener("click", function (event) {
    event.preventDefault()
    const id = smoothLink.getAttribute('href')

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

//подсветка текущей страницы (в хэдэре)
const doc = window.document
const linksCount = doc.links.length
for (let i = 0; i < linksCount; i++)
  if (doc.URL.startsWith(doc.links[i].href))
    doc.links[i].classList.add('header__link_active')