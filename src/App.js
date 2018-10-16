import React, { Component } from 'react';

import './App.css';
import Header from './components/Header';
import MarketTiming from './components/MarketTiming';

class App extends Component {
  render() {
    return (
      <div className="app-background">
        <Header />
        <MarketTiming />
      </div>
    );
  }
}

export default App;