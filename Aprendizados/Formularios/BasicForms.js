import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      pass: '',
      error: ''
    };

    this.cadastrar = this.cadastrar.bind(this)
  }

  cadastrar(e) {   
    const {name, email, pass} = this.state;
    if(name !== '' && email !== '' && pass !== '') {       
      alert(`Nome: ${name} \nEmail: ${email} \nSenha: ${pass}`);
    } else {
      this.setState({error: 'Preencha os dados corretamente'})
    }
    e.preventDefault();
    
  }

  render() {
    return (
      <div>
        <h1>Novo Usuário</h1>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.cadastrar}>
          <input type="text" placeholder="Your Name" value={this.state.name} onChange={(e)=> this.setState({name: e.target.value})}/><br />
          <hr />
          <input type="email" placeholder="Your Email" value={this.state.email} onChange={(e)=> this.setState({email: e.target.value})}/><br />
          <hr />
          <input type="password" placeholder="Your Password" value={this.state.pass} onChange={(e)=> this.setState({pass: e.target.value})}/><br />
          <hr />
          <button type='submit'>Cadastrar</button>
        </form>
      </div> 
    )
  }
}

export default App