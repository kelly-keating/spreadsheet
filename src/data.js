const data = JSON.parse(localStorage.getItem('spreadsheetData')) || initData()

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

function getData (row, col) {
  return data[col + row]
}

function setData (row, col, newData) {
  Object.keys(newData).forEach(key => {
    data[col + row][key] = newData[key]
  })
  localStorage.setItem('spreadsheetData', JSON.stringify(data))
}
