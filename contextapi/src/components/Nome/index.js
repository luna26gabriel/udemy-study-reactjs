export default function Nome({nome, mudaNome}) {
    return (
        <div className="container">
            <h2>Ola, {nome}</h2>
            <br />
            <button onClick={()=>{mudaNome('Gabriel')}}>Trocar Nome</button>
        </div>
    )
}