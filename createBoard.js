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

  if (row == 0 && col == 0) return "<th></th>"
  if (row == 0) return `<th class="heading_col">${colKey}</th>`
  if (col == 0) return `<th class="heading_row">${row}</th>`

  return `<td class="cell" id="${row + colKey}">${row + colKey}</td>`
}

function numToKey(n) {
  const alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if (n < 27) return alpha[n]

  const ten = Math.floor((n - 1) / 26)
  const one = n % 26

  return alpha[ten] + (one == 0 ? "Z" : alpha[one])
}

createBoard(100)

// ------------------------------------
// --- numToKey is being a problem ----
// ------------------------------------

function test() {
  const fails = []

  const run = (val, expected) => {
    const actual = numToKey(val)
    if (actual !== expected) fails.push(`numToKey(${val}) returned ${actual}, but expected ${expected}`)
  }

  run(1, "A")
  run(26, "Z")
  run(27, "AA")
  run(28, "AB")
  run(51, "AY")
  run(52, "AZ")
  run(53, "BA")
  run(54, "BB")
  run(77, "BY")
  run(78, "BZ")
  run(79, "CA")
  run(80, "CB")

  if (fails.length) alert("ERROR: \n\n" + fails.join("\n"))
}

test()
