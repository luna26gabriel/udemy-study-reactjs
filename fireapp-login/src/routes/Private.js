import { useEffect, useState } from 'react'

import { auth } from '../firebaseConection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

export default function Private ({children}) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);
    useEffect(()=>{
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user)=>{
                if(user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }
                    localStorage.setItem('@datailUser', JSON.stringify(userData))
                    setLoading(false)
                    setSigned(true)
                } else {
                    setLoading(false)
                    setSigned(false)
                }
            })
        }
        checkLogin();
    }, []);
 
    if(loading) {
        return (
            <div></div>
        )
    }
    if(!signed) {
        return <Navigate to='/' />
    }

    console.log('passou aqui')    
    return children //Children retorna o que está dentro da TAG, nesse caso o <Admin />
}