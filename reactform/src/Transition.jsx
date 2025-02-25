import { useState, useTransition } from "react"

export function NewUser() {

    const [name, setName] = useState("");
    const [error, setError] = useState("")
    const [user, setUser] = useState("")
    const [isPending, startTransition] = useTransition();

    async function handleSubmit() {
        startTransition(async()=>{
            try {
                await new Promise((resolve, reject) => setTimeout(()=>{
                   resolve();
                //    reject('Falha ao Cadastrar usuário');
                }, 2500));
                setUser(`Bem Vindo ${name}`);
            }
            catch(er) {
                setError(er)
            }
        })
    }

    return (
        <div>
            <h1>Conheçendo useTransition</h1>

            <input 
                type="text" 
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <button onClick={handleSubmit} disabled={isPending}>
                {isPending ? 'Enviando Usuário para o banco para processamento ... ' : 'Cadastar'}
            </button>

            {user && <p>{user}</p>}
            {error && <strong>{error}</strong>}
        </div>
    )
}