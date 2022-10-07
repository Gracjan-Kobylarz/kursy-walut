const currentExchange = document.querySelector('.currency-list');
const currencyHistory = document.querySelector('.currency-history');
const currencySelected = document.querySelector('.selected-currency');
let historyURL;
let value;
let selectedCurrency;
let index = 0;


const keyValue = (input) => Object.entries(input).forEach(([key, value]) => {
  const li = document.createElement("li");
  li.classList.add('currency-list__item');
  currentExchange.appendChild(li).innerHTML = `<span id='${index}'><b>${key}</b> ${value} </span>`;
  index++;
})

const historyValue = (input) => Object.entries(input).forEach(([key, value]) => {
  const li = document.createElement("li");
  li.classList.add('history-list__item');
  currencyHistory.appendChild(li).innerHTML = `<span><b>${key}</b>  ${value} </span>`;
})

const requestURL = `https://api.fastforex.io/fetch-all?from=PLN&api_key=ec8f65a590-026c86e3e9-rjbjvg`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
};

async function exchange() {
  const response = await fetch(requestURL, options);
  const currency = await response.json();
  value = currency.results;
  keyValue(value);
}
exchange();

async function historyExchange(item) {
  let historyURL = `https://api.fastforex.io/time-series?from=PLN&to=${currency}&start=2022-10-01&end=2022-10-06&api_key=ec8f65a590-026c86e3e9-rjbjvg`;
  const response = await fetch(historyURL, options);
  const historyData = await response.json();
  const historyDataResult = historyData.results[`${currency}`];
  currencyHistory.innerHTML = "";
  historyValue(historyDataResult);
}

const onClick = (event) => {
  selectedCurrency = event.srcElement.id;
  currency = Object.keys(value)[selectedCurrency];
  if (typeof currency === 'undefined') {
    currency = "";
  } else {
    currency = Object.keys(value)[selectedCurrency];
  }
  currencySelected.textContent = `PLN : ${currency}`;
  historyExchange(currency);
}
currentExchange.addEventListener('click', onClick);