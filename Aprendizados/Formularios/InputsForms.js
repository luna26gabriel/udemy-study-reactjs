import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: 'teste@teste.com',
      senha: '',
      sexo: 'M'
    }

    this.trocaEmail = this.trocaEmail.bind(this);
    this.trocaSexo = this.trocaSexo.bind(this);
  }

  trocaEmail(e) {
    let valorDigitado = e.target.value;
    this.setState({email: valorDigitado});
  }

  trocaSexo(e) {
    let valorSelecionado = e.target.value;
    this.setState({sexo: valorSelecionado})

  }

  render() {
    return (
      <div>
        Email:
        <input type='email' name='email' placeholder='teste@teste.com' value={this.state.email}
          onChange={this.trocaEmail}/><br />
        Senha:
        <input type="password" name='senha' placeholder='123' value={this.state.senha}
          onChange={(e)=>{this.setState({senha: e.target.value})}}/><br />
        Sexo:
        <select name="sexo" value={this.state.sexo} onChange={this.trocaSexo}>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>

          <div>
            <h3>{this.state.email}</h3>
            <h3>{this.state.senha}</h3>
            <h3>{this.state.sexo}</h3>
          </div>
      </div> 
    )
  }
}

export default App