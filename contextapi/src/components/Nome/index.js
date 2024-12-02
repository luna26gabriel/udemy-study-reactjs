
import { useContext } from "react"
import { UserContext } from "../../contexts/user"

export default function Nome() {
    const {alunos, setAlunos, qtdAlunos, setQtdAlunos} = useContext(UserContext);
    return (
        <div className="container">
            <h2>Ola, {alunos}</h2>
            <br />
           <button onClick={()=> {
                setAlunos('Ana amor')
                setQtdAlunos(2)
            }}>Troca Nome</button>
           <p>{qtdAlunos}</p>
        </div>
    )
}