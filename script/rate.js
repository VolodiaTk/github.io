document.addEventListener('DOMContentLoaded', function () {
    var baseCurrency = 'UAH'; // Гривна
    var currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'NOK', 'SGD', 'MXN', 'INR', 'RUB', 'BRL', 'ZAR', 'TRY', 'DKK', 'PLN', 'THB', 'IDR', 'HKD', 'MYR', 'KRW', 'PHP', 'HUF', 'CZK', 'ILS', 'CLP'];

    function fetchExchangeRate(targetCurrency) {
        var apiUrl = 'https://open.er-api.com/v6/latest/' + baseCurrency;

        return fetch(apiUrl)
            .then(response => response.json())
            .then(data => data.rates[targetCurrency])
            .catch(error => {
                console.error('Ошибка при выполнении запроса к API:', error);
            });
    }

    function createCurrencyCard(currency, exchangeRate) {
        var container = document.getElementById('currency-container');

        var card = document.createElement('div');
        card.className = 'currency-card';

        var nameElement = document.createElement('div');
        nameElement.className = 'currency-name';
        nameElement.textContent = currency;

        var rateElement = document.createElement('div');
        rateElement.className = 'exchange-rate ' + compareExchangeRates(exchangeRate, 1);
        rateElement.textContent = '1 ' + baseCurrency + ' = ' + exchangeRate.toFixed(4) + ' ' + currency;

        card.appendChild(nameElement);
        card.appendChild(rateElement);

        container.appendChild(card);
    }

    function compareExchangeRates(rate1, rate2) {
        if (rate1 > rate2) {
            return 'higher';
        } else if (rate1 < rate2) {
            return 'lower';
        } else {
            return '';
        }
    }

    function updateCurrencyWall() {
        currencies.forEach(targetCurrency => {
            fetchExchangeRate(targetCurrency)
                .then(exchangeRate => {
                    createCurrencyCard(targetCurrency, exchangeRate);
                })
                .catch(error => {
                    console.error('Ошибка при обновлении курса валюты:', error);
                });
        });
    }

    updateCurrencyWall();
});
