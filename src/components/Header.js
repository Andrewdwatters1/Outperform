import React from 'react';

export default function Header() {
  return (
    <header className="app-header">

      <div className="app-header-title">
        <h1>OUTPERFORM</h1>
        <i className="fas fa-chart-line"></i>
      </div>

      <div className="app-header-content">
        <p>Welcome to Outperform!  Choose a stock below, and see if you can beat the market!  Buy high and sell low!  Or... you know, whatever strategy makes sense to you. When you click "GO", the chart will show price history starting from a random point in history.  Click the "BUY" button to buy when the price is low, and the "SELL" button to sell when the price is high.  At the end, you'll see how you did and see if you achieved the ever illusive
          <a href="https://www.investopedia.com/terms/a/alpha.asp" target="_blank" rel="noopener noreferrer">Alpha</a>
        </p>
      </div>

    </header>
  )
}