import { useState, createContext, useEffect } from 'react'
import { auth, db } from '../services/firebaseConnections'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const navegate = useNavigate();

    useEffect(()=> {
        async function loadUser() {
            const storageuser = localStorage.getItem('@tickestPRO');
            if(storageuser) {

                setLoading(false);
                setUser(JSON.parse(storageuser));
            }
            setLoading(false);
            console.log(user)
        }        
        loadUser();
    }, [])

    async function signIn(email, password) {
        setLoadingAuth(true);
        try {          
            const value = await signInWithEmailAndPassword(auth, email, password)
            let uid = value.user.uid;
            const docRef = doc(db, 'users', uid)
            const docSnap = await getDoc(docRef)

            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false)
            toast.success("Bem Vindo")
            navegate('/dashboard')
        }
        catch (er) {
            console.log(er);
            setLoadingAuth(false)
            toast.error('Ops! Algo deu errado, tente novamente');
        }
    }

    function storageUser(data) {
        localStorage.setItem('@tickestPRO', JSON.stringify(data));
    }

    async function signUp(email, password, name) {
        setLoadingAuth(true);
        try {
            const value = await createUserWithEmailAndPassword(auth, email, password);
            let uid = value.user.uid;
            console.log(uid);

            await setDoc(doc(db, 'users', uid), {
                nome: name,
                avatarUrl: null
            })
            let data = {
                uid: uid,
                nome: name,
                email: value.user.email,
                avatarUrl: null
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Bem Vindo ao Sistema')
            navegate('/dashboard')
            // console.log(setUserFirebase)
        }
        catch (er) {
            if (er === 'auth/weak-password') {
                alert('Senha muito Curta');
            }
            console.log(er);
            setLoadingAuth(false);
        }
    }

    async function logOut() {
        await signOut(auth)
        localStorage.removeItem('@tickestPRO');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            logOut,
            loadingAuth,
            loading,
            storageUser,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}