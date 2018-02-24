import './App.css';

import { Circle, Line } from 'rc-progress';
import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import axios from 'axios';
import logo from './logo.svg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      data: [],
      isClicked: [],
   };
    this.show = this.show.bind(this);
    console.log(this.state.data)
  }

  componentDidMount() {
    axios.get('http://128.199.97.10:3000/coworking/coworkinglist').then((res) => {
      console.log(res);
      let myIsClicked = []
      res.data.map((obj) => {
        myIsClicked.push(false)
      })
      this.setState({data: res.data, isClicked: myIsClicked});
    }, (error) => {
      console.log('get error');
    })
  }

  show(x,idx, data2) { 
    console.log('click')
    axios.put('http://128.199.97.10:3000/coworking/addclick/' + data2._id, {}).then((data) => {
      console.log(data);
      let newObj = data.data.msg;
      let obj = this.state.data;
      for(var i = 0; i < obj.length; i++) {
        if(obj[i]._id == newObj._id) {
          obj[i] = newObj;
        }
      }

      if(!this.state.isClicked[idx]) {

        axios.get('http://freegeoip.net/json/').then((data) => {
          console.log(data);
          let objBody = data.data;
          objBody.coworking_name = data2.name;
          objBody.coworking_id = data2._id;
          axios.post('http://128.199.97.10:3000/coworking/addstatclick/', objBody).then(() => {
            console.log('update stat');
          })
        })

        axios.put('http://128.199.97.10:3000/coworking/addclick2/' + data2._id, {}).then((data) => {
          console.log('click2');
        }, (error) => {
          console.log('click2 error');
        });
      }  
      let obj2 = this.state.isClicked;
      obj2[idx] = true;

      this.setState({selected: idx, percent: x, data: obj, isClicked: obj2});
      if(x>=75){
        this.setState({color: '#FF260F'});
      }else if(x>=25){
        this.setState({color: '#FFCD1B'});
      }else{
        this.setState({color: '#1DFF26'});
      }
    }, (error) => {
      console.log('click error');
    });
  }

  render() {
    const {data} = this.state
    console.log(data)
    const { selected } = this.state

    return (
      <div className="App">
        <div className="App-title">
          <img src="http://drive.google.com/uc?export=view&id=1CspT1SFo3W8TbWiJ63y0NJBMz69c-LON"style={{ height: '70px' }}/>
          <div className="iconText">BETA</div>
        </div>
        <div className='content'>
        {
          data.map((d, idx) => {
            return ( 
              <div>
                <div className='container' onClick={() => this.show(d.space,idx, d)} >
                <img src={d.img} style={{ height: '120px' }}/>
                <div className="centered">{d.name}</div>
                <div>

                {selected == idx && 
                  <div className="bar" style={{ margin: 0, width: 200 }}>
                    <Line strokeWidth="4" trailWidth="4" trailColor="#D9D9D9" percent={this.state.percent} strokeColor={this.state.color} /> 
                    <div className="barStatus">Updated: {d.last_update}</div>
                  </div>
                }
                {d.name == 'SHELDON EKAMAI' && 
                  <a href="https://www.facebook.com/temyungapp/posts/408607112928362" onclick="trackOutboundLink('https://www.facebook.com/temyungapp/posts/408607112928362'); return false;" className='button topRight'>FREE BOARDGAME CICK HERE!</a>
                }
                </div>
              </div>
            </div>
          )})
        }
        </div>
        <div class="">
        <a href='https://www.facebook.com/temyungapp/' class="fa fa-facebook"></a>
        </div>
      </div>
    );
  }
}

export default App;
