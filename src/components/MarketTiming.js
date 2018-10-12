import React, { Component } from 'react';
import axios from 'axios';

import Chart from './Chart';

class MarketTiming extends Component {
  constructor() {
    super()
    this.state = {
      tickerInput: '',
      tickerSubmitEnabled: false,
      activelyTyping: false,
      typingTimeout: 0,
      tickerSuggestions: [],
    }
  }

  handleTickerChange = e => {
    const { value } = e.target;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout)
    }
    this.setState({
      tickerInput: value,
      tickerSubmitEnabled: value,
      activelyTyping: false,
      typingTimeout: setTimeout(() => this.getTickerSuggestions(), 2000)
    })
  }

  getTickerSuggestions = () => {
    axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.tickerInput}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`).then(result => {
      console.log(result)
      this.setState({
        tickerSuggestions: result.data.bestMatches
      }, () => {
        this.forceUpdate()
        console.log('force update hit')
      })
    })
  }

  handleTickerSubmit = (e) => {
    e.preventDefault();
    console.log('also hit')
  }

  render() {
    console.log(this.state.tickerSuggestions)
    let activeTickerSuggestions = this.state.tickerSuggestions.length && this.state.tickerSuggestions
      .map((e, i) => {
        return <p 
        key={i}
        >{`${e['1. symbol']}:  ${e['2. name']}, Type: ${e['3. type']}`}</p>
      })
    console.log(activeTickerSuggestions);
    return (
      <div>
        <Chart />
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