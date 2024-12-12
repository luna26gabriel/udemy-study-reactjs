import { FiUsers } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";

import './customers.css'
import { useState } from "react";

import { db } from '../../services/firebaseConnections'
import { addDoc, collection } from "firebase/firestore";

import { toast } from 'react-toastify'

export default function Customers() {

    const [name, setName] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [address, setAddress] = useState('')

    async function handleRegister(e) {
        e.preventDefault();

        if(name === "" || cnpj === "" || address === "") {
            toast.error("Preencha todos os campos")
            return
        }

        try {
            await addDoc(collection(db, 'customers'), {
                nameFantasia: name,
                cnpj: cnpj,
                address: address
            });
            setName('');
            setCnpj('');
            setAddress('');
            toast.success('Adicionado com Sucesso')
        }
        catch(er) {
            console.log(er);
        }
    }

    return (
        <div>
            <Header />
            <div className="container">
                <Title name="Clientes">
                    <FiUsers color="#000" size={24} />
                </Title>

                <div className="container-customer">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Nome Fantasia</label>
                        <input
                            type="text"
                            placeholder="Nome da Empresa"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />

                        <label>CNPJ Fantasia</label>
                        <input
                            type="text"
                            placeholder="CNPJ"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)} />

                        <label>Endereço Fantasia</label>
                        <input
                            type="text"
                            placeholder="Digite o Endereço da Empresa"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />

                        <button>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}