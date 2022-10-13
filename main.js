var currentExchange = document.getElementsByClassName('currency-list');
var currencyHistory = document.getElementsByClassName('currency-history');
var currencySelected = document.getElementsByClassName('selected-currency');
var value;
var currency;
var selectedCurrency;
var historyData;
var historyDataResult;



function keyValue(value) {

  var currencyList = Object.entries(value);
  currencyList.forEach(function(item, index) {
    var li = document.createElement("li");
  li.classList.add('currency-list__item');
  currentExchange[0].appendChild(li).innerHTML = '<span id=' + index + '><b>' + item[0] + '</b>' + item[1] + '</span>';
  });
  
}

function historyValue(value) {
  var historyList = Object.entries(value);
  historyList.forEach(function(item, index) {
    var lit = document.createElement("li");
  lit.classList.add('history-list__item');
  currencyHistory[0].appendChild(lit).innerHTML = '<span id=' + index + '><b>' + item[0] + '</b>' + item[1] + '</span>';
  });
  
}

var options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.fastforex.io/fetch-all?from=PLN&api_key=ec8f65a590-026c86e3e9-rjbjvg', options) 
  .then(function(response) {return response.json();})
  .then(function(data) {value = data.results;})
  .then(function() {keyValue(value);})

  .catch(function(error) {console.error(error);});


function historyExchange(currency) {

fetch('https://api.fastforex.io/time-series?from=PLN&to=' + currency + '&start=2022-10-08&end=2022-10-13&api_key=ec8f65a590-026c86e3e9-rjbjvg', options) 
  .then(function(response) {return response.json();})
  .then(function(data) {historyData = data.results;})
  .then(function() {historyDataResult = historyData[currency];})
  .then(function() {currencyHistory[0].innerHTML = "";})
  .then(function() {historyValue(historyDataResult);})
  
  .catch(function(error) {console.error(error);});
}

function selectCurrency(event)  {
  selectedCurrency = event.srcElement.id;
  currency = Object.keys(value)[selectedCurrency];
  if (typeof currency === 'undefined') {
    currency = "";
  } else {
    currency = Object.keys(value)[selectedCurrency];
  }
  currencySelected[0].textContent = 'PLN :' + currency;
  historyExchange(currency);
}
currentExchange[0].addEventListener('click', selectCurrency);