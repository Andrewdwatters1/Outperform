import React, { Component } from 'react';
import * as moment from 'moment';
import Sound from 'react-sound'

import boo from '../audio/boo.wav';
import money from '../audio/money.wav';

export default class CalculateReturns extends Component {
  constructor(props) {
    super(props)
  }


  calcReturns = () => {
    let returns = [];
    let { firstDate, lastDate, firstPrice, lastPrice, buys, sells } = this.props;

    // diff ending date from starting date
    let firstMoment = new moment(firstDate.split('-').map((e) => e = +e));
    let lastMoment = new moment(lastDate.split('-').map((e) => e = +e));
    let logOfYearsAsExp = 1 / (lastMoment.diff(firstMoment, 'years', true)); // used for both b/c same start/end dates

    // calc market return
    let marketValueChangeAsBase = lastPrice / firstPrice;
    let marketCAGR = (Math.pow(marketValueChangeAsBase, logOfYearsAsExp) - 1) * 100;
    returns.push(marketCAGR);

    // calc investor return
    let investorValueChangeAsBase = 1; // start w/ 0% return
    for (let i = 0; i < buys.length; i++) {
      if (sells[i]) { // if sold prior to end of sequence
        investorValueChangeAsBase *= (sells[i] / buys[i]) || 1
      } else {
        investorValueChangeAsBase *= (lastPrice / buys[i]) || 1
      }
    }

    let investorCAGR = (Math.pow(investorValueChangeAsBase, logOfYearsAsExp) - 1) * 100;
    returns.push(investorCAGR);
    return returns;
  }

  render() {
    let bothReturns = this.calcReturns();
    let market = bothReturns[0].toFixed(2);
    let investor = bothReturns[1].toFixed(2);

    let response = bothReturns[0] > bothReturns[1] ?
      'Yikes... That was not awesome.'
      :
      "Shouldn't you be running a Hedge Fund right now...?";

    let audio = bothReturns[0] > bothReturns[1] ?
      <Sound url={boo} playStatus={Sound.status.PLAYING} />
      :
      <Sound url={money} playStatus={Sound.status.PLAYING} />

    return (
      <div className="returns-container">

        <p>{response}</p>
        <br/>
        <p>Market Return: {`${market}%`}</p>
        <p>Your Return: {`${investor}%`}</p>
        <br/> 

        <p>* Returns as CAGR. <a href="https://www.investopedia.com/terms/c/cagr.asp" target="_blank">(Learn more)</a></p>
        <br/> 
        <button
          onClick={this.props.tryAgain}
          className="buttons-all try-again-button">
          TRY AGAIN
        </button>

        {audio}
      </div>
    )
  }
}