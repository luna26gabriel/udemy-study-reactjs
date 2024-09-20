import React from 'react';

//Statless component, tem que ser letra Maiscula
// const BemVindo = (pamr) => <h2>Bem Vindo</h2>;

const Team = (props) => {
  return (
    <div>
      <Info username={props.name} jobName={props.job} idade={props.idade} />
    </div>
  );
}

const Info = (props) => {
  return (
    <div>
      <h2>Sou {props.username}</h2>
      <h3>job: {props.jobName}</h3>
      <p>Tenho {props.idade}</p>
      <Social/>
      <hr/>
    </div>
  )
}

const Social = () => {
  return (
    <div>
      <a>Facebook </a>
      <a>Instagram </a>
      <a>Likedin </a>
      <a>X </a>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Conheça Nossa Equipe</h1>
      <Team name="Luna" job="Programador Jr" idade="24"/>
      <Team name="Batata" job="Dorminhoca Sn" idade="14"/>
    </div>
  )
}