import { useParams } from "react-router-dom"

function Produto() {

    const { id } = useParams();
    return (
        <div>
            <h2>
                Coisinha: {id} 
            </h2>
        </div>
    )
}
export default Produto