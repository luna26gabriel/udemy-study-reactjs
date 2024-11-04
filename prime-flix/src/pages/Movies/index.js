import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import './movie.css';
import { toast } from 'react-toastify';

function Movies() {
  const { id } = useParams();
  const navegation = useNavigate();

  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [countDown, setCountDown] = useState(3);


  useEffect(() => {

    async function laodFilme() {
      const response = await api.get(`movie/${id}`, {
        params: {
          api_key: "dfa58156c90ae47721eff3a8c7eea753",
          language: "pt",
          page: 1
        }
      })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setNotFound(true);
        })

      // console.log(response.data);
    }

    laodFilme();
  }, [navegation, id]);

  function salvarFilme() {
    // alert('lala');
    const salvos = localStorage.getItem('filme_salvos');
    let filmesSalvos = JSON.parse(salvos) || [];
    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)
    if (hasFilme) {
      toast.warn('Filme já ta na lista');
      return;
    } else {
      filmesSalvos.push(filme);
      localStorage.setItem('filme_salvos', JSON.stringify(filmesSalvos));
      toast.success('Filme adicionado na lista');
    }

    // console.log(salvos);
  }

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando Filme ....</h2>
      </div>
    )
  }
  function redretion() {
    var redirect = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000)
    if (countDown === 0) {
      clearInterval(redirect);
      navegation('/', { replace: true })
      return;
    }
  }

  if (notFound) {
    redretion();
    return (
      <div className="not-found">
        <h2>Esse Filme não foi encontrado</h2>
        <p>Voltando para HOME em {countDown} ...</p>
      </div>
    )
  }

  return (
    <div className="filme-info">
      <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="" />
      <div className="filme-infos">
        <h1>{filme.title}</h1>
        <p className="desc">{filme.overview}</p>
        <p className="date">{filme.release_date}</p>
        <p className="rate">Avaliação: {Math.round(filme.vote_average * 10) / 10}</p>
        <div className="btn-box">
          <button onClick={salvarFilme} className="btn brn-salvar">Salvar</button>
          <a target="_blank" rel="noreferrer" href={`https://youtube.com/results?search_query=${filme.title} Trailer`} className="btn brn-trailer">Trailer</a>
        </div>
      </div>
    </div>
  );
}

export default Movies;
