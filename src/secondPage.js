import '@styles/scss/styles.scss'

import Chart from 'chart.js/auto'
import { getRelativePosition } from 'chart.js/helpers'


//*подсветка текущей страницы (в хэдэре)
const doc = window.document
const linksCount = doc.links.length
for (let i = 0; i < linksCount; i++)
  if (doc.URL.startsWith(doc.links[i].href))
    doc.links[i].classList.add('header__link_active')

//*Диаграмма(разноцветная/кольцевая)
function drawPieSlice(ctx, centerX, centerY, radius, startAngel, endAngel, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.arc(centerX, centerY, radius, startAngel, endAngel)
  ctx.closePath()
  ctx.fill()
}

let Piechart = function (options) {
  this.options = options
  this.canvas = options.canvas
  this.ctx = this.canvas.getContext('2d')
  this.colors = options.colors
  // this.canvas.width = 220
  // this.canvas.height = 220
  this.canvas.width = options.size
  this.canvas.height = options.size
  this.years = options.years
  this.selectorForBlocks = options.selectorForBlocks
  this.selectorForYears = options.selectorForYears
  this.selectorForPercent = options.selectorForPercent
  this.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    let blocksyears = document.querySelectorAll('.pageStat__box-header')
    for (const i of blocksyears) { i.parentNode.removeChild(i) }
  }

  this.draw = function () {
    let total_value = 0
    let color_index = 0
    for (const categ in this.options.data) {
      let val = this.options.data[categ]
      total_value += val
    }

    let start_angel = 0
    for (const categ in this.options.data) {
      let val = this.options.data[categ]
      let slice_angle = 2 * Math.PI * val / total_value

      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        start_angel,
        start_angel + slice_angle,
        this.colors[color_index % this.colors.length]
      )

      start_angel += slice_angle
      color_index++
    }

    //Елси передан этот параметр то получится понкик, а не пицца
    if (this.options.doughnutHoleSize) {
      drawPieSlice( //рисует внутри пиццы круг
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.options.doughnutHoleSize * Math.min(this.canvas.width / 2, this.canvas.height / 2),
        0,
        2 * Math.PI,
        "#252525" //цвет круга-дыры внутри пончика
      )
    }

    //Легенды диаграммы
    if (this.options.legend) {
      let index = 0
      let legendHTML = document.createElement('div')
      for (let categ in this.options.data) {
        legendHTML.insertAdjacentHTML('beforeend', `
        <div class="pageStat__colorful-points">
          <div class="pageStat__colored-point" style='background-color:${this.colors[index]};'></div>
          <p class="pageStat__pointP">${categ}</p>
          <div class="${this.selectorForPercent}${index}"></div>
        </div>
        `)
        document.querySelector(`.${this.selectorForBlocks}${index}`).insertAdjacentHTML('afterbegin', `${this.options.data[categ]}`) //Выводит числа для категорий в соседних блоках
        index++
      }
      this.options.legend.innerHTML = legendHTML.innerHTML
    }

    //Легенды диаграммы 3х-блоков
    if (this.options.years) {
      let index = 0
      // let blocks = document.querySelectorAll(`.year`)
      let blocks = document.querySelectorAll(`.${this.selectorForYears}`)

      for (let categ in this.options.data) {
        blocks[index].insertAdjacentHTML('afterbegin', `
          <div class="pageStat__box-header">
            <h3 class="pageStat__sex">${categ}</h3>
            <p class="pageStat__date">${this.years}</p>
          </div>
        `)
        index++
      }
    }

    //расчет процентов каждой категории
    let percentages = []
    for (let categ in this.options.data) {
      let val = this.options.data[categ]
      let percent = Math.round(100 * val / total_value)
      if (isNaN(percent)) {
        percent = 0
      }
      percentages.push(percent)
    }

    //выведение процентов в легендах диаграммы
    for (let i = 0; i < 3; i++) {
      // const element = document.querySelector(`.percent${i}`)
      const element = document.querySelector(`.${this.selectorForPercent}${i}`)
      element.insertAdjacentHTML('afterbegin', `${percentages[i]}%`)
    }
  }
}

let clearingBlocks = function (DoughnutChartName, canvasF, legendF) {
  let blocks = document.getElementsByClassName('pageStat__number')
  for (const i of blocks) { i.innerHTML = '' }

  DoughnutChartName.clear()
  canvasF.innerHTML = ''
  legendF.innerHTML = ''
}

let redrawing = function (index, canvasF, size, dataF, legendF, yearsF, selectorForBlocks, selectorForYears, selectorForPercent, colors) {
  let newDoughnutChart = new Piechart(
    {
      canvas: canvasF,
      data: dataF[index],
      colors: colors,
      doughnutHoleSize: 0.6, //размер дыры внутри пончика
      legend: legendF,
      years: yearsF[index],
      selectorForBlocks: selectorForBlocks,
      selectorForYears: selectorForYears,
      selectorForPercent: selectorForPercent,
      size: size
    }
  )
  newDoughnutChart.draw()
}

let redrawingForTwoLast = function (selector, categs, categsNumbers) {
  let blocks = document.querySelectorAll(selector)
  for (const i of blocks) { i.innerHTML = '' }

  for (let i = 0; i < 3; i++) {
    blocks[i].insertAdjacentHTML('afterbegin', `
      <div class="pageStat__box-header">
        <h3 class="pageStat__sex">${categs[i]}</h3>
      </div>
      <p class="pageStat__number">${categsNumbers[i]}</p>
    `)
  }
}

let sizeDoughnut = 220
let ticksY = { color: '#f0eeee' }

//смена значения переменной для отрисовки бублика на экране поменьше
const mediaQuery = window.matchMedia('(max-width:575px)')

if (mediaQuery.matches) {
  sizeDoughnut = 150
  ticksY.display = false
}

let findPointAndChengeStat = function (DoughnutChartName, canvasF, dataF, legendF, yearsF, x, y, selectorForBlocks, selectorForYears, selectorForPercent, chartCoordinates, colors) {
  if (x == 0 && (y >= chartCoordinates[0] && y <= chartCoordinates[1])) {
    clearingBlocks(DoughnutChartName, canvasF, legendF)
    redrawing(0, canvasF, sizeDoughnut, dataF, legendF, yearsF, selectorForBlocks, selectorForYears, selectorForPercent, colors)
  } else if (x == 1 && (y >= chartCoordinates[2] && y <= chartCoordinates[3])) {
    clearingBlocks(DoughnutChartName, canvasF, legendF)
    redrawing(1, canvasF, sizeDoughnut, dataF, legendF, yearsF, selectorForBlocks, selectorForYears, selectorForPercent, colors)
  } else if (x == 2 && (y >= chartCoordinates[4] && y <= chartCoordinates[5])) {
    clearingBlocks(DoughnutChartName, canvasF, legendF)
    redrawing(2, canvasF, sizeDoughnut, dataF, legendF, yearsF, selectorForBlocks, selectorForYears, selectorForPercent, colors)
  } else if (x == 3 && (y >= chartCoordinates[6] && y <= chartCoordinates[7])) {
    clearingBlocks(DoughnutChartName, canvasF, legendF)
    redrawing(3, canvasF, sizeDoughnut, dataF, legendF, yearsF, selectorForBlocks, selectorForYears, selectorForPercent, colors)
  } else if (x == 4 && (y >= chartCoordinates[8] && y <= chartCoordinates[9])) {
    clearingBlocks(DoughnutChartName, canvasF, legendF)
    redrawing(4, canvasF, sizeDoughnut, dataF, legendF, yearsF, selectorForBlocks, selectorForYears, selectorForPercent, colors)
  }
}

let catHP1951 = {
  "Мужчины": 1538405526,
  "Женщины": 1078239079,
  "Дети": 605548201
}
let catHP1984 = {
  "Мужчины": 1838405526,
  "Женщины": 1678239079,
  "Дети": 1005548201
}
let catHP2022 = {
  "Мужчины": 3038405526,
  "Женщины": 2978239079,
  "Дети": 2005548201
}
let catHP2029 = {
  "Мужчины": 3123771385,
  "Женщины": 3123771385,
  "Дети": 2205548201
}
let catHP2045 = {
  "Мужчины": 1078239079,
  "Женщины": 431295631,
  "Дети": 37225632
}

let catHP = [catHP1951, catHP1984, catHP2022, catHP2029, catHP2045]

const labels = [
  '1951',
  '1984',
  '2022',
  '2029',
  '2045',
]

let myCanvas = document.getElementById("circle")
let myLegend = document.getElementById('myLegend')

let colorsHP = ["#a08efa", "#93fd9e", "#ffce61"]

let myDoughnutChart = new Piechart(
  {
    canvas: myCanvas,
    data: catHP[2],
    colors: colorsHP,
    doughnutHoleSize: 0.6, //размер дыры внутри пончика
    legend: myLegend,
    years: labels[2],
    selectorForBlocks: 'number',
    selectorForYears: 'yearH',
    selectorForPercent: 'percentH',
    size: sizeDoughnut
  }
)
myDoughnutChart.draw()

let chartCoordinatesOne = {
  0: 2440000000,
  1: 2700000000,
  2: 4600000000,
  3: 4900000000,
  4: 7800000000,
  5: 8200000000,
  6: 8250000000,
  7: 8600000000,
  8: 1900000000,
  9: 2150000000
}

let forLinearGraphicOne = [2560406604, 4743637344, 8022192807, 8453090972, 2005548201]

const data = {
  labels: labels,
  datasets: [{
    data: forLinearGraphicOne,
  }]
}

const config = {
  type: 'line',
  data: data,
  options: {
    maintainAspectRatio: false, //отзывчивость
    scales: {
      x: {
        ticks: { color: '#f0eeee' }
      },
      y: {
        // ticks: { color: '#f0eeee' }
        ticks: ticksY
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Популяция людей',
        color: '#f0eeee',
        font: {
          size: 16
        }
      },
      legend: {
        display: false,
      }
    },
    onClick: (e) => {
      const canvasPosition = getRelativePosition(e, myChart)
      const dataX = myChart.scales.x.getValueForPixel(canvasPosition.x)
      const dataY = myChart.scales.y.getValueForPixel(canvasPosition.y)
      findPointAndChengeStat(myDoughnutChart, myCanvas, catHP, myLegend, labels, dataX, dataY, 'number', 'yearH', 'percentH', chartCoordinatesOne, colorsHP)
    },
    elements: {
      line: {
        tension: 0.3,
        fill: {
          target: 'origin',
          above: '#3838616b',
        },
        borderColor: '#7170c7',
        // borderWidth: 3
      },
      point: {
        backgroundColor: '#f098fe',
        // borderColor: "#f098fe",
        radius: 4,
        borderWidth: 0,
        hoverRadius: 10,
        // hoverBorderWidth: 2
      }
    },
    layout: {
      padding: {
        top: 0,
        right: 25,
        bottom: 10,
        left: 10
      }
    }
  }
}

const myChart = new Chart(
  document.getElementById('myChart'),
  config
)

//////////////////////////////////////////*
let catNoR1951 = {
  "Промышленные": 0,
  "Боевые": 0,
  "Киборги": 0
}

let catNoR1984 = {
  "Промышленные": 15000,
  "Боевые": 881,
  "Киборги": 0
}

let catNoR2022 = {
  "Промышленные": 3402526,
  "Боевые": 425315,
  "Киборги": 8
}

let catNoR2029 = {
  "Промышленные": 81660624,
  "Боевые": 14207560,
  "Киборги": 19232
}

let catNoR2045 = {
  "Промышленные": 4572994944,
  "Боевые": 3071623360,
  "Киборги": 76992311
}

let catNoR = [catNoR1951, catNoR1984, catNoR2022, catNoR2029, catNoR2045]

let myCanvas2 = document.getElementById("circle2")
let myLegend2 = document.getElementById('myLegend2')

// let colorsNoR = ["#72378D", "#7A0110", "#ffce61"]
let colorsNoR = ["#FB8B24", "#9A031E", "#5F0F40"]
let myDoughnutChart2 = new Piechart(
  {
    canvas: myCanvas2,
    data: catNoR[2],
    // colors: ["#a08efa", "#93fd9e", "#ffce61"],
    colors: colorsNoR,
    doughnutHoleSize: 0.6, //размер дыры внутри пончика
    legend: myLegend2,
    years: labels[2],
    selectorForBlocks: 'robB',
    selectorForYears: 'yearR',
    selectorForPercent: 'percentR',
    size: sizeDoughnut
  }
)
myDoughnutChart2.draw()

let chartCoordinatesTwo = {
  0: -186507937,
  1: 210317460,
  2: -186507937,
  3: 210317460,
  4: -186507937,
  5: 210317460,
  6: -87301587,
  7: 289683539,
  8: 4952380952,
  9: 5349206349
}
let forLinearGraphicTwo = [0, 15881, 3827849, 91887416, 5144695296]
const data2 = {
  labels: labels,
  datasets: [{
    // data: [2560406604, 4743637344, 8022192807, 8453090972, 2005548201],
    data: forLinearGraphicTwo,
  }]
}
const config2 = {
  type: 'line',
  data: data2,
  options: {
    maintainAspectRatio: false, //отзывчивость
    scales: {
      x: {
        ticks: { color: '#f0eeee' }
      },
      y: {
        // ticks: { color: '#f0eeee' }
        ticks: ticksY
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Численность роботов',
        color: '#f0eeee',
        font: {
          size: 16
        }
      },
      legend: {
        display: false,
      }
    },
    onClick: (e) => {
      const canvasPosition = getRelativePosition(e, myChart2)
      const dataX = myChart2.scales.x.getValueForPixel(canvasPosition.x)
      const dataY = myChart2.scales.y.getValueForPixel(canvasPosition.y)
      findPointAndChengeStat(myDoughnutChart2, myCanvas2, catNoR, myLegend2, labels, dataX, dataY, 'robB', 'yearR', 'percentR', chartCoordinatesTwo, colorsNoR)
    },
    elements: {
      line: {
        tension: 0.3,
        fill: {
          target: 'origin',
          above: '#5b2f377a',
        },
        borderColor: '#800F2F',
      },
      point: {
        // backgroundColor: '#f098fe',
        backgroundColor: '#C9184A',
        // borderColor: "#f098fe",
        radius: 4,
        borderWidth: 0,
        hoverRadius: 10,
      }
    },
    layout: {
      padding: {
        top: 0,
        right: 25,
        bottom: 10,
        left: 10
      }
    }
  }
}

const myChart2 = new Chart(
  document.getElementById('myChart2'),
  config2
)

//////////////////////////*3
const labelsHA = [
  '8 в.н.э.',
  '14 в.',
  '13-15 вв.',
  '1616-1662',
  '1850-1864',
  '1914-1918',
  '1939-1945',
]
const labelsHAdop = [
  'Восстание Ай Лушаня',
  'Войны Тамерлана',
  'Войны Монгольской империи',
  'Захват Китая маньчжурской династией',
  'Восстание тайпинов',
  'Первая мировая война',
  'Вторая мировая война'
]
let forLinearGraphicThree = [13, 15, 30, 25, 20, 15, 40]

const categsHA = ['Деградирующие', 'Развивающиеся', 'Переобразованно']

const categsNumbersHA = ['97%', '1.999%', '0.001%']

const data3 = {
  labels: labelsHA,
  datasets: [{
    data: forLinearGraphicThree,
    backgroundColor: [
      '#4CC9F05c',
      '#4361EE5c',
      '#B5179E5c',
      '#7209B75c',
      '#3F37C95c',
      '#4895EF5c',
      '#F725855c',
    ],
    borderColor: [
      '#4CC9F0',
      '#4361EE',
      '#B5179E',
      '#7209B7',
      '#3F37C9',
      '#4895EF',
      '#F72585',
    ],
    borderWidth: 1
  }]
}
const config3 = {
  type: 'bar',
  data: data3,
  options: {
    maintainAspectRatio: false, //отзывчивость
    scales: {
      x: {
        ticks: { color: '#f0eeee' }
      },
      y: {
        ticks: { color: '#f0eeee' }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              // label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
              label += `${labelsHAdop[context.parsed.x]}:\n ${context.parsed.y} млн. погибших`
            }
            return label;
          }
        }
      },
      title: {
        display: true,
        text: 'Достижения людей',
        color: '#f0eeee',
        font: {
          size: 16
        }
      },
      legend: {
        display: false,
      }
    },
    layout: {
      padding: {
        top: 0,
        right: 25,
        bottom: 10,
        left: 10
      }
    }
  }
}

const myChart3 = new Chart(
  document.getElementById('myChart3'),
  config3
)
//////////////////////////*4
const labelsRA = [
  'Медицина',
  'Производство',
  'Наука',
  'Образование',
  'Безопасность'
]

const categsRA = ['Деградирующие', 'Развивающиеся', 'Иные']

const categsNumbersRA = ['0%', '100%', '0']

const data4 = {
  labels: labelsRA,
  datasets: [{
    data: [240, 300, 210, 140, 180],
  }]
}

const config4 = {
  type: 'polarArea',
  data: data4,
  options: {
    maintainAspectRatio: false, //отзывчивость
    elements: {
      arc: {
        backgroundColor: [
          '#b30000e3',
          '#303b6ee3',
          '#6b1973e3',
          '#fb8b24e3',
          '#411b5ae3',
        ],
        borderWidth: 0,
      }
    },
    animation: {
      duration: 2000,
      animateScale: true
    },
    scales: {
      r: {
        ticks: {
          backdropColor: 'transparent',
          color: 'white'
        },
        grid: {
          // color: "#FB8B2430"
          color: "grey"
        },
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Влияние робототехники (2022г.)',
        color: '#f0eeee',
        font: {
          size: 16
        }
      },
      legend: {
        display: false,
        // position: 'left',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${labelsRA[context.dataIndex]}: ${context.raw} у.е.`
            }
            return label;
          }
        }
      },
    },
    layout: {
      padding: {
        top: 0,
        right: 25,
        bottom: 10,
        left: 10
      }
    }
  }
}

const myChart4 = new Chart(
  document.getElementById('myChart4'),
  config4
)

//*Бургер
const sideToggle = document.querySelector('.js-side__toggle')
const side = document.querySelector('.js-side')
const pageStatBlock = document.querySelectorAll('.js-pageStat')

sideToggle.addEventListener('click', () => {
  side.classList.toggle('minify')
  pageStatBlock.forEach(el => {
    el.classList.toggle('minifyPS')
  })
})

//* Nav sidebar (переключение стр-ц со статистикой по нажатию на эл-ты навигации)
const navList = document.querySelector('.nav__list')
const arrayLinks = navList.querySelectorAll('.js-nav__list-link')
const arrayPages = document.querySelectorAll('.pageStat')

arrayLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    arrayLinks.forEach(i => {
      i.classList.remove('active')
    })
    link.classList.add('active')

    arrayPages.forEach(i => {
      let id = i.classList[2] //выбирается класс 'HumPop', 'NumOfRob', 'HumAch' или'RobAch'

      if (event.target.closest(".active").dataset.id == id) {
        i.style.display = 'block'
        switch (id) {
          case 'HumPop':
            clearingBlocks(myDoughnutChart, myCanvas, myLegend)
            redrawing(2, myCanvas, sizeDoughnut, catHP, myLegend, labels, 'number', 'yearH', 'percentH', colorsHP)
            break
          case 'NumOfRob':
            clearingBlocks(myDoughnutChart2, myCanvas2, myLegend2)
            redrawing(2, myCanvas2, sizeDoughnut, catNoR, myLegend2, labels, 'robB', 'yearR', 'percentR', colorsNoR)
            break
          case 'HumAch':
            redrawingForTwoLast('.yearHA', categsHA, categsNumbersHA)
            break
          case 'RobAch':
            redrawingForTwoLast('.yearRA', categsRA, categsNumbersRA)
            break
        }
      } else {
        i.style.display = 'none'
      }
    })
  })
})

//Фикс блока PZ, что бы при ресайзе убирались имена у картинок (что бы увидеть-перезагрузи)
let widthBlockPZ = document.querySelector('.pageStat__grid-pz').offsetWidth

if (widthBlockPZ < 320) {
  let elms = document.querySelectorAll('.pageStat__PhotoMosaic-figcaption')
  elms.forEach(el => {
    el.style.display = 'none'
    el.parentNode.style.width = '50px'
  })
}
