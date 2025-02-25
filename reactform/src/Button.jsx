import { useFormStatus } from 'react-dom'

export function ButtonSubmit() {

    const { pending } = useFormStatus();
    return (
        <div>
            <button type="submit" disabled={pending}>
            {pending ? 'ENVIANDO' : 'E N V I A R'}
            </button>

            {pending && <p>Enviando os dados do Formulário</p>}
        </div>
    )
}