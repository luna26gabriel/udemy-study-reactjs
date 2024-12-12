import { useState, useEffect, useContext } from 'react'

import { FiPlusCircle } from 'react-icons/fi'
import Header from '../../components/Header'
import Title from '../../components/Title'

import { AuthContext } from '../../contexts/auth'
import { db } from '../../services/firebaseConnections'
import { collection, getDocs, getDoc, doc, addDoc } from 'firebase/firestore'

import './new.css'

const listRef = collection(db, 'customers')

export default function New() {

    const { user } = useContext(AuthContext)

    const [customers, setCustomers] = useState([])
    const [loadCustomer, setLoadCustomer] = useState(true)
    const [customerSelected, setCustomerSelected] = useState(0)

    const [complemento, setComplemento] = useState('');
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');

    useEffect(() => {
        async function loadCustomer(params) {
            try {
                const querySnapshot = await getDocs(listRef)
                let lista = [];
                querySnapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nameFantasia: doc.data().nameFantasia
                    })

                })
                if (querySnapshot.docs.size === 0) {
                    console.log('Nenhuma Empresa Encontrada')
                    setCustomers([{ id: 1, nameFantasia: 'Freela' }])
                    setLoadCustomer(false);
                    return
                }
                setCustomers(lista)
                setLoadCustomer(false);
            }
            catch (er) {
                console.log(er);
                setLoadCustomer(false);
                setCustomers([{ id: 1, nameFantasia: 'Freela' }])
            }
        }
        loadCustomer();
    }, [])

    function handleOptionChange(e) {
        setStatus(e.target.value)
    }

    function handleChangeSelect(e) {
        setAssunto(e.target.value)
        console.log(e.target.value)
    }

    function handleChangeCustumer(e) {
        setCustomerSelected(e.target.value)
    }

   async function handleRegister(e) {
        e.preventDefault();

        await addDoc(collection(db, 'tasks'), {
            client: customerSelected,
            title: assunto,
            status: status,
            complement: complemento 
        })
    }
    return (
        <div>
            <Header />
            <div className="container">
                <Title name='Novo Chamado' >
                    <FiPlusCircle color='#000' size={25} />
                </Title>

                <div className="container-new">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Cliente:</label>
                        {
                            loadCustomer ? (
                                <input type='text' disabled={true} value={'Buscando Empresas...'}></input>
                            ) : (
                                <select name="client" value={customerSelected} onChange={handleChangeCustumer}>
                                    {
                                        customers.map((item, index) => {
                                            return (
                                                <option key={index} value={index}>
                                                    {item.nameFantasia}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            )
                        }
                        <label>Assunto:</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option key={1} value="Suporte">Suporte</option>
                            <option key={2} value="Visita Tecnica">Visita Tecnica</option>
                            <option key={3} value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status:</label>
                        <div className='status'>
                            <input
                                type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={handleOptionChange}
                                checked={status === 'Aberto'}
                            />
                            <span>Em Aberto</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={handleOptionChange}
                                checked={status === 'Progresso'}
                            />
                            <span>Progresso</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={handleOptionChange}
                                checked={status === 'Atendido'}
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type="text"
                            placeholder='Escreva o Problema (Opcional)'
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button type='submit'>Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}