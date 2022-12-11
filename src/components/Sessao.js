import styled from "styled-components"
import { Link } from "react-router-dom" 
import { useState } from "react"

export default function Sessao({weekday,date,showtimes,setHorarioData}){
    
    function salvarSessao(hora){
        
        setHorarioData(hora)
        console.log(hora)
        
    }
    return (
        <SessaoDia data-test="movie-day">
        <div>{weekday} - {date}</div>
        <Showtimes>
            {showtimes.map(s=>(
                <div key={s.id}>
                    <Linkk data-test="showtime" to={`/Assentos/${s.id}`} onClick={() => salvarSessao(date +" "+s.name)}>
                        {s.name}
                    </Linkk>
                </div>

            ))}
        </Showtimes>
        </SessaoDia>
    )
}
const SessaoDia = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #293845;

    
    letter-spacing: 0.02em;
    div{
        margin-bottom: 22px;
    }
`
const Showtimes = styled.div `
    display: flex;
    align-items: center;
    gap:8px;
    div{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        letter-spacing: 0.02em;
        background-color: #E8833A;
        color: #FFFFFF;
        width: 83px;
        height: 43px;
;
    }
`
const Linkk = styled(Link)`
    text-decoration:  none;
    color: #FFFFFF;
    cursor: pointer;

`