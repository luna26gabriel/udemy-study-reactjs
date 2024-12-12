import avatarImg from '../../assets/avatar.png'

import { useContext } from 'react'

import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { FiHome, FiUser, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi'

import './header.css'

export default function Header() {

    const { user, logOut } = useContext(AuthContext);

    async function handleLogOut() {
        await logOut();
    }

    return (
        <div className="sidebar">
            <div className='menu-user'>
                <img src={user.avatarUrl == null ? avatarImg : user.avatarUrl} alt="Foto do Usuário" />
            </div>
            <div className="menu-navegation">
                <Link to='/dashboard'>
                    <FiHome color='#fff' size={24} />
                    <p>Chamadas</p>
                </Link>
                <Link to='/customers'>
                    <FiUsers color='#fff' size={24} />
                    <p>Clientes</p>
                </Link>
                <Link to='/profile'>
                    <FiUser color='#fff' size={24} />
                    <p>Perfil</p>
                </Link>
                <Link to='/settings'>
                    <FiSettings color='#fff' size={24} />
                    <p>Settings</p>
                </Link>
                <button onClick={handleLogOut}>
                    <FiLogOut color='#fff' size={24} />
                    <p>Sair</p>
                </button>
            </div>
        </div>
    )
}