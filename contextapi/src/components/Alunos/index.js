import Nome from "../Nome"

export default function Alunos({nome, mudaNome}) {
    return (
        <div className="container">
            <h2>Component Alunos</h2>
            <Nome nome={nome} mudaNome={mudaNome}/>
        </div>
    )
}