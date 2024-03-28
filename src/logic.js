//get all ajecent destination cells (or childs) from one current cell (or parent)
function getNextDestinations(current){
    return [
      [current[0] + 1, current[1] + 2],
      [current[0] + 2, current[1] + 1],
      [current[0] + 2, current[1] - 1],
      [current[0] + 1, current[1] - 2],
      [current[0] - 1, current[1] - 2],
      [current[0] - 2, current[1] - 1],
      [current[0] - 2, current[1] + 1],
      [current[0] - 1, current[1] + 2]
    ]
  }
  
  //check if cell is inside of 7x7 chessboard
  function isInside (cell) {
  if (cell[0] > -1 && cell[1] > -1 && cell[0] < 8 && cell[1] < 8) return true
  return false
  }
  
  const visited = []//create storage for already visited cells
  
  function isVisited (cell) {
    if (!visited.length) return false
    for (let elem of visited) {
      if (elem[0] === cell[0] && elem[1] === cell[1]) return true
    }
    return false
  }
  
  //create a graph with given start cell (current)
  function createGraph(current) {
    const graph = []//create array for graph
    visited.push(current)//put coordinates of initial cell to visited
    const queue = Array(current)//create queue and put to it initial cell
    while(queue.length) {//while queue is not empty...
      const array = [queue[0]]//create array for ajacent cells
      const destinations = getNextDestinations(queue[0])//get array with cells that ajacent to first element of queue
      for (const cell of destinations) {//loop through array with ajecent cells
        if (isInside(cell) && !isVisited (cell)) {//if cell is inside chessboard and absent in the store, that is not visited yet, then...
          array.push(cell)//...put that cell in array for graph 
          queue.push(cell)//put it to queue too
          visited.push(cell)//and make it visited by putting into array 'visited'
        }
      }
      graph.push(array)//add new array (ajacent sequence) to the graph
      queue.shift()//remove first element from queue
    }
    return graph//when queue is empty and loop is over return graph with all sequences
  }
  
  //get all knight moves from current cell to target one, both included
  function knightMoves (current, target) {
    if (checkInput(current, target)) return checkInput(current, target)
    const moves = []//create array for storing all moves
    let graph = createGraph(current)//create graph from current cell
    function fillMoves (endPoint) {//declare recursive function for filling array 'knightMoves'
      for (const array of graph) {//double loop for searching target cell
        for (const subarray of array) {
          if (subarray[0] === endPoint[0] && subarray[1] === endPoint[1] && array.indexOf(subarray)) {//conditions for target cell
            if (array[0][0] === current[0] && array[0][1] === current[1]) {//if we reach start (current) point then...
              moves.unshift(current)//in the begining array 'moves' add start point
              moves.push(target)//in the end array 'moves' add end point
              return//and function finalize its execution
            }
          //if we do not reach start (current) point yet then...
          moves.unshift(array[0])//add intermediate cell in fron of other elemts of array 'moves'
          fillMoves(array[0])//invoke function fillMoves() inside itself with intermediate cell as an argument
          }
        }
      } 
    }
    fillMoves(target)//make first invocation of the fillMoves() function and when it fill array 'moves' recusively...
    return moves//...return array 'moves' vith all needed moves
  }
  
  //check if the input data is arrays, that contain correct cordinates
  function checkInput (firstCell, secondCell) {
    if (!Array.isArray(firstCell) || !Array.isArray(secondCell)
    || firstCell[0] < 0 || secondCell[0] < 0 || firstCell[1] < 0 || secondCell[1] < 0
    || firstCell[0] > 7 || secondCell[0] > 7 || firstCell[1] > 7 || secondCell[1] > 7
    || !firstCell.length || !secondCell.length || !firstCell || !secondCell
    ) return 'starting and target cells must be arrays, his coordinates can not be greater then 7 and lesser then 0'
    else return false
  }
  
  //console.log(knightMoves([0,0], [7,7]))
  //output [[ 0, 0 ], [ 1, 2 ], [ 2, 4 ], [ 3, 6 ], [ 5, 7 ], [ 6, 5 ], [ 7, 7 ]]

  export {knightMoves}