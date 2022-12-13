import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Sessao from "../components/Sessao"

export default function Sessoes(props){
    const {idFilme} = useParams()
    const [sessoesDias,setSessoesDias] = useState(undefined)
    
    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)
    
        promise.then(res=> {
            setSessoesDias(res.data.days)
            props.setFilme(res.data)
            console.log(res.data)    
        })
    }, [])

    if(sessoesDias === undefined){
        return <div>Carregando...</div>
    }

    return (<>
        <SelecioneHorario>Selecione um horário</SelecioneHorario>
         {sessoesDias.map((s)=> (
                <Sessao 
                    key={s.id} 
                    weekday={s.weekday}
                    showtimes={s.showtimes}
                    date={s.date} 
                    setHorarioData={props.setHorarioData}
                    setWeekday = {props.setWeekday}/>)
           )}
           <div style={{marginBottom: '117px'}}></div>
        <ResumoFilme data-test="footer">
            <img src={props.filme.posterURL} />{props.filme.title}
        </ResumoFilme>
           
        </>
    
    )
}
const ResumoFilme = styled.div`
    position: fixed;
    width: 375px;
    height: 117px;
    left: 0px;
    bottom: 0px;
    background: #DFE6ED;
    border: 1px solid #9EADBA;
    display: flex;
    align-items: center;
    img{
        margin-left: 10px;
        margin-right: 14px;
        width: 48px;
        height: 72px;
        background: #FFFFFF;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border:8px solid white;
        border-radius: 2px;
    }
`
const SelecioneHorario = styled.p `
    width: 375px;
    font-family: 'Roboto', sans-serif;
    text-align:  center;
`