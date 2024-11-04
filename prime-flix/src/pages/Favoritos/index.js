import { useEffect, useState } from 'react';
import './favoritos.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos() {

    const [lista, setLista] = useState([]);

    useEffect(()=>{
        var favoritos = localStorage.getItem('filme_salvos');
        setLista(JSON.parse(favoritos) || []);
    },[]);

    function removeFromLista(id) {
        console.log(lista.indexOf(id));
        let novaLista = lista.filter((item)=>{
            return (item.id !== id);
        })
        // console.log(novaLista);
        toast.success('Filme removido com sucesso')
        setLista(novaLista);
        localStorage.setItem('filme_salvos', JSON.stringify(novaLista));
    }

    return (
      <div className='favoritos'>

        <h1>Meus Filmes</h1>

        {lista.length === 0 && (
            <div>Nenhum Filme na Lista ainda ...</div>
        )}
        <div className='lista-favoritos'>
            {lista && lista.map((filme)=>{
                return (
                    <div key={filme.id} className='item-lista'>
                        <h2>{filme.title}</h2>
                        <Link to={`/filme/${filme.id}`}>Acessar Detalhes</Link>
                        <div className='btn'>
                            <button onClick={() => removeFromLista(filme.id)} className='btn-remove'>Remover</button>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
  }
  
  export default Favoritos;
  