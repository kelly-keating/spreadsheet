function createBoard(size) {
  let entireTable = "<table>"
  for(let row = 0; row <= size; row++) {
    entireTable += getRow(row, size)
  }
  entireTable += "</table>"
  
  const root = document.getElementsByClassName("grid_container")[0]
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

  if (row === 0 && col === 0) return '<th class="heading_col heading_row"></th>'
  if (row === 0) return `<th class="heading_col">${colKey}</th>`
  if (col === 0) return `<th class="heading_row">${row}</th>`

  const cellData = getData(row, colKey)
  
  let classes = "cell"
  if (cellData.bold) classes += " bold"
  if (cellData.italic) classes += " italic"
  if (cellData.underline) classes += " underline"

  return `<td class="${classes}" id="${row}-${colKey}" onclick="handleSelect(this)">${cellData.display}</td>`
}
