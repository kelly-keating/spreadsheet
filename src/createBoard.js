function createBoard(size) {
  const root = document.getElementsByClassName("grid_container")[0]
  let entireTable = "<table>"
  for(let row = 0; row <= size; row++) {
    entireTable += getRow(row, size)
  }
  entireTable += "</table>"
  root.innerHTML = entireTable
}

function getRow(row, size) {
  let entireRow = "<tr>"
  for (let col = 0; col <= size; col++) {
    entireRow += getCell(row, col);
  }
  entireRow += "</tr>"
  return entireRow
}

function getCell(row, col) {
  const colKey = numToKey(col)

  if (row == 0 && col == 0) return '<th class="heading_col heading_row"></th>'
  if (row == 0) return `<th class="heading_col">${colKey}</th>`
  if (col == 0) return `<th class="heading_row">${row}</th>`

  return `<td class="cell" id="${row}-${colKey}" onclick="handleSelect(this)"></td>`
}

createBoard(100)
