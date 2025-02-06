import { useParams } from "react-router-dom"
import { Container, Loading, Owner, Backbtn, IssuesList, PageActions, IssuesSelect } from "./styles";
import { useEffect, useState } from "react";
import { FaArrowLeft } from 'react-icons/fa'
import api from '../../services/api'

export default function Repositorios() {

    const { repositorio } = useParams();

    const [repo, setRepo] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('open');

    useEffect(() => {
        async function load() {
            const nomeRepo = repositorio;
            const [repoData, repoIssues] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: status,
                        per_page: 5
                    }
                })
            ]);
            setRepo(repoData.data);
            setIssues(repoIssues.data);
            setLoading(false);
        }
        load();
    }, [repositorio]);

    useEffect(() => {
        async function loadIssue() {
            const nomeRepo = repositorio;
            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params: {
                    state: status,
                    page,
                    per_page: 5
                }
            });
            setIssues(response.data);
        }
        loadIssue();
    }, [repo, page, status]);

    if (loading) {
        return (
            <Loading>
                <h1>Carregando....</h1>
            </Loading>
        )
    }

    // handleStatus(status) {
    //     setStatus(status)
    // }

    function handlePage(opt) {
        setPage(opt === 'next' ? page + 1 : (page > 0) ? page - 1 : 1);
    }

    return (
        <div>
            <Container style={{ color: '#fff' }}>
                <Backbtn to='/'>
                    <FaArrowLeft color="#0d2636" size={24} />
                </Backbtn>
                <Owner>
                    <img src={repo.owner.avatar_url} alt={repo.owner.login} />
                    <h1>{repo.name}</h1>
                    <p>{repo.description}</p>
                </Owner>

                <IssuesSelect>
                    <button type="button" onClick={()=>setStatus('all')}>All</button>
                    <button type="button" onClick={()=>setStatus('closed')}>Closed</button>
                    <button type="button" onClick={()=>setStatus('open')}>Open</button>
                </IssuesSelect>

                <IssuesList>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a><br />
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssuesList>
                <PageActions>
                    <button
                        type="button"
                        disabled={page < 2}
                        onClick={() => handlePage('prev')}
                    >Voltar</button>
                    <button
                        type="button"
                        onClick={() => handlePage('next')}
                    >Proxíma</button>
                </PageActions>
            </Container>
        </div>
    )
}