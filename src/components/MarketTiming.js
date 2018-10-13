import React, { Component } from 'react';
import axios from 'axios';

import Chart from './Chart';

class MarketTiming extends Component {
  constructor() {
    super()
    this.state = {
      tickerInput: '',
      tickerSubmitEnabled: false,
      // activelyTyping: false,
      typingTimeout: 0,
      tickerSuggestions: [],

      // set on submit
      selectedTickerSymbol: '',
      tickerHistoricalDates: [],
      tickerHistoricalPrices: []
    }
  }

  handleTickerChange = e => {
    const suggestionDelay = 5000;
    const { value } = e.target;
    if (this.state.typingTimeout) clearTimeout(this.state.typingTimeout)
    this.setState({
      tickerInput: value,
      tickerSubmitEnabled: value,
      // activelyTyping: false,
      typingTimeout: setTimeout(() => this.getTickerSuggestions(), suggestionDelay)
    })
  }

  getTickerSuggestions = () => {
    if (this.state.tickerInput.length) {
      axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.tickerInput}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`).then(result => {
        this.setState({
          tickerSuggestions: result.data.bestMatches
        })
      })
    }
  }

  handleTickerSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${this.state.tickerInput}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`).then(result => {
      let tickerInfo = result.data['Meta Data'];
      let priceData = result.data['Weekly Time Series'];
      this.setState({
        tickerInput: '',
        selectedTickerSymbol: tickerInfo['2. Symbol'].toUpperCase(),
        tickerHistoricalDates: Object.keys(priceData).reverse(),
        tickerHistoricalPrices: Object.values(priceData).reverse(),
      })
    })
  }

  render() {
    let activeTickerSuggestions = this.state.tickerSuggestions && this.state.tickerSuggestions.length ? this.state.tickerSuggestions
      .map((e, i) => {
        return <p
          key={i}
        >{`${e['1. symbol']}:  ${e['2. name']}, Type: ${e['3. type']}`}</p>
      }) : null
    return (
      <div>
        <Chart
          priceData={this.state.tickerHistoricalPrices}
          dateData={this.state.tickerHistoricalDates}
          ticker={this.state.selectedTickerSymbol} 
          priceDataLength={this.state.tickerHistoricalDates.length}/>
        <div>
          <div>
            <p>Alright hero, pick your poison.</p>
          </div>
          <form
            onSubmit={this.handleTickerSubmit}
            id="stock-select"
            disabled={this.state.tickerSubmitEnabled}>

            <select
              onChange={this.handleTickerChange}
              id="commonTickerSelect">
              <option value="" disabled selected>Choose from common Stocks</option>
              <option value="AAPL">Apple</option>
              <option value="MSFT">Microsoft</option>
              <option value="AMZN">Amazon</option>
              <option value="GOOG">Alphabet (Google)</option>
              <option value="FB">Facebook</option>
              <option value="JPM">JPMorgan Chase</option>
              <option value="JNJ">Johnson & Johnson</option>
              <option value="XOM">Exxon Mobil</option>
            </select>
            <p> or... </p>
            <input
              placeholder="Choose your own"
              value={this.state.tickerInput}
              onChange={this.handleTickerChange}
            />
            <div>
              {activeTickerSuggestions}
            </div>
            <button type="submit">$ $ $</button>
          </form>
        </div>
      </div>
    )
  }
}

export default MarketTiming;