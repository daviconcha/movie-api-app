import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import './home.css'

function Home(){
    const[filmes, setFilmes] = useState([]);
    const[loading, setLoading] = useState(true);


    useEffect(()=>{
        async function loadFilmes(){
            const resposta = await api.get("movie/now_playing", {
                params:{
                    api_key:"YOUR_API_KEY",
                    language: "pt_PT",
                    page: 1,     
                }
            })
            //console.log(resposta.data.results.slice(0,10));
            setFilmes(resposta.data.results.slice(0,10))
            setLoading(false);
        }

        loadFilmes();

    }, []);

    if(loading){
        return(
            <div className="loading">
                <h2>Loading...</h2>
            </div>
        );
    }




    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`/filme/${filme.id}`}>see more</Link>
                        </article>
                    )
                })}
            </div>
        </div>        
    );
}

export default Home;