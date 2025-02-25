import { useState } from 'react'
import { ButtonSubmit } from './Button'

import { NewUser } from './Transition'

export default function App() {

  const [message, setMessage] = useState("");

  async function handleRegister(formdata){
    //Fake Delay
    await new Promise(resolve => setTimeout(resolve, 2500))

    const nome = formdata.get("nome")
    const tarefa = formdata.get("tarefa")

    console.log(nome,":",tarefa)

    setMessage(`Bem Vindo ${nome}, tarefa atual: ${tarefa}`)
  }
  return (
    <div>
      <h1>Form + Action</h1>

      <form action={handleRegister}>
        <input 
          type="text" 
          name="nome"
          placeholder="Digite o Nome..."
          required
        /><br />
        <input 
          type="text" 
          name="tarefa"
          placeholder="Digite a Tarefa..."
          required
        /><br />
        <ButtonSubmit />
      </form>

      <h2>{message}</h2>
      <hr />

      <NewUser />
    </div>
  );
}