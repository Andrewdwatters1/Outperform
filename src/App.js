import React, { Component } from 'react';
// import logo from './logo.svg';

import './App.css';
import Header from './components/Header';
import MarketTiming from './components/MarketTiming';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MarketTiming />
      </div>
    );
  }
}

export default App;