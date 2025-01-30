import { useParams } from "react-router-dom"

export default function Repositorios() {

    const {repositorio} = useParams();
    return (
        <div>
            <h1 style={{color: '#fff'}}>
                Repositorios : 
                {repositorio}
            </h1>            
        </div>
    )
}