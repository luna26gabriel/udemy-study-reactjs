import React,{Component} from 'react';

//Class component, tem que ser letra Maiscula, vai ser mais 
// versário e com mais complexidade no futuro

class Team extends Component {
  render() {
    return(
      <div>
        <Sobre 
          name={this.props.name}
          age={this.props.age}
          job={this.props.job}
        />
        <hr/>
      </div>
    );
  }
}

class Sobre extends Component {
  render() {
    return(
      <div>
        <h2>Sou {this.props.name}</h2>
        <p>I work with {this.props.job}</p>
        <p>I am {this.props.age} years old</p>
      </div>
    );
  }
}

export default function App() {
  return (
    <div>
      <h1>Conheça Nossa Equipe: </h1>
      <Team name="Gabriel" job="Programm JR" age="24"/>
    </div>
  )
}