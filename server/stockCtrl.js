const axios = require('axios');

module.exports = {
  submitTicker: (req, res) => {
    const { tickerInput } = req.body;
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${tickerInput}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`)
      .then(result => res.status(200).send(result.data))
      .catch(error => console.log(error));
  },
  getSuggestions: (req, res) => {
    const { tickerInput } = req.body;
    axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${tickerInput}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`)
      .then(result => res.status(200).send(result.data))
      .catch(error => console.log(error));
  }
}