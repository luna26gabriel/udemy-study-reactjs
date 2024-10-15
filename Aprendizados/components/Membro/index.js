import React, {Component} from "react";

class Membro extends Component {

    constructor(props){
        super(props);
        this.state = {
            nome: props.nome
        };
        this.entrar = this.entrar.bind(this)

    }

    entrar(name) {
        this.setState({nome: name})
        console.log('clicar');
    }

    render(){
        return (
            <div>
                Bem Vindo {this.state.nome}
                <button onClick={() => this.entrar('Luna')}>
                    Entrar como Luna
                </button>
                <button onClick={() => this.setState({nome: 'Gabriel'})}>
                    Sair como Luna
                </button>
            </div>
        )
    }
}

export default Membro;