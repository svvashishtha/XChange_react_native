const urls = {
    currencyUrl: "http://api.fixer.io/latest",
    currencyBaseINR: "http://api.fixer.io/latest?base=INR",
    currencyBaseUSD : "http://api.fixer.io/latest?base=USD",
    bitcoinpriceUsd: "https://api.coindesk.com/v1/bpi/currentprice.json",
};
const storageKeys = {
    currency_rates: 'currency_rates',
    convertTo: 'convertTo',
    convertFrom: 'convertFrom',
    conversionRate1: 'conversionRate1',
    conversionRate2: 'conversionRate2',
};
module.exports = {
    urls,
    storageKeys
};
