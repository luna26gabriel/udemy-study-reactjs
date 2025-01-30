import { useState, useCallback, useEffect } from "react"
import { Container, Form, SubmitButton, List, DeleteButton } from "./style.js"
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom' 

import api from '../../services/api'

export default function Main() {

    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    // Buscar
    useEffect(()=>{
        const repoStorage = localStorage.getItem('repos');

        if(repositorios) {
            setRepositorios(JSON.parse(repoStorage))
        }
    },[])

    // Salvar Alterações
    useEffect(()=>{
        localStorage.setItem('repos', JSON.stringify(repositorios));
    },[repositorios])

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
        setLoading(true);
        setAlert(null);
        async function submit() {
            try {
                if(newRepo === '') {
                    throw new Error('Repositorio está incorreto')
                }
                const hasRepo = repositorios.find(repo => repo.name === newRepo);
                console.log(hasRepo)
                if(hasRepo !== undefined) {
                    throw new Error('Repositorio Duplicado')
                }
                const response = await api.get(`repos/${newRepo}`);
                console.log(response.data)
                const data = {
                    name: response.data.full_name,
                    link: response.data.git_url
                }
                setRepositorios([...repositorios, data])
                setNewRepo('');
            }
            catch (er) {       
                setAlert(true)
                console.log(er);                
            } finally {
                setLoading(false);
            }
        }
        submit();
    }, [newRepo, repositorios]);

    function handleInput(e) {
        setAlert(false);
        setNewRepo(e.target.value);
    }

    const handleDelete = useCallback((name)=> {
        const find = repositorios.filter(r=>r.name !== name)
        setRepositorios(find);
    }, [repositorios])

    return (
        <div>
            <Container>

                <h1>
                    <FaGithub size={25}/>
                    Main
                </h1>

                <Form onSubmit={handleSubmit} error={alert}>
                    <input 
                        type="text"
                        placeholder="Adicionar Repositorios" 
                        value={newRepo} 
                        onChange={(e)=>{handleInput(e)}}/>

                    <SubmitButton loading={loading ? 1 : 0}>
                        {loading ? (
                                <FaSpinner color="#fff" size={14}/>
                            ) : (
                                <FaPlus color="#fff" size={14} />
                            )}                        
                    </SubmitButton>
                </Form>

                <List>
                    {repositorios.map(repo => (
                        <li key={repo.name}>
                            <span>
                                <DeleteButton onClick={()=> handleDelete(repo.name)}>
                                    <FaTrash size={14} color="#f00"/>
                                </DeleteButton>
                                {repo.name}
                            </span>
                            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                                <FaBars size={20}/>
                            </Link>
                        </li>
                    ))}
                </List>

            </Container>
        </div>
    )
}