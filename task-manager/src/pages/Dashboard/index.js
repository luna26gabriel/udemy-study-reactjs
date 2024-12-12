import { FiDelete, FiEdit, FiList, FiPlus } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";

import { Link } from 'react-router-dom'

import './dashboard.css'

export default function Dashboard() {

    return (
        <div>
            <Header />
            <div className="container">
                <Title name="Chamadas">
                    <FiList color="#000" size={24} />
                </Title>

                <div>
                    <Link to='/new' className="new-btn">
                        <FiPlus color="#fff" size={25} />
                        Novo Chamado
                    </Link>

                    <div className="container-dashboard">
                        <table>
                            <thead>
                                <tr>
                                    {/* <th scope="col">Código</th> */}
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Cliente">Mercaddin</td>
                                    <td data-label="Assunto">Mercaddin daki</td>
                                    <td data-label="Status">
                                        <span className="badge" style={{backgroundColor: 'grey'}}>
                                            Aprovado
                                        </span>
                                    </td>
                                    <td data-label="Cadastrado em">10/12/2024</td>
                                    <td data-label="#">
                                        <button className="action-btn" style={{backgroundColor: '#3583f6'}}><FiEdit color="#fff" size={25} /></button>
                                        <button className="action-btn" style={{backgroundColor: '#f6a935'}}><FiDelete color="#fff" size={25} /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Cliente">Mercaddin</td>
                                    <td data-label="Assunto">Mercaddin daki</td>
                                    <td data-label="Status">
                                        <span className="badge" style={{backgroundColor: 'grey'}}>
                                            Aprovado
                                        </span>
                                    </td>
                                    <td data-label="Cadastrado em">10/12/2024</td>
                                    <td data-label="#">
                                        <button className="action-btn" style={{backgroundColor: '#3583f6'}}><FiEdit color="#fff" size={25} /></button>
                                        <button className="action-btn" style={{backgroundColor: '#f6a935'}}><FiDelete color="#fff" size={25} /></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Cliente">Mercaddin</td>
                                    <td data-label="Assunto">Mercaddin daki</td>
                                    <td data-label="Status">
                                        <span className="badge" style={{backgroundColor: 'grey'}}>
                                            Aprovado
                                        </span>
                                    </td>
                                    <td data-label="Cadastrado em">10/12/2024</td>
                                    <td data-label="#">
                                        <button className="action-btn" style={{backgroundColor: '#3583f6'}}><FiEdit color="#fff" size={25} /></button>
                                        <button className="action-btn" style={{backgroundColor: '#f6a935'}}><FiDelete color="#fff" size={25} /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}