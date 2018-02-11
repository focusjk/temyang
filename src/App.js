import './App.css';

import { Circle, Line } from 'rc-progress';
import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import logo from './logo.svg';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      percent: 0,
      data:[{"name":"constructor Ekamai 13","img":"http://drive.google.com/uc?=view&id=1T7iy454QOXyHpMqKyQYrTE0JhNtV69wc","space":"13"},
                  {"name":"Starbucks 1st fl Paragon","img":"http://drive.google.com/uc?export=view&id=10wYzZMgQMRMY1Xn_NyoO4IkND1LwW1bm","space":"86"},
                  {"name":"Starbucks I'm Park","img":"http://drive.google.com/uc?export=view&id=1uzpFGjy1gPn4DiOKuLWL14xGM98iS4LJ","space":"43"},
                  {"name":"Starbucks Siam Square One","img":"http://drive.google.com/uc?export=view&id=1VYGVsN95HhfcBLtzP7mMtREzNqQbSn_t","space":"97"}]
   };
    this.show = this.show.bind(this);
    console.log(this.state.data)
  }

  componentDidMount() {
    axios.get('http://128.199.97.10:3000/coworking/coworkinglist').then((res) => {
      console.log(res);
      const res2 = [{"name":"Sheldon Ekamai 13","img":"http://drive.google.com/uc?=view&id=1IkslDiOCDdAHeLJD4uk9Tl5dopwtspIw","space":"13"},
                  {"name":"Starbucks 1st fl Paragon","img":"http://drive.google.com/uc?export=view&id=1zRQcr2H3Tu6hSQTH0s2O5zXbf9y-5uPT","space":"86"},
                  {"name":"Starbucks I'm Park","img":"http://drive.google.com/uc?export=view&id=13aeitmqPAyTsoXshrpuyD5hjY9cVB91q","space":"43"},
                  {"name":"Starbucks Siam Square One","img":"http://drive.google.com/uc?export=view&id=1ewIhLQzIzZaKbRYpQKj77Pqu08Ya4tNn","space":"97"}]
      this.setState({data: res2})
    }, (error) => {
      console.log('get error');
    })
  }

  show(x,id) { 
      this.setState({selected: id, percent: x});
      if(x>=75){
        this.setState({color: '#FF260F'});
      }else if(x>=25){
        this.setState({color: '#FFCD1B'});
      }else{
        this.setState({color: '#1DFF26'});
      }

  }

  render() {
    const data1 = [{"name":"Sheldon Ekamai 13","img":"http://drive.google.com/uc?=view&id=1T7iy454QOXyHpMqKyQYrTE0JhNtV69wc","space":"13"},
                  {"name":"Starbucks 1st fl Paragon","img":"http://drive.google.com/uc?export=view&id=10wYzZMgQMRMY1Xn_NyoO4IkND1LwW1bm","space":"86"},
                  {"name":"Starbucks I'm Park","img":"http://drive.google.com/uc?export=view&id=1uzpFGjy1gPn4DiOKuLWL14xGM98iS4LJ","space":"43"},
                  {"name":"Starbucks Siam Square One","img":"http://drive.google.com/uc?export=view&id=1VYGVsN95HhfcBLtzP7mMtREzNqQbSn_t","space":"97"}];
    
    const {data} = this.state
    console.log(data)

    const { selected } = this.state

    return (
      <div className="App">

        <header className="App-header">
    
          <h1 className="App-title">TEMYUNG</h1>
        </header>
        {
          data.map((d, idx) => {
            return (
              <div>
                <div className='container' onClick={() => this.show(d.space,idx)} >
                <img src={d.img}/>
                  <div className="centered">{d.name}</div>
                  <div className="bar" style={{ margin: 0, width: 200 }}>
                    {selected == idx && <Line strokeWidth="4" percent={this.state.percent} strokeColor={this.state.color}/> }
                  </div>
              </div>
            </div>
          )})
        }
      </div>
    );
  }
}

export default App;
