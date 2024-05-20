const data = initData()
const setData = (row, col, val) => data[col + row] = val
const getData = (row, col) => data[col + row]

function handleSelect(elem) {
  const [row, col] = elem.id.split("-")
  const currentVal = getData(row, col).input
  
  const isActive = elem.classList.contains("active")

  if (!isActive) {
    elem.classList.toggle("active")
    const submitFn = `handleSubmit(this, '${row}', '${col}'); return false` // return false prevents default submit
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
  const input = elem[0].value.replace(/\s+/g, '').toUpperCase()
  const dataObj = {
    input,
    display: "",
  }

  if (isNumber(input)) {
    dataObj.display = input
  } else if (isSimpleRef(input)) {
    const ref = input.replace("=", "")
    dataObj.display = data[ref].display
  } else {
    dataObj.display = "#ERR invalid input"
  }
  setData(row, col, dataObj)

  const cell = document.getElementById(row + "-" + col)
  cell.classList.remove("active")
  cell.innerHTML = dataObj.display
}

function isNumber(n) {
  return !isNaN(n)
}
function isSimpleRef(str) {
  const [gap, ref, ...theRest] = str.split("=")
  return gap === "" && Boolean(data[ref]) && theRest.length === 0
}

function refresh() {
  createBoard(100)
}
