import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header-title">
        <h1>Outperform</h1>
        <i class="fas fa-chart-line"></i>
      </div>
      <div className="app-header-content">
        <p>Welcome to Outperform!  Perhaps you've read that it's difficult to beat the market, but how do we know for certain if this is the case?  Well... this game should help you find out!</p>
        <hr />
        <p>See that chart down there?  That's the SP500 (or SPY more technically), the largest 500 companies in the U.S. by market cap (learn more about market-capitalization <a href="https://www.investopedia.com/terms/m/marketcapitalization.asp" target="_blank">here</a>) from January, 2000 until present day.  Take a look at the chart. Imagine if you could buy and sell at the just the right times (think 2008). You could reap all the benefits of the market and avoid all the downside!</p>
        <hr />
        <p>So what's the catch?  Why doesn't everyone do this and why isn't everyone who invests filthy rich?  Well, it's actually a lot harder than you might think, if you're familiar with <a href="https://en.wikipedia.org/wiki/Game_theory" target="_blank">game theory</a> or markets in general you know that market timing is far from easy, and even the most brilliant minds struggle to do it well.</p>
        <hr />
        <p>I know, you're thinking: "This guy is a shmuck, I can pull if off!" Fair enough, let's see... </p>
        <hr />
        <p style={{ fontSize: '1.2em', width: '98%', margin: '0 auto' }}>Pick a stock from the list below, or enter your own.  Then click "invest" and the chart will start from a random date sometime in the last 20 years.  Your job is simple: click the "BUY/SELL" button at the right time(s).  Chances are you'll struggle to beat the market but maybe... just maybe... you can achieve the ever-illusive <a href="https://www.investopedia.com/terms/a/alpha.asp" target="_blank">Alpha</a> and Outperform.</p>
      </div>
      <button className="app-header-button"><AnchorLink className="app-header-button-link" offset='39' href='#lets-go'>LETS GO!</AnchorLink></button>
    </header>
  )
}