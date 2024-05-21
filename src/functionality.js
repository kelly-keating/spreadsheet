let activeCell = null

function handleSelect(elem) {
  if (activeCell !== elem.id) {
    if (activeCell) deactivate(activeCell)

    activeCell = elem.id
    elem.classList.add("active")
  } else {
    activateInput(elem.id, elem)
  }
}

function activateInput (id, elem) {
  const [row, col] = id.split("-")
  if (!elem) elem = document.getElementById(id)

  const submitFn = (done) => `handleSubmit(this, '${row}', '${col}', ${done}); return false` // return false prevents default submit
  elem.innerHTML = `
    <form onsubmit="${submitFn(true)}" onfocusout="${submitFn(false)}">
      <input id="${id}_input" type="text" />
    </form>
  `

  const currentVal = getData(row, col).input
  const input = document.getElementById(id + "_input")
  input.focus()
  input.value = currentVal
}

function deactivate(id) {
  const currentCell = document.getElementById(id)
  currentCell.classList.remove("active")
  activeCell = null
}

function handleSubmit(elem, row, col, done) {
  const input = elem[0].value.replace(/\s+/g, '').toUpperCase()
  setData(row, col, { input })

  setDisplayValue(row, col)
  if (done) document.getElementById(row + "-" + col).classList.remove("active")
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
