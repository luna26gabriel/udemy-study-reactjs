import { useEffect, useState } from 'react';

import { auth, db } from '../../firebaseConection';
import { signOut } from 'firebase/auth';

import {
    addDoc,
    doc,
    deleteDoc,
    getDoc,
    updateDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where
} from 'firebase/firestore';

import './admin.css';

export default function Admin() {

    const [tarefa, setTarefa] = useState('')
    const [idTarefa, setIdTarefa] = useState('')
    const [user, setUser] = useState({})

    const [tarefasLista, setTarefasLista] = useState([]);

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem('@datailUser')
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail);
                const tarefasRef = collection(db, 'tarefas')
                const q = query(
                    tarefasRef,
                    orderBy('created', 'desc'),
                    where('userUid', '==', data?.uid)
                )
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = []
                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    // console.log(lista)
                    setTarefasLista(lista);
                })
            }
        }
        loadTarefas();
    }, []);

    async function handleRegister(e) {
        e.preventDefault()
        // alert('click')
        if (tarefa === '') {
            alert('Digite sua Tarefa');
            return
        }
        try { 
            if(idTarefa) {
                const tarefaRef = doc(db, 'tarefas', idTarefa);
                await updateDoc(tarefaRef, {
                    tarefa: tarefa,
                    modified: new Date(), 
                })
                setTarefa(''); 
                setIdTarefa('');
                console.log('Tarefa Atualizada'); 
            } else {
                await addDoc(collection(db, "tarefas"), { 
                    tarefa: tarefa, 
                    created: new Date(), 
                    userUid: user?.uid 
                }); 
                setTarefa(''); 
                console.log('Tarefa Registrada'); 
            }
        } catch (er) { 
            console.log(er);
        }
    }

    async function handleLogout() {
        await signOut(auth);
    }

    async function deletaTarefa(id) {
        const tarefaDoc = doc(db, 'tarefas', id);
        await deleteDoc(tarefaDoc)
        .then((response)=> {
            console.log('Tarefa Deletada com Sucesso');
            // buscarAllPost();
        })
        .catch((er)=>{      
            console.log(er);
        })
    }

    async function editarTarefa(id) {
        const tarefaDoc = doc(db, 'tarefas', id);
        await getDoc(tarefaDoc)
        .then((data)=> {
            // console.log(data.data().tarefa)
            setTarefa(data.data().tarefa)
            setIdTarefa(id)
            console.log('Tarefa Buscada com Sucesso');
            // buscarAllPost();
        })
        .catch((er)=>{      
            console.log(er);
        })
    }
    
    return (
        <div className="admin-container">
            <h2>AdMIN Console</h2>
            <hr />
            <h3>Minhas Tarefas</h3>

            <form onSubmit={handleRegister}>
                <textarea
                    type="textarea"
                    placeholder='Digite sua Tarefa'
                    value={tarefa}
                    onChange={(e) => setTarefa(e.target.value)} />
                <button className={idTarefa ? 'btn-edit':''} type='submit'>Registrar</button>
            </form>

            {tarefasLista.length > 0 && (
                tarefasLista.map((tarefa) => {
                    return (
                        <article key={tarefa.id}>
                            <p>{tarefa.tarefa}</p>
                            <div>
                                <button onClick={()=>editarTarefa(tarefa.id)} className='btn-edit'>Editar</button>
                                <button onClick={()=>deletaTarefa(tarefa.id)} className='btn-delete'>Concluir</button>
                            </div>
                        </article>
                    )
                })
            )}
            <hr />
            <button onClick={handleLogout} className='btn-logout'>Sair</button>
        </div>
    )
}