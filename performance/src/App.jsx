import './App.css'
import { Header } from './Header';

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().nonempty('O campo nome é Obrigtório'),
  email: z.string().email('Digite em Email Válido').nonempty("O campo email é Obrigatório"),
  username: z.string().min(3, 'O Username deve possuir no minimo 3 caracteres').max(15, 'O Username deve possuir no máximo 15 caracteres').nonempty('O campo Username é Obrigatório'),
  phone: z.string().refine((value)=> /^\d{2} ?\d{9}$/.test(value), {
    message: "Digite um telefone valido no formato: DD + 9 números"
  })
})

function App() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  function handleSave(data) {
    console.log(data)
  }


  return (
    <div className="container">
      <h1>React</h1>
      <Header />

      <form className="form" onSubmit={handleSubmit(handleSave)}>
        <input
          type="text"
          placeholder="Digite seu nome..."
          className="input"
          {...register('name')}
          id='name'
        />

        <input
          type="text"
          placeholder="Digite seu email..."
          className="input"
          {...register('email')}
          id='email'
        />
        <input
          type="text"
          placeholder="Digite seu username..."
          className="input"
          {...register('username')}
          id='username'
        />     
        <input
          type="text"
          placeholder="Digite seu telefone..."
          className="input"
          {...register('phone')}
          id='phone'
        />    

        <button className="button" type="submit">Enviar</button>

        <p className='errors'>
          {errors.name && (<span>{errors.name.message}</span>)}
          <br />
          {errors.email && (<span>{errors.email.message}</span>)}
          <br />
          {errors.username && (<span>{errors.username.message}</span>)}
          <br />
          {errors.phone && (<span>{errors.phone.message}</span>)}
        </p>
      </form>
    </div>
  )
}

export default App
