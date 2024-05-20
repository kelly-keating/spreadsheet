const data = initData()
const setData = (row, col, val) => data[row - 1][col] = val
const getData = (row, col) => data[row - 1][col]

function handleSelect(elem) {
  const [row, col] = elem.id.split("-")
  const currentVal = getData(row, col)
  
  const isActive = elem.classList.contains("active")

  if (!isActive) {
    elem.classList.toggle("active")
    const submitFn = `handleSubmit(this, '${row}', '${col}'); return false`   // return false prevents default submit
    elem.innerHTML = `
      <form onsubmit="${submitFn}" onfocusout="${submitFn}">
        <input id="${row}-${col}_input" type="text" />
      </form>
    `

    const input = document.getElementById(row + "-" + col + "_input")
    input.focus()
    input.value = currentVal
  }
}

function handleSubmit(elem, row, col) {
  const inputStr = elem[0].value
  setData(row, col, inputStr)
  
  const cell = document.getElementById(row + "-" + col)
  cell.classList.remove("active")
  cell.innerHTML = inputStr
}

function refresh() {
  createBoard(100)
}
