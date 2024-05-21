let activeCell = null

function handleSelect(elem) {
  if (activeCell !== elem.id) {
    if (activeCell) deactivateCell(activeCell)

    activeCell = elem.id
    elem.classList.add("active")
    activateToolbar()
  } else {
    activateInput(elem.id, elem)
  }
}

function handleSubmit(elem, row, col) {
  setData(row, col, { error: null })
  const input = standardiseInput(elem[0].value)

  if (input !== getData(row, col).input) {
    setData(row, col, { input })
    rerender(row, col, [])
  } else {
    const currentDisplay = getData(row, col).display
    document.getElementById(row + "-" + col).innerHTML = currentDisplay
  }
}

// ----- DATA UPDATES -----

function rerender(row, col, updated) {
  console.log(row, col)
  if (updated.includes(col + row)) return // stop after loop updated
  const {input, referencedBy} = getData(row, col)
  let display = ""

  if (isNumber(input)) {
    updateRefs(col + row, [])
    display = input
  } else if (isSimpleFormula(input)) {
    display = evalFormula(input, col + row)
  } else {
    const error = "#ERR invalid input"
    setData(row, col, { error })
    display = error
  }

  setData(row, col, { display })
  updated.push(col + row)

  referencedBy.forEach(ref => rerender(data[ref].row, data[ref].col, updated))
  document.getElementById(row + "-" + col).innerHTML = display
}

// ----- STATE CHANGES -----

function activateInput (id, elem) {
  const [row, col] = id.split("-")
  if (!elem) elem = document.getElementById(id)

  const submitFn = `handleSubmit(this, '${row}', '${col}'); return false` // return false prevents default submit
  elem.innerHTML = `
    <form onsubmit="${submitFn}" onfocusout="${submitFn}">
      <input id="${id}_input" type="text" />
    </form>
  `

  const currentVal = getData(row, col).input
  const input = document.getElementById(id + "_input")
  input.focus()
  input.value = currentVal
}

function deactivateCell(id) {
  const currentCell = document.getElementById(id)
  currentCell.classList.remove("active")
  activeCell = null
}

function activateToolbar() {
  const buttons = document.querySelectorAll(".toolbar button")
  buttons.forEach(button => button.disabled = false)
}

function setStyle(style) {
  const elem = document.getElementById(activeCell)
  elem.classList.toggle(style)

  const [row, col] = activeCell.split("-")
  setData(row, col, {
    [style]: true
  })
}
