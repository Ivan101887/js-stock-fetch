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
  data.forEach((item, index) => {
    strDate = convertDate(item.Date);
    strTbody +=
      `${index % 2 !== 0 ?
        `<tr class="bg-grey">`
        : `<tr class="bg-white">`}
          <td align="left">${item.CommName}</td>
          <td align="right">${item.ClosePr}</td>
          ${parseFloat(item.CF, 10) > 0 ? 
          `<td align="right" class="js-rise">${item.CF}</td>
          <td align="right" class=" js-rise">${item.CFPercent}</td>`: 
          `<td align="right" class=" js-drop">${item.CF}</td>
          <td align="right" class=" js-drop">${item.CFPercent}</td>`}
          <td align="right">${roundDecimal(item.SalePrice / 100000, 1)}</td>
      </tr>`
  })
  return [strDate, strTbody];
}