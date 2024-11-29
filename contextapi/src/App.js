import Alunos from './components/Alunos'

import { useState } from 'react'
import UserProvider from './contexts/user';

export default function App() {
  const [nomeAluno, setNomeAluno] = useState('JAO');
  return (
    <UserProvider>
      <div className="App">
        <div>Escolha</div>
        <Titulo>Titulo do site uhul</Titulo>
        <Alunos nome={nomeAluno} mudaNome={setNomeAluno} />
      </div>
    </UserProvider>
  );
}

function Titulo({ children }) {
  return (
    <h1>{children}</h1>
  )
}