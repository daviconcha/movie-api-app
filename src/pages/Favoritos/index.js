import { useEffect, useState } from 'react';
import './favoritos.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos(){
    const[filmes, setFilmes] = useState([]);

    useEffect(()=>{

        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || []);

    }, []);

    function excluirFilme(id){
       let filtroFilmes = filmes.filter((item)=>{
        return (item.id !== id)
       })
       setFilmes(filtroFilmes);
       localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
       toast.success("Movie deleted successfully!");
    }

    return(
        <div className="meus-filmes">
            <h1>Favorites</h1>
            {filmes.length === 0 && <span>No saved movies yet...</span>}
            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span> 
                            <div>
                                <Link to={`/filme/${item.id}`}>details</Link>
                                <button onClick={()=>excluirFilme(item.id)}>delete</button>
                            </div>       
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Favoritos;