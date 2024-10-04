import React, { Component } from 'react';
import './style.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numero: 0,
      btn: 'Go'
    }    
    this.timer = null;
    this.go = this.go.bind(this);
    this.clear = this.clear.bind(this);
  }

  go() {   
    let state = this.state;     
    console.log('start');   

    if(this.timer !== null) {      
      clearInterval(this.timer);
      this.timer = null;
      state.btn = 'GO';
    } else {         
      this.timer = setInterval(()=>{   
        let state = this.state;     
        state.numero += 0.1;
        this.setState({state});        
      },100);
      state.btn = 'PAUSE';
    }
    this.setState({state});
    
  }

  clear() {
    console.log('clear');
    if(this.timer !== null) {      
      clearInterval(this.timer);
      this.timer = null;      
    } 

    let state = this.state;
    state.numero = 0;
    state.btn = 'GO';
    this.setState({state});
  }

  render() {
    return (
      <div className='container'>
        <img src={require('./assets/cronometro.png')} alt="" className='img'/>
        <a className='timer'>{this.state.numero.toFixed(1)}</a>
        <div className='area-btn'>
          <a className='-btn' onClick={this.go}>{this.state.btn}</a>
          <a className='-btn' onClick={this.clear}>Clear</a>
        </div>
      </div>
    )
  }
}

export default App

{/* <style>
.container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.timer {
    font-size: 250px;
    margin-top: -400px;
    color: #fff;
}
.area-btn {
    margin-top: 170px;
    display: flex;
    gap: 10px;
}
.-btn {
    width: 200px;
    background-color: transparent;
    border: 5px solid #fff;
    font-size: 30px;
    text-align: center;
    border-radius: 10px;
    text-transform: uppercase;
    cursor: pointer;
}
</style> */}