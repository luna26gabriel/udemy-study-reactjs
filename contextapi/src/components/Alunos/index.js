import Nome from "../Nome"
import { UserContext } from "../../contexts/user"
import { useContext } from "react"

export default function Alunos() {
    const {alunos} = useContext(UserContext)
    return (
        <div className="container">
            <h2>Component Alunos, Nome: {alunos}</h2>
            <Nome/>
        </div>
    )
}