// ----- DATA -----

function initData() {
  const size = 100
  const data = {}

  for(let num = 1; num <= size; num++){
    for(let str = 1; str <= size; str++) {
      const dataObj =  { input: "", display: "", }
      data[numToKey(str) + num] = dataObj
      data[num + numToKey(str)] = dataObj // enable using A13 or 13A (cause I kept doing it wrong)
    }
  }

  return data
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

// ------------------------------------
// --- numToKey is being a problem ----
// ------------------------------------

/*
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
*/
