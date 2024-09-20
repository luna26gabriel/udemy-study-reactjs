import React, { Component } from 'react';

class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      nome: 'Gabriel',
      contador: 0
    };

    this.plus = this.plus.bind(this);
    this.minus = this.minus.bind(this);
  }

  plus(){
    console.log("aumentar");
    let state = this.state;
    state.contador += 1;
    state.nome = 'Luna';
    this.setState(state)
  }
  
  minus() {
    console.log("diminuir");
    let state = this.state;
    if(state.contador < 1) {
      return
    }
    state.contador -= 1;
    state.nome = 'San Juan';
    this.setState(state)
  }

  render() {
    return (
      <div>
        <h1>Contador</h1>
        {this.state.nome}
        <h3>
          <button onClick={this.minus}>-</button>
          {this.state.contador}
          <button onClick={this.plus}>+</button>
        </h3>
      </div>
    )
  }
}

export default App