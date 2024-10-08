import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      status: false
    }
    this.entrar = this.entrar.bind(this)
    this.sair = this.sair.bind(this)
  }

  entrar() {
    this.setState({status: true})
  }

  sair() {
    this.setState({status: false})
  }

  render() {
    return (
      <div>
        {this.state.status ? 
        <div>
          <h1>Bem vindo</h1> 
          <button onClick={this.sair}>Sair do Sistema</button>
        </div>
        : 
        <div>
          <h2>Não logado</h2>
          <button onClick={this.entrar}>Entrar no Sistema</button>
        </div>
        }
      </div>
    )
  }
}

export default App