const data = initData()

function handleSelect(elem) {
  const [row, col] = elem.id.split("-")
  const currentVal = data[row][col]
  
  const isActive = elem.classList.contains("active")

  if (!isActive) {
    elem.classList.toggle("active")
    // FIXME: to fix refresh submit, button is a fake, means we can't submit though
    // BUG: focus not focusing
    // BUG: value not valueing
    // BUG: close not closing
    const submitFn = `handleSubmit(this, '${row}', '${col}')`
    elem.innerHTML = `<form onsubmit="${submitFn}" onfocusout="${submitFn}"><input type="text" value="${currentVal}" /><button type="submit" disabled style="display: none" aria-hidden="true"></button></form>`
  }
}

function handleSubmit(elem, row, col) {
  const inputStr = elem[0].value
  data[row - 1][col] = inputStr
  
  const cell = document.getElementById(row + "-" + col)
  cell.classList.remove("active")
  cell.innerHTML = inputStr
}
