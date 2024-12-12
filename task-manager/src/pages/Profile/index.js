import Header from "../../components/Header";
import Title from "../../components/Title";
import avatarImg from '../../assets/avatar.png';

import { AuthContext } from "../../contexts/auth";
import { FiSettings, FiUpload } from 'react-icons/fi';
import { useContext, useState } from "react";

import { db, storage } from '../../services/firebaseConnections'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import './profile.css'
import { toast } from "react-toastify";

export default function Profile() {
    const { user, storageUser, setUser } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)

    const [nome, setNome] = useState(user && user.nome)
    const [email] = useState(user && user.email)

    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
            } else {
                alert('Envie uma Imagem do tipo: PNG ou JPEG')
                setImageAvatar(null)
                return;
            }
        }
    }

    async function handleUpload() {
        const currentUid = user.uid;

        try {
            const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)
            const uploadTask = await uploadBytes(uploadRef, imageAvatar);
            getDownloadURL(uploadTask.ref).then( async (downloadURL) => {
                let urlFoto = downloadURL;
                const docRef = doc(db, 'users', user.uid)
                await updateDoc(docRef, {
                    avatarUrl: urlFoto,
                    nome: nome
                })
                let data = {
                    ...user,
                    nome: nome,
                    avatarUrl: urlFoto
                }
                setUser(data);
                storageUser(data);
                toast.success('Atualizado Foto e Nome de Perfil com Sucesso')
            })         
        }
        catch (er) {
            console.log(er);
        }       
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // alert('Teste');
        if (nome !== '' && imageAvatar === null) {
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                nome: nome
            })
            let data = {
                ...user,
                nome: nome
            }
            setUser(data);
            storageUser(data)
            toast.success('Atualizado Nome com Sucesso')
        }
        if(imageAvatar !== null && nome !== '') {  
            console.log('photo')
            handleUpload(); 
        }
    }

    return (
        <div>
            <Header />
            <div className="container">
                <Title name='Meu Perfil'>
                    <FiSettings color='#000' size={24} />
                </Title>

                <div className="container-user">
                    <form className="form-profile" onSubmit={handleSubmit}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#fff" size={40} />
                            </span>
                            <input type="file" accept="image/*" onChange={handleFile} /><br />
                            {avatarUrl === null ? (
                                <img src={avatarImg} alt="Avatar do Usuário" width={250} height={250} />
                            ) : (
                                <img src={avatarUrl} alt="Avatar do Usuário" width={250} height={250} />
                            )}
                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} placeholder="Seu Nome" onChange={(e) => setNome(e.target.value)} />

                        <label>Email</label>
                        <input type="text" value={email} placeholder="Seu Email" disabled />

                        <button>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}