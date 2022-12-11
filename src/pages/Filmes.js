import { useEffect, useState } from "react"
import axios from "axios";
import Filme from "../components/Filme"
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Filmes(){
    const [filmes, setFilmes] = useState(undefined)
    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies`)
        promise.then(res => {
            setFilmes(res.data)
            
        })
    },[]);
    if(filmes ===undefined){
        return <div>Carregando...</div>
    }
    return <>
            <SelecioneFilme>Selecione o Filme</SelecioneFilme>
            <ContainerFilmes>
        
                {filmes.map((f)=>
                        <Link to={`sessoes/${f.id}`}>
                            <Filme 
                                key={f.id} 
                                url={f.posterURL} 
                                titulo={f.title}
                            />
                            
                        </Link>
                            )}
            </ContainerFilmes>
        </>
}
const SelecioneFilme = styled.p`
    display: flex;
    justify-content: center;
    width: 375px;
    font-family: 'Roboto', sans-serif;
`
const ContainerFilmes = styled.div`
    display: flex;
    width: 375px;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap:27px;
`