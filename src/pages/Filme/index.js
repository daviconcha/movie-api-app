import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import api from '../../services/api';
import './filme-info.css'
import { toast } from "react-toastify";

function Filme(){
    const{id} = useParams();
    const navigate = useNavigate();
    const[filme, setFilme] = useState({});
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params:{
                    api_key:"c72dae5437e03c942809bc7beacc4ebb",
                    language: "pt_PT",  
                }
            })
            .then((resposta)=>{
                setFilme(resposta.data);  
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme não existe.");
                navigate("/", {replace:true});
                return true;      
            })    
        }
        loadFilme();
        return()=>{
            //console.log("Componente foi desmontado.");      
        }
    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];
        
        const hasFilme = filmesSalvos.some((filmesSalvo)=>filmesSalvo.id === filme.id);
        
        if(hasFilme){
            toast.warn("This movie is already on the list!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Movie saved successfully!");
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Loading movie details...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average}/10</strong>
           
            <div className="area-buttons">
                <button onClick={salvarFilme}>Save</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    );
}

export default Filme;