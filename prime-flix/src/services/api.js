import axios from 'axios';

//      https://api.themoviedb.org/3/
//      movie/now_playing?api_key=dfa58156c90ae47721eff3a8c7eea753&language=pt

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});

export default api;