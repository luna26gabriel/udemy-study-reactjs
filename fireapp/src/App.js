import { useState, useEffect } from "react";
import { db, auth } from "./firebaseConection";
import { doc, 
        setDoc, 
        collection, 
        addDoc, 
        getDoc, 
        getDocs, 
        updateDoc, 
        deleteDoc,
        onSnapshot} from 'firebase/firestore';
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut,
         onAuthStateChanged
 } from 'firebase/auth';     
import './style.css';

function App() {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState({})

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, 'posts'), (onSnapshot)=> {
        var listaPosts = [];
        onSnapshot.forEach((doc) => {       
          listaPosts.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })       
        })
        setPosts(listaPosts);
      })
    }
    loadPosts();
  }, []);

  useEffect(()=>{
    async function checkLogin() {
      onAuthStateChanged(auth, (user)=>{
        if(user) {
          console.log(user);
          setUserDetail({
            uid: user.uid,
            email: user.email
          })
          setUser(true);          
        } else {
          setUser(false);
          setUserDetail({});
        }
      })
    }
    checkLogin();
  }, [])

  function clearAll() {
    setAutor('')
    setTitulo('')
    setIdPost('')
    console.log('Limpo!');
  }

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
      clearAll()
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

  async function editarPost() {
    const docRef = doc(db, 'posts', idPost);
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      clearAll()
    })
    .catch((er)=> {
      console.log(er);
    })
  }

  async function excluirPost(idPost) {
    // alert(idPost);
    const docRef = doc(db, 'posts', idPost);
    await deleteDoc(docRef)
    .then((response)=> {
      alert('Post Deletado com Sucesso');
      // buscarAllPost();
    })
    .catch((er)=>{      
      console.log(er);
    })
  }

  async function novoUsuario() {
    // alert('teste');
    await createUserWithEmailAndPassword(auth, email, senha)
    .then((value)=>{
      console.log("Cadastrado com Sucesso");
      setEmail('');
      setSenha('');
      console.log(value);
    })
    .catch((er)=>{
      if (er.code === 'auth/email-already-in-use') {
        alert('Email já registrado')
      } else if(er.code === 'auth/weak-password'){
        alert('Senha Fraca, digite pelo menos 6 Caracteres')
      }
      console.log(er);
    })
  }

  async function loginUsuario() {
    // alert('Teste')
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value)=>{
      console.log('user logando com sucesso');
      setUserDetail({
        uid: value.user.uid,
        email: value.user.email
      })
      setUser(true);
      setEmail('');
      setSenha('');
      console.log(value.user);
    })
    .catch((er)=>{
      console.log(er);
    })
  }

  async function deslogar() {
    await signOut(auth)
    .then(()=>{
      setUser(false);
      setUserDetail({})
    })
    .catch((er)=>{
      console.log(er);
    })    
  }

  return (
    <div className="App">
      <h1>ReactJS + Firebase :) </h1>

      {user && (
        <div>
          <strong>Seja bem-vindo(a) (tu ta logado)</strong><br />
          <span>Sua UId: <strong>{userDetail.uid}</strong> | Seu Email: <strong>{userDetail.email}</strong></span><br />
          <button onClick={deslogar}>Sair</button>
        </div>
      )}
      <div className="container">
        <h2>Usuários</h2>
        <label htmlFor="">Email</label>
        <input 
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          placeholder="Digite seu Email"/>
        <label htmlFor="">Senha</label>
        <input 
          type="password"
          value={senha}
          onChange={(e)=>{setSenha(e.target.value)}}
          placeholder="Digite seu Senha"/>

        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={loginUsuario}>Login</button>
      </div>

      <div className="container">
        <h2>Posts</h2>
        <label htmlFor="">ID do Post:</label>
        <input type="text" placeholder="Id do Post" value={idPost} onChange={(e)=>{setIdPost(e.target.value)}}
        />

        <label>Titulo: </label>
        <textarea  placeholder="Digite o Titulo" type="text" value={titulo} onChange={(e)=>{setTitulo(e.target.value)}}
        ></textarea>

        <label htmlFor="">Autor:</label>
        <input type="text" placeholder="Autor do Post" value={autor} onChange={(e)=>{setAutor(e.target.value)}}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={editarPost}>Atualizar Post</button>
        <button onClick={buscarAllPost}>Buscar Todos Item</button>

        <ul>
           { posts.map((post) => {
              return (
                <li key={post.id}>
                  <strong>ID: {post.id}</strong><br />Titulo: {post.titulo} | Autor: {post.autor}
                  <br/><button onClick={()=> excluirPost(post.id)}>Excluir</button>
                </li>
                
              )
            })
          }
        </ul>        
      </div>
    </div>
  );
}

export default App;