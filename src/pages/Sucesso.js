import { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { Link } from "react-router-dom"

export default function Sucesso(props){
    const [arrayAssentos,setArrayAssentos] = useState([])
    useEffect(()=>{
        const arrayIds = props.selectedSeats.map( (s)=> s.id )
        setArrayAssentos(props.selectedSeats.map( (s)=> s.name ))
        const URL = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
        const body = {ids: arrayIds, name: props.nome, cpf: props.CPF}
        const promise = axios.post(URL, body)
       
        promise.then(res=>console.log(res))
        promise.catch(err=>console.log(err))
    }, [])
    function resetarDados(){
        props.setSelectedSeats([])
    }
    
    return (
            <>
            <Pedido>Pedido feito <br/>com sucesso!</Pedido>
            <Informacao data-test="movie-info">
                    <Titulo>
                        Filme e sessão
                    </Titulo>
                    <Descricao>
                    {props.filme.title}<br/>
                    {props.horarioData}
                    </Descricao>
            </Informacao>
            <Informacao data-test="seats-info">
                    <Titulo>
                        Ingressos
                    </Titulo>
                    <Descricao>
                    {arrayAssentos.map((a)=>(
                                        <>
                                            <div>Assento {a}</div>
                                        </>
                                        ))}
                    </Descricao>
            </Informacao>
            <Informacao data-test="client-info">
                    <Titulo>
                        Comprador
                    </Titulo>
                    <Descricao>
                    Nome: {props.nome}<br/>
                    CPF: {props.CPF}
                    </Descricao>
            </Informacao>
            <Linkk data-test="go-home-btn" onClick={resetarDados} to="/">
            Voltar pra Home
            </Linkk>
            
            </>
    )
    
}
const Linkk = styled(Link)`
    width: 225px;
    height: 42px;
    background: #E8833A;
    border-radius: 3px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
    justify-content: center;
    text-decoration: none;
    margin-left: 74px;
    margin-top:70px;

    color: #FFFFFF;
`
const Informacao = styled.div`
margin-left: 28px;
margin-bottom: 20px;

`
const Titulo = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    letter-spacing: 0.04em;

    color: #293845;
    
`
const Descricao = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    display: flex;
    flex-direction:column;
    letter-spacing: 0.04em;
    color: #293845;
    width: 375px;
`
const Pedido = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    letter-spacing: 0.04em;
    color: #247A6B;
    width: 375px;
`