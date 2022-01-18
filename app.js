/*
  07

  - No index.html, comente a div com a classe "container" que contém a tabela;
  - Descomente:
    - A <div> com a classe "container" abaixo da div que você acabou de
      comentar;
    - A <link> que importa o style.css;
  - Construa uma aplicação de conversão de moedas. O HTML e CSS são os que
    você está vendo no browser (após salvar os arquivos);
  - Você poderá modificar a marcação e estilos da aplicação depois. No momento,
    concentre-se em executar o que descreverei abaixo;
    - Quando a página for carregada:
      - Popule os <select> com tags <option> que contém as moedas que podem ser
        convertidas. "BRL" para real brasileiro, "EUR" para euro, "USD" para
        dollar dos Estados Unidos, etc.
      - O option selecionado por padrão no 1º <select> deve ser "USD" e o option
        no 2º <select> deve ser "BRL";
      - O parágrafo com data-js="converted-value" deve exibir o resultado da
        conversão de 1 USD para 1 BRL;
      - Quando um novo número for inserido no input com
        data-js="currency-one-times", o parágrafo do item acima deve atualizar
        seu valor;
      - O parágrafo com data-js="conversion-precision" deve conter a conversão
        apenas x1. Exemplo: 1 USD = 5.0615 BRL;
      - O conteúdo do parágrafo do item acima deve ser atualizado à cada
        mudança nos selects;
      - O conteúdo do parágrafo data-js="converted-value" deve ser atualizado à
        cada mudança nos selects e/ou no input com data-js="currency-one-times";
      - Para que o valor contido no parágrafo do item acima não tenha mais de
        dois dígitos após o ponto, você pode usar o método toFixed:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
    - Para obter as moedas com os valores já convertidos, use a Exchange rate
      API: https://www.exchangerate-api.com/;
      - Para obter a key e fazer requests, você terá que fazer login e escolher
        o plano free. Seus dados de cartão de crédito não serão solicitados.
*/

const formSelects = document.querySelectorAll('.form-select')
const convertedParagraph = document
  .querySelector('[data-js="conversion-precision"]')
const inputCoinToConvert = document
  .querySelector('[data-js="currency-one-times"]')
const selectCurrencyOne = document.querySelector('[data-js="currency-one"]')
const selectCurrencyTwo = document.querySelector('[data-js="currency-two"]')

const coins = ['BRL', 'USD', 'EUR']

const getConvertedQuantity = convertedQuantity => convertedQuantity ? convertedQuantity : 0;

const insertConvertedCoinIntoDOM = async () => {
  const convertedQuantity = getConvertedQuantity(inputCoinToConvert.value);
  const currencyToConvert = selectCurrencyOne.value;
  const currencyConverted = selectCurrencyTwo.value;

  const { conversion_rates } = await getConvertedCoin(selectCurrencyOne.value);

  convertedParagraph.innerText =
  `${convertedQuantity} ${currencyToConvert} = ${(conversion_rates[currencyConverted] * convertedQuantity).toFixed(2)} ${currencyConverted} `;
}

formSelects.forEach(select => select
  .addEventListener('change', () => insertConvertedCoinIntoDOM()))

inputCoinToConvert.addEventListener('input', () => insertConvertedCoinIntoDOM())

const checkStandardCurrencyValues = (select, currency, coin, standardCoin) => {
  if(select.attributes['data-js'].value === `${currency}`) {
    if (coin === `${standardCoin}`) {
      return `<option selected>${coin}</option>`;
    }
  }
}

const populateSelectOptions = (selectsArray) => {
  coins.forEach(coin => selectsArray
    .forEach(select => {
      select.innerHTML += checkStandardCurrencyValues(select, 'currency-one', coin, 'USD')
        || checkStandardCurrencyValues(select, 'currency-one', coin, 'USD')
        || `<option>${coin}</option>`;
  }));
}

const setFixedValuesOnWindowLoad = async () => {
  const { conversion_rates } = await getConvertedCoin('USD');
  const selectsArray = Array.from(formSelects);

  convertedParagraph.innerText = `1 USD = ${(conversion_rates.BRL).toFixed(2)} BRL`;

  populateSelectOptions(selectsArray);
}

window.addEventListener('load', setFixedValuesOnWindowLoad)
