import React, {useState, useEffect, useMemo, useCallback} from 'react';
import './style.css';

function App() {

  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState('');

  useEffect(()=>{
    const tarefasStorage = sessionStorage.getItem('tarefas');
    if(tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage))
    }    

    return () => {};
  },[]);

  useEffect(()=>{
    if(tarefas.length > 0){
      sessionStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
  },[tarefas])

  const handleAdd = useCallback(() => {
    setTarefas([...tarefas,input]);    
    setInput('')
  },[input])

  const totalTarefas = useMemo(()=> tarefas.length,[tarefas])

  return(
    <div>
       <input type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
       <button type='button' onClick={handleAdd}>Add</button>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>     
      <br/>
      <strong>Você tem {totalTarefas} tarefas! </strong>
    </div>
  )  
}

export default App