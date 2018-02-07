import './App.css';

import { Circle, Line } from 'rc-progress';
import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import logo from './logo.svg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
    };
    this.increase = this.increase.bind(this);
    this.restart = this.restart.bind(this);
  }

  componentDidMount() {
    this.increase();
  }

  increase() {
    const percent = this.state.percent + 1;
    if (percent >= 100) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent });
    this.tm = setTimeout(this.increase, 10);
  }

  restart() {
    clearTimeout(this.tm);
    this.setState({ percent: 0 }, () => {
      this.increase();
    });
  }

  render() {
    const data = [{"name":"Sheldon Ekamai 13","img":"http://drive.google.com/uc?=view&id=1T7iy454QOXyHpMqKyQYrTE0JhNtV69wc"},
                  {"name":"Starbucks 1st fl Paragon","img":"http://drive.google.com/uc?export=view&id=10wYzZMgQMRMY1Xn_NyoO4IkND1LwW1bm"},
                  {"name":"Starbucks I'm Park","img":"http://drive.google.com/uc?export=view&id=1uzpFGjy1gPn4DiOKuLWL14xGM98iS4LJ"},
                  {"name":"Starbucks Siam Square One","img":"http://drive.google.com/uc?export=view&id=1VYGVsN95HhfcBLtzP7mMtREzNqQbSn_t"}];
    return (
      <div className="App">

        <header className="App-header">
    
          <h1 className="App-title">TEMYUNG</h1>
        </header>
        {
          data.map((d, idx) => {
            return (
             <div className="container">
              <img src={d.img}/>
                <div className="centered">{d.name}</div>
                <div style={{ margin: 10, width: 200 }}>
                  <Circle strokeWidth="6" percent={this.state.percent} />
                  <Line strokeWidth="4" percent={this.state.percent} />
                  <button onClick={this.restart}>Restart</button>
                </div>
            </div>
          )})
        }
      </div>
    );
  }
}

export default App;
