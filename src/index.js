import './style.css'
import {knightMoves} from './logic'
const container = document.createElement('div')
const table = document.createElement('table')
const button = document.createElement('button')
const para = document.createElement('p')
para.textContent = 'Choose knight"s start point'
button.textContent = 'GO!'
container.append(para, table, button)
document.querySelector('body').appendChild(container)
for (let i = 7; i >= 0; i--) {
    const row = document.createElement('tr')
    for (let j = 0; j < 8; j++) {
        const cell = document.createElement('td')
        cell.dataset.x = j
        cell.dataset.y = i
        row.appendChild(cell)
    }
    table.appendChild(row)
}

const startPointStorage = []
const endPointStorage = []

function chooseCells(cell) {
    cell.addEventListener('click', function () {
        if (!startPointStorage.length) {
            this.style.background = 'green'
            startPointStorage.push(+this.dataset.x, +this.dataset.y)
            para.textContent = 'Choose knight"s end point'
        }
        else {
            if (startPointStorage[0] === +this.dataset.x && startPointStorage[1] === +this.dataset.y)
                para.textContent = 'Choose other cell!'
            else if (!endPointStorage.length) {
                this.style.background = 'green'
                endPointStorage.push(+this.dataset.x, +this.dataset.y)
                para.textContent = 'Press button GO!'
            }
        }
    })
}

const cells = document.querySelectorAll('td')
for (const cell of cells) {
    chooseCells(cell)
}

function getSteps () {
    button.addEventListener('click', function () {
        if (startPointStorage.length && endPointStorage.length) {
        if (button.textContent === 'Do it again') {
            location.reload()
        }
        const steps = knightMoves(startPointStorage, endPointStorage)
        depictPath(steps)
        button.textContent = 'Do it again'
}
else para.textContent = 'You need to choose start point!'
})
}



getSteps ()


function depictPath (steps) {
let counter = 0
for (const step of steps) {
    for (const cell of cells) {
        if (cell.dataset.x == step[0] && cell.dataset.y == step[1]) {
            cell.style.background = 'green'
            cell.textContent = counter
            counter++
        }
    }
}
para.innerHTML = `You made it in ${counter - 1} moves!  Here is your path: `
for (const step of steps) {
    para.innerHTML += `[${step}] `
}


}



