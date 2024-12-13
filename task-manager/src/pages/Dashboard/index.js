import { FiDelete, FiEdit, FiEdit2, FiList, FiPlus, FiSearch } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";

import { Link } from 'react-router-dom'

import { format } from 'date-fns'

import './dashboard.css'
import { useEffect, useState } from "react";
import { collection, doc, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../services/firebaseConnections";

import Modal from "../../components/Modal";

const listRef = collection(db, 'tasks')

export default function Dashboard() {

    const [tasksList, setTasksList] = useState([]);
    const [loadingTaskList, setLoadingTaskList] = useState(true);
    const [isEmptyTask, setIsEmptyTask] = useState(false)

    const [lastDocs, setLastDocs] = useState()
    const [loadMode, setLoadMore] = useState()

    const [showModal, setShowModal] = useState(false)
    const [detail, setDetail] = useState({})

    useEffect(() => {
        async function loadTasks() {
            try {
                const q = query(listRef, orderBy('created', 'desc'), limit(5))
                const queryTasks = await getDocs(q)
                setTasksList([])
                await updateState(queryTasks)
                setLoadingTaskList(false)
            }
            catch (er) {
                setLoadingTaskList(false)
                console.log(er)
            }
        }
        loadTasks();
    }, []);

    async function updateState(querySnapshot) {
        if (querySnapshot.size === 0) {
            console.log('Nenhuma Chamada Encontrada')
            setIsEmptyTask(true);
        } else {

            let lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({
                    taskId: doc.id,
                    client: doc.data().clientNome,
                    assunt: doc.data().title,
                    status: doc.data().status,
                    created: doc.data().created,
                    complemento: doc.data().complement,
                    createdFormat: format(doc.data().created.toDate(), "dd/MM/yyyy HH:mm:ss")
                })
            })
            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
            setLastDocs(lastDoc)
            // console.log(lastDoc)
            setTasksList(tasksList => [...tasksList, ...lista])
        }

        setLoadMore(false)
    }

    async function handleMore() {
        setLoadMore(true)

        const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(5))
        const queryMore = await getDocs(q)
        await updateState(queryMore)
        console.log(isEmptyTask)
    }

    function handleModal(item) {
        setShowModal(true)
        setDetail(item)
        // console.log(item);
    }

    return (
        <div>
            <Header />
            <div className="container">
                <Title name="Chamadas">
                    <FiList color="#000" size={24} />
                </Title>

                <div>
                    <Link to='/new' className="new-btn">
                        <FiPlus color="#fff" size={25} />
                        Novo Chamado
                    </Link>
                    {tasksList.length === 0 && (
                        <div>Nenhum Item Encontrado</div>
                    )}

                    <div className="container-dashboard">
                        {loadingTaskList ? (
                            <div>Buscando Itens...</div>
                        ) : (
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Cliente</th>
                                            <th scope="col">Assunto</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Cadastrado</th>
                                            <th scope="col">#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loadingTaskList ? (
                                            <tr>
                                                <td colSpan={6}>Buscando Itens...</td>
                                            </tr>
                                        ) :
                                            tasksList.map((item, index) => {
                                                return (
                                                    <tr key={item.taskId}>
                                                        <td data-label="Number">{index + 1}</td>
                                                        <td data-label="Cliente">{item.client}</td>
                                                        <td data-label="Assunto">{item.assunt}</td>
                                                        <td data-label="Status">
                                                            <span className="badge" style={{ backgroundColor: item.status === 'Aberto' ? 'green' : item.status === 'Progresso' ? 'blue' : 'grey' }}>
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                        <td data-label="Cadastrado">{item.createdFormat}</td>
                                                        <td data-label="#">
                                                            <button onClick={() => {handleModal(item)}} className="action-btn" style={{ backgroundColor: '#3583f6' }}><FiSearch color="#fff" size={25} /></button>
                                                            <Link to={`/new/${item.taskId}`} className="action-btn" style={{ backgroundColor: '#f6a935' }}><FiEdit2 color="#fff" size={25} /></Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                                {loadMode && (<h3>Buscando mais chamadas...</h3>)}
                                {!loadMode && !isEmptyTask && <button className="btn-more" onClick={handleMore}>Buscar Mais</button>}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <Modal 
                    conteudo={detail}
                    close={()=> {setShowModal(!showModal)}}
                />  
            )}
        </div>
    )
}