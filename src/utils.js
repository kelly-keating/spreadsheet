function setStyle(style) {
  const elem = document.getElementById(activeCell)
  elem.classList.toggle(style)

  const [row, col] = activeCell.split("-")
  setData(row, col, {
    [style]: true
  })
}

// ----- INPUTS -----

function isNumber(n) {
  return !isNaN(n)
}

function isSimpleRef(str) {
  const [gap, ref, ...theRest] = str.split("=")
  return gap === "" && Boolean(data[ref]) && theRest.length === 0
}

function isValidFormula(str) {
  const [gap, frm, ...theRest] = str.split("=")
  if(gap !== "" || theRest.length !== 0) return false

  const refs = frm.split(/[\+\-\*\/]/)
  for(const r of refs){
    if(!data[r] && isNaN(r)) return false
  }
  return true
}

function evalFormula(input) {
  const frm = input.replace("=", "").split(/([+\-*/])/)
  const res = frm.map(ref => data[ref]?.display || ref).join("")
  return eval(res)
}

// ----- COLUMN LABELS -----

function numToKey(n) {
  const alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if (n < 27) return alpha[n]

  const ten = Math.floor((n - 1) / 26)
  const one = n % 26

  return alpha[ten] + (one === 0 ? "Z" : alpha[one])
}
