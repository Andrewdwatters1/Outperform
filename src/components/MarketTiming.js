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
      // input and ticker suggestions
      tickerInput: '',
      tickerSubmitEnabled: false,
      typingTimeout: 0,
      suggestionDelay: 180,
      clearTickerSuggestionsAfter: 4000,
      customTickerInput: false,
      tickerSuggestions: [],

      // chart data
      tickerHistoricalDates: [],
      tickerHistoricalPrices: [],
      shouldSP500Display: true,
      intervalBetweenIterations: 250, // play around with this
      totalPricePoints: 100,
      pricePointsPerScreen: 40,

      // chart data, set on submit
      windowLoadWidth: window.innerWidth,
      selectedTickerSymbol: '',
      tickerDatesUpdated: [],
      tickerPricesUpdated: [],

      // buys/sells
      tradeAction: 'BUY',
      buys: [],
      sells: [],
      shouldReturnComponentDisplay: false,
      hasChartSequenceCompleted: false,
      hasUserInitiatedSequence: false
    }
  }

  handleTickerChange = e => {
    const { suggestionDelay } = this.state;
    const { value } = e.target;

    if (value === '') {
      this.setState({
        tickerSuggestions: []
      })
    }

    if (this.state.typingTimeout) clearTimeout(this.state.typingTimeout)
    this.setState({
      tickerInput: value,
      tickerSubmitEnabled: value,
      typingTimeout: setTimeout(() => this.getTickerSuggestions(), suggestionDelay)
    })
  }

  triggerTickerSuggestions = () => {
    this.setState({
      customTickerInput: !this.state.customTickerInput
    })
  }

  getTickerSuggestions = () => {
    const { tickerInput } = this.state;
    if (tickerInput.length && this.state.customTickerInput) {
      axios.post('/api/getSuggestions', { tickerInput })
        .then(result => {
          this.setState({
            tickerSuggestions: result.data.bestMatches
          }, () => {
            setTimeout(() => {
              this.setState({
                tickerSuggestions: []
              })
            }, this.state.clearTickerSuggestionsAfter)
          })
        })
    }
  }

  selectSuggestion = (symbol) => {
    this.setState({
      tickerInput: symbol,
      tickerSuggestions: []
    })
  }

  handleTickerSubmit = (e) => {
    e.preventDefault();
    const { tickerInput } = this.state;
    if (!this.state.shouldReturnComponentDisplay) {
      axios.post('/api/submitTicker', { tickerInput })
        .then(result => {
          let tickerInfo = result.data['Meta Data'];
          let priceData = result.data['Weekly Time Series'];

          this.setState({
            tickerSuggestions: [],
            hasUserInitiatedSequence: true,
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
      if (count < totalPricePoints) {
        count++;
        this.setState({
          tickerPricesUpdated: tickerHistoricalPrices
            .slice((randomStart + count), (randomStart + pricePointsPerScreen + count))
            .map((e) => e = e['4. close']),

          tickerDatesUpdated: tickerHistoricalDates
            .slice((randomStart + count), (randomStart + pricePointsPerScreen + count)),

          tickerSuggestions: [],
        })

      } else if (count === totalPricePoints) {
        clearInterval(chartUpdating)
        this.setState({
          hasChartSequenceCompleted: true,
          tickerPricesUpdated: tickerHistoricalPrices
            .slice(randomStart, randomStart + totalPricePoints)
            .map((e) => e = e['4. close']),

          tickerDatesUpdated: tickerHistoricalDates
            .slice(randomStart, randomStart + totalPricePoints),

          shouldReturnComponentDisplay: true,
          tickerSuggestions: []
        })
      }
    }, this.state.intervalBetweenIterations)
  }

  trade = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let { tradeAction, tickerPricesUpdated, buys, sells } = this.state;

    if (tradeAction === 'BUY') {
      this.setState({
        buys: [...buys, tickerPricesUpdated.pop()],
        tradeAction: 'SELL'
      })
    } else {
      this.setState({
        sells: [...sells, tickerPricesUpdated.pop()],
        tradeAction: 'BUY'
      })
    }
  }

  tryAgain = () => { // resets all values to initial
    this.setState({
      shouldSP500Display: true,
      tickerInput: '',
      tickerSubmitEnabled: false,
      selectedTickerSymbol: '',
      tickerHistoricalDates: [],
      tickerHistoricalPrices: [],
      tickerDatesUpdated: [],
      tickerPricesUpdated: [],
      tradeAction: 'BUY',
      buys: [],
      sells: [],
      shouldReturnComponentDisplay: false,
      hasChartSequenceCompleted: false,
      hasUserInitiatedSequence: false,
    })
  }

  render() {
    let activeTickerSuggestions = this.state.tickerSuggestions && this.state.tickerSuggestions.length ?

      this.state.tickerSuggestions
        .map((e, i) => {
          return <p
            key={i}
            onClick={(symbol) => this.selectSuggestion(e['1. symbol'])}>
            {`${e['1. symbol']}: ${e['2. name']}`}
          </p>
        }) : null

    return (
      <div>
        {this.state.shouldReturnComponentDisplay &&
          <CalculateReturns
            buys={this.state.buys}
            sells={this.state.sells}
            firstPrice={this.state.tickerHistoricalPrices[0]['4. close']}
            firstDate={this.state.tickerHistoricalDates[0]}
            lastPrice={this.state.tickerHistoricalPrices[this.state.tickerHistoricalPrices.length - 1]['4. close']}
            lastDate={this.state.tickerHistoricalDates[this.state.tickerHistoricalDates.length - 1]}
            tryAgain={this.tryAgain}
            windowLoadWidth={this.state.windowLoadWidth} />
        }

        {this.state.shouldSP500Display ?
          <SPChart
            priceData={Object.values(sp500data['Weekly Time Series']).reverse().map((e) => e = e['4. close'])}
            dateData={Object.keys(sp500data['Weekly Time Series']).reverse()}
            ticker={this.state.selectedTickerSymbol}
            priceDataLength={this.state.tickerHistoricalDates.length}
            windowLoadWidth={this.state.windowLoadWidth} />
          :
          <Chart
            priceData={this.state.tickerPricesUpdated}
            dateData={this.state.tickerDatesUpdated}
            ticker={this.state.selectedTickerSymbol}
            priceDataLength={this.state.tickerHistoricalDates.length}
            running={!this.state.hasChartSequenceCompleted}
            windowLoadWidth={this.state.windowLoadWidth} />
        }


        <div>

          <form
            onSubmit={this.handleTickerSubmit}
            id="stock-select"
            disabled={this.state.tickerSubmitEnabled}
            className="stock-select-outer">

            <select
              onChange={this.handleTickerChange}
              id="commonTickerSelect">
              <option value="" disabled defaultValue>Common Stocks</option>
              <option value="AAPL">Apple</option>
              <option value="MSFT">Microsoft</option>
              <option value="AMZN">Amazon</option>
              <option value="GOOG">Alphabet (Google)</option>
              <option value="FB">Facebook</option>
              <option value="JPM">JPMorgan Chase</option>
              <option value="JNJ">Johnson & Johnson</option>
              <option value="XOM">Exxon Mobil</option>
            </select>

            <input
              placeholder="Choose your own"
              value={this.state.tickerInput}
              onChange={this.handleTickerChange}
              onFocus={this.triggerTickerSuggestions}
              onBlur={this.triggerTickerSuggestions} />

            <div className="suggestions">
              {activeTickerSuggestions}
            </div>

            <button
              type="submit"
              form="stock-select"
              style={{ display: `${this.state.hasUserInitiatedSequence ? 'none' : 'block'}` }}
              disabled={!this.state.tickerInput}
              className="buttons-all stock-action-button">
              GO
            </button>

            <button
              onClick={this.trade}
              style={{ display: `${!this.state.hasUserInitiatedSequence ? 'none' : 'block'}` }}
              className="buttons-all stock-action-button">
              {this.state.tradeAction}
            </button>

          </form>

        </div>
      </div>
    )
  }
}

export default MarketTiming;