import React from 'react';

export default function Header() {
  return (
    <header>
      {/* <img src={logo} alt="logo" /> */}
      <h1>Outperform</h1>
      <p>Welcome to "Outperform", a game designed to help you decide whether you can beat the market, and if market timing is the right strategy for you as an investor.  Below, you'll see a chart showing historical prices for the SP500, the largest 500 stocks in the United States by size (also known as market-cap).  If you could buy and sell at the right times (buying high and selling low), it stands to reason that you could achieve some pretty great returns and get filthy stinking rich!</p>
      <p>So what's the catch?  Why doesn't everyone do it and why isn't everyone rich?  Well... it's actually a lot harder than you might think, if you're familiar with <a href="https://en.wikipedia.org/wiki/Game_theory" target="_blank">game theory</a> or markets in general you know that market timing is far from easy, and even the most brilliant minds struggle to do it well.</p>
      <p>Alright... I know what you're thinking... "I could do it, I'm smart and good with numbers, this guy is a shmuck"  Fair enough... Let's see if you're right.  Pick a stock from the list below, or enter your own.  Then click "invest" and the chart will show historical prices for that stock starting at a random date (no you don't get to see the date so you can cheat).  It will update continuously until you get to present day.  Your job is simple... click the "buy" and "sell" buttons at the right time.  If you're right, you'll beat the market and achieve the ever-illusive <a href="https://www.investopedia.com/terms/a/alpha.asp" target="_blank">Alpha</a> and if you're wrong... well, I told you so.  Go ahead, give it a shot!</p>
    </header>
  )
}