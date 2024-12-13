import { FiX } from 'react-icons/fi'
import './modal.css'
import { format } from 'date-fns';

export default function Modal({conteudo, close}) {

    console.log(conteudo);

    return (
        <div className='modal'>
            <div className="container-modal">
                <button className='close' onClick={close}>
                    <FiX size={25} color='#fff' />
                    Voltar
                </button>

                <main>
                    <h2>Detalhes</h2>
                    <div className='row'>
                        <span>Cliente: <i>{conteudo.client}</i></span>
                        <span>Assunto: <i>{conteudo.assunt}</i></span>
                    </div>
                    <div className='row'>
                        <span>Status: <i className="status" style={{ backgroundColor: conteudo.status === 'Aberto' ? 'green' : conteudo.status === 'Progresso' ? 'blue' : 'grey' }} >{conteudo.status}</i></span>
                        <span>Cadrastrado: <i>{conteudo.createdFormat}</i></span>
                    </div>
                    {conteudo.complemento && (
                        <div className='row'>
                            <span>Complemento:</span>
                            <p>{conteudo.complemento}</p>
                        </div>
                    )}                    
                </main>
            </div>            
        </div>
    )
}