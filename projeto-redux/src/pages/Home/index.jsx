import styles from './home.module.css'
import { Header } from '../../components/header'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { deleteAddress, fetchUsers, fetchUserById } from '../../redux/user/slice'

export function Home() {
  const dispatch = useDispatch();
  const { user, users, loading } = useSelector((state) => state.user)

  console.log(user);

  function handleDeleteAddress(){
    dispatch(deleteAddress());
    alert("Endereço deletado com sucesso!")
  }

  function handleFetchUsers(){
    dispatch(fetchUsers());
  }

  function handleFetchUserByID(){
    const id = 10;
    dispatch(fetchUserById(id));
    // alert('ola')
  }

  return (
    <>
    <Header/>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Login
          </Link>
          <Link to="/painel" className={styles.link}>
            Painel
          </Link>
          <Link to="/address" className={styles.link}>
            Meus endereços
          </Link>
        </nav>

        <main className={styles.content}>
          <div className={styles.message}>
            <h1 className={styles.title}>
              Olá {user ? (user.name) : 'Visitante'}, bem vindo!
            </h1>

            {user && (
              <span>Email: {user.email} </span>
            )}
           
            {user && user.address && (
              <>
                <strong className={styles.addressLabel}>Endereço atual:</strong>
                <div className={styles.address}>
                  <p>{user.address.location}, n {user.address.number}</p>
                  
                  <button onClick={handleDeleteAddress}>Deletar endereço</button>
                </div>
              </>
            )}

            <hr />
            <br />

            <h2>Lista de Usuários</h2>
            <button onClick={handleFetchUsers}>Buscar Usuários</button>
            <button onClick={handleFetchUserByID}>Buscar Usuários por ID</button>
            <br />

            {loading && (<strong>Carregando...</strong>)}
            {!loading && users.map((user) => (
              <div key={user.id}>
                <p>ID {user.id} - {user.name} | Username: {user.username} | Email: {user.email}</p>
              </div>
            ))}
          </div>

        </main>
      </div>
    </>
  )
}
