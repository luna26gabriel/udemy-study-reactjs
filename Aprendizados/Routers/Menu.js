import { Link } from "react-router-dom"

function Menu() {
    return (
        <header>
            <h1>Aoba</h1>        
            <div>
                <Link to="/">HOME</Link>
                <Link to="/sobre">Sobre</Link>
                <Link to="/contato">Contato</Link>
            </div> 
        </header>
    )
}

export default Menu;