import React, { Component } from 'react';

class App extends Component {

  constructor (props) {
    super(props);
    // Usando a STATE é possível mudar o valor da variavel, 
    // coisa que dentro do props apenas não é possível
    this.state = {
      hora: '00:00:00'
    };
  }

  componentDidMount() {
    setInterval(()=>{
      this.setState({hora: new Date().toLocaleTimeString()})
    }, 1000)
  }

  componentDidUpdate() {
    console.log('Atualizou')
  }

  // shouldComponentUpdate() {

  // }

  render() {
    return (
      <div>
        <h1>Meu Projeto {this.state.hora}</h1>
      </div>
    )
  }
}

export default App

// - Inicialização
// Nesta fase, o componente React se prepara para sua inicialização, configurando os estados iniciais e props padrões se houverem.

// - Montagem:
// Depois de preparar com todas as necessidades básicas, estado e props, o nosso Componente React está pronto para ser montado no DOM do navegador.

// componentWillMount() É executado quando o componente estiver prestes a ser montado no DOM da página. Assim, após esse método ser executado o componente irá criar o nó no navegador. Todas as coisas que você deseja fazer antes do componente ser montado, devem ser definidas aqui.

// componentDidMount() Este é o método que é executado depois que o componente foi montado no DOM

// - Atualização
// Esta fase começa quando o componente React já nasceu no navegador e cresce recebendo novas atualizações. O componente pode ser atualizado de duas maneiras, através do envio de novas props ou a atualização do seu estado.

// componentDidUpdate() é chamado imediatamente após a atualização.

// componentWillUpdate() É executado somente quando shouldComponentUpdatedevolver true.

// - Desmontagem
// Nesta fase, o componente não é mais necessário e será desmontado do DOM. O método que se chama nesta fase é o:
// componentWillUnmount()