import React, { Component } from 'react';
import axios from 'axios';

import Chart from './Chart';
import SPChart from './SPChart';
import CalculateReturns from './CalculateReturns';
import { sp500data } from '../assets/sp500data';

class MarketTiming extends Component {
  constructor() {
    super()
    this.state = {
      // input and suggestions
      tickerInput: '',
      tickerSubmitEnabled: false,
      typingTimeout: 0,
      suggestionDelay: 10000, // CHANGE IN PRODUCTION
      tickerSuggestions: [],
      // chart data
      tickerHistoricalDates: [],
      tickerHistoricalPrices: [],
      shouldSP500Display: true,
      intervalBetweenIterations: 50, // play around with it
      totalPricePoints: 120,
      pricePointsPerScreen: 15,
      // chart data, set on submit
      selectedTickerSymbol: '',
      tickerDatesUpdated: [],
      tickerPricesUpdated: [],
      // buys/sells
      tradeAction: 'BUY',
      buys: [],
      sells: [],
      shouldReturnComponentDisplay: false
    }
  }

  handleTickerChange = e => {
    const { suggestionDelay } = this.state;
    const { value } = e.target;
    if (this.state.typingTimeout) clearTimeout(this.state.typingTimeout)
    this.setState({
      tickerInput: value,
      tickerSubmitEnabled: value,
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
    if (!this.state.shouldReturnComponentDisplay) {
      axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${this.state.tickerInput}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`).then(result => {
        console.log(result)
        let tickerInfo = result.data['Meta Data'];
        let priceData = result.data['Weekly Time Series'];
        this.setState({
          tickerInput: '',
          selectedTickerSymbol: tickerInfo['2. Symbol'].toUpperCase(),
          tickerHistoricalDates: Object.keys(priceData).reverse(),
          tickerHistoricalPrices: Object.values(priceData).reverse(),
          shouldSP500Display: false,
        }, () => {
          this.updateChartData()
        })
      })
    }
  }

  updateChartData = () => {
    let { tickerHistoricalDates, tickerHistoricalPrices, totalPricePoints, pricePointsPerScreen } = this.state;
    let randomStart = Math.floor(Math.random() * ((tickerHistoricalPrices.length - totalPricePoints) + 1));
    let count = 0;
    let chartUpdating = setInterval(() => {
      if (count < 120) {
        count++;
        this.setState({
          tickerPricesUpdated: tickerHistoricalPrices.slice((randomStart + count), (randomStart + pricePointsPerScreen + count)).map((e) => e = e['4. close']),
          tickerDatesUpdated: tickerHistoricalDates.slice((randomStart + count), (randomStart + pricePointsPerScreen + count))
        })
      } else if (count === 120) {
        this.setState({
          tickerPricesUpdated: tickerHistoricalPrices.slice(randomStart, randomStart + totalPricePoints).map((e) => e = e['4. close']),
          tickerDatesUpdated: tickerHistoricalDates.slice(randomStart, randomStart + totalPricePoints),
          shouldReturnComponentDisplay: true
        })
        clearInterval(chartUpdating)
      }
    }, this.state.intervalBetweenIterations)
  }

  trade = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.tradeAction === 'BUY') {
      this.setState({
        buys: [...this.state.buys, this.state.tickerPricesUpdated.pop()],
        tradeAction: 'SELL'
      })
    } else {
      this.setState({
        sells: [...this.state.sells, this.state.tickerPricesUpdated.pop()],
        tradeAction: 'BUY'
      })
    }
    console.log('buys are', this.state.buys)
    console.log('sells are', this.state.sells)
  }
  tryAgain = () => {
    this.setState({
            tickerInput: '',
            tickerSubmitEnabled: false,
            tickerHistoricalDates: [],
            tickerHistoricalPrices: [],
            shouldSP500Display: true,
            selectedTickerSymbol: '',
            tickerDatesUpdated: [],
            tickerPricesUpdated: [],
            tradeAction: 'BUY',
            buys: [],
            sells: [],
            shouldReturnComponentDisplay: false
    }, () => {
      this.forceUpdate()
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
        {this.state.shouldSP500Display ?
          <SPChart
            priceData={Object.values(sp500data['Weekly Time Series']).reverse().map((e) => e = e['4. close'])}
            dateData={Object.keys(sp500data['Weekly Time Series']).reverse()}
            ticker={this.state.selectedTickerSymbol}
            priceDataLength={this.state.tickerHistoricalDates.length} />
          :
          <Chart
            priceData={this.state.tickerPricesUpdated}
            dateData={this.state.tickerDatesUpdated}
            ticker={this.state.selectedTickerSymbol}
            priceDataLength={this.state.tickerHistoricalDates.length} />
        }
        {this.state.shouldReturnComponentDisplay &&
          <CalculateReturns
            buys={this.state.buys}
            sells={this.state.sells}
            firstPrice={this.state.tickerHistoricalPrices[0]['4. close']}
            firstDate={this.state.tickerHistoricalDates[0]}
            lastPrice={this.state.tickerHistoricalPrices[this.state.tickerHistoricalPrices.length - 1]['4. close']}
            lastDate={this.state.tickerHistoricalDates[this.state.tickerHistoricalDates.length - 1]} 
            tryAgain={this.tryAgain}/>
        }
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
          <button onClick={this.trade}>{this.state.tradeAction}</button>
        </div>
      </div>
    )
  }
}

export default MarketTiming;