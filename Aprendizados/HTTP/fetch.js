import { useEffect, useState } from 'react';
import './style.css';

//https://sujeitoprogramador.com/rn-api/?api=posts

function App() {
  const [nutri, setNutri] = useState([]);

  useEffect(()=>{

    const urlApi = 'https://sujeitoprogramador.com/rn-api/?api=posts';

    function loadApi() {
      fetch(urlApi)
      .then((r)=> r.json())
      .then((json)=> {
        console.log(json)
        setNutri(json)
      })
      .catch((er)=>{

      })
    }

    loadApi();

  },[])
  return(
    <div className='container'>
      <header><strong>React Nutri</strong></header>

      {nutri.map((item)=>{
        return(
          <article className='post' key={item.id}>
            <a href="javascript.void(0);">
              <img src={item.capa} />
              <h2><strong>{item.titulo}</strong></h2>
              <p>{item.subtitulo}</p>
            </a>
          </article>
        )
      })}
    </div>
  )  
}

export default App