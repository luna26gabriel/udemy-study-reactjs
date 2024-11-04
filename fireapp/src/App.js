import { useState } from "react";
import { db } from "./firebaseConection";
import { doc, setDoc, collection, addDoc, getDoc, getDocs} from 'firebase/firestore';
import './style.css'
function App() {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const [posts, setPosts] = useState([]);

  async function handleAdd() {
    // await setDoc(doc(db, "posts", "24"), {
    //   titulo: titulo,
    //   autor: autor
    // })
    // .then(()=> {
    //   console.log('Dados Registrado')
    // })
    // .catch((er)=> {
    //   console.log(er);
    // })
    await addDoc(collection(db, 'posts'), {
      titulo: titulo,
      autor: autor
    })
    .then(()=>{
      setAutor('')
      setTitulo('')
      console.log('Deu bom')
    })
    .catch((er)=>{
      console.log(er);
    })
  }

  // async function buscarPost() {
  //   // alert('a')
  //   const postRef = doc(db, "posts", "123")

  //   await getDoc(postRef)
  //   .then((response)=> {
  //     console.log(response.data())
  //     setAutor(response.data().autor)
  //     setTitulo(response.data().titulo)
  //     console.log('Deu bom tbm')
  //   })
  //   .catch((er)=>{
  //     console.log(er);
  //   })
  // }

  async function buscarAllPost() {
    const postsRef = collection(db, 'posts');
    await getDocs(postsRef)
    .then((response)=> {   

      var lista = [];
      response.forEach((doc) => {       
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })       
      })
      setPosts(lista);
      // console.log(lista);

    })
    .catch((er)=> {
      console.log(er)
    })
  }

  return (
    <div className="App">
      <h1>ReactJS + Firebase :) </h1>
      <div className="container">
        <label>Titulo: </label>
        <textarea  placeholder="Digite o Titulo" type="text" value={titulo} onChange={(e)=>{setTitulo(e.target.value)}}
        ></textarea>

        <label htmlFor="">Autor:</label>
        <input type="text" placeholder="Autor do Post" value={autor} onChange={(e)=>{setAutor(e.target.value)}}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar 1 Item</button>
        <button onClick={buscarAllPost}>Buscar Todos Item</button>

        <ul>
           { posts.map((post) => {
              return (
                <li key={post.id}>Titulo: {post.titulo} | Autor: {post.autor}</li>
              )
            })
          }
        </ul>        
      </div>
    </div>
  );
}

export default App;