// ----- INPUTS -----

function standardiseInput(str) {
  let tidyString = str.replace(/\s+/g, '').toUpperCase()
  if (tidyString[0] !== "=") return tidyString
  
  const terms = tidyString.replace("=", "").split(/([+\-*/])/)
  const redirectedTerms = terms.map(t => redirects[t] || t)
  return "=" + redirectedTerms.join("")
}

function isNumber(n) {
  return !isNaN(n)
}

function isSimpleFormula(str) {
  const [gap, frm, ...theRest] = str.split("=")
  if(gap !== "" || theRest.length !== 0) return false

  const refs = frm.split(/[\+\-\*\/]/)
  for(const r of refs){
    if(!data[r]?.display && isNaN(r)) return false
  }
  return true
}

function evalFormula(input, id) {
  const terms = input.replace("=", "").split(/([+\-*/])/)
  let err = null

  const refs = []
  const translatedStr = terms.map(term => {
    const cell = data[term]
    if (!cell) return term

    if (hasLoop(id, term)) {
      err = '#ERR - oops a loop'
    } else if (cell.error) {
      err = cell.error
    }

    // BUG: when creating a loop, logs <null #ERR - oops a loop>

    refs.push(term)
    return cell.display
  }).join("")

  updateRefs(id, refs)
  console.log(err, translatedStr)
  return err || eval(translatedStr)
}

function hasLoop(updatedCell, newRef) {
  const inLoop = new Set()

  const findRefInTree = (nodeId) => {
    if (nodeId === newRef) return true // found it!
    if (inLoop.has(nodeId)) return false // stops checks in existing loops (in case someone really likes adding loops)

    inLoop.add(nodeId)
    const parents = data[nodeId].referencedBy
    
    for(const nextNode of parents) {
      if (findRefInTree(nextNode)) return true
    }

    inLoop.delete(nodeId)
    return false
  }

  return findRefInTree(updatedCell)
}

function updateRefs(user, newTargets) {
  const currentTargets = data[user].references

  const refsAdded = newTargets.filter(id => !currentTargets.includes(id))
  refsAdded.forEach(ref => addRef(ref, user))
  const refsRemoved = currentTargets.filter(id => !newTargets.includes(id))
  refsRemoved.forEach(ref => removeRef(ref, user))
}

function addRef(target, user){
  const upArr = data[target].referencedBy
  if (!upArr.includes(user)) upArr.push(user)

  const downArr = data[user].references
  if (!downArr.includes(target)) downArr.push(target)
}

function removeRef(target, user) {
  const upArr = data[target].referencedBy
  const upIdx = upArr.indexOf(user)
  if (upIdx !== -1) upArr.splice(upIdx, 1)

  const downArr = data[user].references
  const downIdx = downArr.indexOf(target)
  if (downIdx !== -1) downArr.splice(downIdx, 1)
}

// ----- COLUMN LABELS -----

function numToKey(n) {
  const alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  if (n < 27) return alpha[n]

  const ten = Math.floor((n - 1) / 26)
  const one = n % 26

  return alpha[ten] + (one === 0 ? "Z" : alpha[one])
}

// FIXME: = empty cell creates invalid
