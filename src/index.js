import './style.css'
import {knightMoves} from './logic'
//create auxiliary container, table (chessboard), functional button and
//para for communication with users
const container = document.createElement('div')
const table = document.createElement('table')
const button = document.createElement('button')
const para = document.createElement('p')
para.textContent = 'Choose knight"s start point'
button.textContent = 'GO!'
container.append(para, table, button)
//add all created elements to body
document.querySelector('body').appendChild(container)
//fill up table with cells
for (let i = 7; i >= 0; i--) {
    const row = document.createElement('tr')
    for (let j = 0; j < 8; j++) {
        const cell = document.createElement('td')
        //mark all cells with coordinates
        cell.dataset.x = j
        cell.dataset.y = i
        row.appendChild(cell)
    }
    table.appendChild(row)
}
//create arrays for storing coordinates of start and target points
const startPointStorage = []
const endPointStorage = []
//create function that responsible for choice start and target points
function chooseCells(cell) {
    cell.addEventListener('click', function () {
        //if storage for start point is empty then user can choose only start point
        if (!startPointStorage.length) {
            this.style.background = 'green'
            startPointStorage.push(+this.dataset.x, +this.dataset.y)
            para.textContent = 'Choose knight"s end point'
        }
        //otherwise user can choose only targe point...
        else {
            //...and if user points at one cell twice, programm ask to choose other one
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
//apply function chooseCells() for every cell
const cells = document.querySelectorAll('td')
for (const cell of cells) {
    chooseCells(cell)
}
//create function that rendering all needed steps for move from start point to target one
//cells with corresponding coordinates become green and get their own numbers
//also on display appear related string
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
//create function that after user press button calculate all steps with the help of function knightMoves()
//from file /logic.js. Then it launch function depictPath(steps) and user see final results
//also function create possibility to reload app and choose new start and target points just with the help of
//method reload()
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



