import './App.css';

import React, { Component } from 'react';

import logo from './logo.svg';

class App extends Component {
  render() {
    let nums = [];
    for(var i = 0; i < 12; i++) {
      nums.push(i);
    }
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Temyang</h1>
        </header>
        {
          nums.map((key) => {
            return <div className="card" >co-working {key + 1}</div>
          })
        }
      </div>
    );
  }
}

export default App;
