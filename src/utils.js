function initData() {
  const size = 100
  const data = []

  const getObj = () => {
    const obj = {}
    for(let val = 1; val <= size; val++){
      obj[numToKey(val)] = ""
    }
    return obj
  }

  for(let idx = 0; idx < size; idx++){
    data.push(getObj())
  }

  return data
}

function numToKey(n) {
  const alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if (n < 27) return alpha[n]

  const ten = Math.floor((n - 1) / 26)
  const one = n % 26

  return alpha[ten] + (one == 0 ? "Z" : alpha[one])
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
