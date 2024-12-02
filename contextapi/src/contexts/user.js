import { useState, createContext } from 'react'

export const UserContext = createContext({});

function UserProvider({children}) {
    const [alunos, setAlunos] = useState('Gabriel Luna');
    const [qtdAlunos, setQtdAlunos] = useState('1');

    return (
        <UserContext.Provider value={{alunos, setAlunos, setQtdAlunos, qtdAlunos}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;