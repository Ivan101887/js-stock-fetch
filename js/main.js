let data = [];


getData()
function getData() {
  const url = '../index.json';
  fetch(url)
  .then((res) => { return res.json() })
  .then((json) => {
    data = json;
    document.querySelector('#MarketTableBody').innerHTML += makeDom()[1];
    document.querySelector('#HeaderDate');
  })
}
  
function convertDate(str) {
  return str.slice(0, 4) + '/' + str.slice(4, 6) + '/' + str.slice(6);
}

function roundDecimal(val, precision) {
  return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
}

function makeDom(strDate = '', strTbody='') {
  strDate = convertDate(data[0].Date);
  data.forEach((item, index) => {
    strTbody +=
      `<tr class=${index % 2 !== 0 ?`bg-grey`:`bg-white`}>
          <td class="marketTable__td">${item.CommName}</td>
          <td class="marketTable__td text-right">${item.ClosePr}</td>
          <td class="marketTable__td text-right ${parseFloat(item.CF, 10) > 0 ?`js-rise"`:`js-drop"`}>${item.CF}</td>
          <td class="marketTable__td text-right ${parseFloat(item.CF, 10) > 0 ?`js-rise"`:`js-drop"`}>${item.CFPercent}</td>
          <td class="marketTable__td text-right">${roundDecimal(item.SalePrice / 100000, 1)}</td>
      </tr>`
  })
  return [strDate, strTbody];
}