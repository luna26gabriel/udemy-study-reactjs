import { useState, useCallback } from "react"
import { Container, Form, SubmitButton } from "./style.js"
import { FaGithub, FaPlus } from 'react-icons/fa';

import api from '../../services/api'

export default function Main() {

    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([])

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
        async function submit() {
            try {
                const response = await api.get(`repos/${newRepo}`)
                console.log(response.data)
                const data = {
                    name: response.data.forks_url,
                }
                setRepositorios([...repositorios, data])
                setNewRepo('');
            }
            catch (er) {
                console.log(er)
            } 
        }
        submit();
    }, [newRepo, repositorios]);

    return (
        <div>
            <Container>

                <h1>
                    <FaGithub size={25}/>
                    Main
                </h1>

                <Form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Adicionar Repositorios" 
                        value={newRepo} 
                        onChange={(e)=>{setNewRepo(e.target.value)}}/>

                    <SubmitButton>
                        <FaPlus color="#fff" size={14} />
                    </SubmitButton>
                </Form>

            </Container>
        </div>
    )
}