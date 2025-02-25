import { useState, useActionState } from 'react'

export default function App() {

  async function handleSubmit(prevState, formData) {
    await new Promise(resolve => setTimeout(resolve, 2500))

    const nome = formData.get('nome')

    console.log(prevState);

    if(nome.length < 3){
      return {
        text: 'Digite um nome maior!'
      }
    }
    return {
      text: `Bem Vindo ${nome}`
    }
  }

  const [message, formAction, pending] = useActionState(handleSubmit, {text: 'Sem Nome'} )

  return (
    <div>
      <h1>useActionState</h1>

      <form action={formAction}>
        <input type="text" placeholder='Digite seu Nome...' name='nome'/>
        <button disabled={pending}>
          {pending ? 'Enviando...' : 'Cadastrar'}
        </button>
      </form>

      {message && <h1>{message.text}</h1>}

    </div>
  );
}