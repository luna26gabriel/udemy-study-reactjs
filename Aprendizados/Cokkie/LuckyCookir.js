import React, { Component } from 'react';
import './style.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textoFrase: ''
    };

    this.frasePick = this.frasePick.bind(this);
    this.frases = ['Siga os bons e aprenda com eles.', 'O bom-senso vale mais do que muito conhecimento.', 
      'O riso é a menor distância entre duas pessoas.', 
      'Deixe de lado as preocupações e seja feliz.',
      'Realize o óbvio, pense no improvável e conquiste o impossível.',
      'Acredite em milagres, mas não dependa deles.',
      'A maior barreira para o sucesso é o medo do fracasso.'];
  }

  frasePick() {
    let state = this.state;
    let numAle = Math.floor(Math.random() * this.frases.length);
    state.textoFrase = '" ' + this.frases[numAle] + ' "'
    this.setState(state);
  }

  render() {
    return (
      <div className='container'>
        <img src={require('./assets/biscoito.png')} className="img" alt=""/>
        <Botao nome="biscoito" acaoBtn={this.frasePick} />
        <h3 className="texto-frase" >{this.state.textoFrase}</h3>
      </div>
    )
  }
}

class Botao extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.acaoBtn} className='btn-biscoito'>{this.props.nome}</button>
      </div>
    )
  }
}

export default App