const data = initData()
const getData = (row, col) => data[col + row]
const setData = (row, col, vals) => {
  const currentData = data[col + row]
  data[col + row] = {
    ...currentData,
    ...vals,
  }
}

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
  setData(row, col, { input })

  setDisplayValue(row, col)
  document.getElementById(row + "-" + col).classList.remove("active")
}

function setDisplayValue(row, col) {
  const input = getData(row, col).input
  let display = ""

  if (isNumber(input)) {
    display = input
  } else if (isSimpleRef(input)) {
    const ref = input.replace("=", "")
    display = data[ref].display
  } else if (isValidFormula(input)) {
    display = evalFormula(input)
  } else {
    display = "#ERR invalid input"
  }

  setData(row, col, { display })
  document.getElementById(row + "-" + col).innerHTML = display
}

function refresh() {
  createBoard(100)
}
