const data = JSON.parse(localStorage.getItem('spreadsheetData')) || {}
const redirects = JSON.parse(localStorage.getItem('spreadsheetRedirects')) || {}

// ----- ON FILE LOAD: create data if none present -----
if (!Object.keys(data).length) initData(100)
// -----

function initData(size) {
  for(let row = 1; row <= size; row++){
    for(let col = 1; col <= size; col++) {
      const alpha = numToKey(col)
      const dataObj =  {
        id: alpha + row,
        row: String(row),
        col: alpha,
        input: "",
        display: "",
        referencedBy: [],
        references: [],
      }
    
      data[alpha + row] = dataObj
      redirects[row + alpha] = alpha + row // enable using A13 or 13A (cause I kept doing it wrong)
    }
  }
  localStorage.setItem('spreadsheetData', JSON.stringify(data))
  localStorage.setItem('spreadsheetRedirects', JSON.stringify(redirects))
}

function getData (row, col) {
  return data[col + row]
}

function setData (row, col, newData) {
  Object.keys(newData).forEach(key => {
    data[col + row][key] = newData[key]
  })
  localStorage.setItem('spreadsheetData', JSON.stringify(data))
}

function resetData() {
  initData(100)
  createBoard(100)
}
