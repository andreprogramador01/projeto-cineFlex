import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import "./styles.css";


  
  //Componente apenas visual, só renderiza os assentos
  function Seat({ seat, handleSeat }) {
    return (
      <>
        {!seat.selected ? (
          seat.isAvailable ? 
                (<SeatContainer data-test="seat" selecao={`available`} onClick={() => handleSeat(seat)}>
                  {seat.name}
                </SeatContainer>):(
                  <SeatContainer data-test="seat" selecao={`unavailable`} onClick={() => alert("Assento indisponível")}>
                  {seat.name}
                </SeatContainer>
                )
        ) : (
          <SeatContainer data-test="seat" selecao={`selected`} onClick={() => handleSeat(seat)}>
            {seat.name}
          </SeatContainer>
        )}
      </>
    );
  }
  
  export default function Assentos(props) {
    const {idSessao} = useParams()
    const navegacao = useNavigate()
    const [assentos,setAssentos] = useState(undefined)
    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
        promise.then(res => {
            setAssentos(res.data.seats)
            console.log(res.data.seats)
        })
    }, [])
    function carregarDados(e){
      e.preventDefault();
      navegacao('/sucesso')
      
    }
    //Faz o click em cada componente Seat
    
    if(assentos === undefined){
        return <div>Carregando...</div>
    }
    return (
        <>
        <SelecioneAssentos>Selecione o(s) assento(s)</SelecioneAssentos>
        <AssentosContainer>
        
            {assentos.map((seat, id) => (
            <Seat key={seat.name} seat={seat} handleSeat={props.handleSeat} />
            ))}
            
            <ContainerLegenda>
              <Selecionado><div></div><br/>Selecionado  </Selecionado>
              <Disponivel><div></div><br/>Disponível  </Disponivel>
              <Indisponivel><div></div><br/>Indisponível  </Indisponivel>
            </ContainerLegenda>
        </AssentosContainer>
        <Form onSubmit={carregarDados}>
          <label htmlFor="nome" >Nome do comprador</label>
          <input type="text" data-test="client-name" value={props.nome} onChange={e=> props.setNome(e.target.value)} name="nome" placeholder="Digite seu nome..." />
          <label htmlFor="cpf">CPF do comprador</label>
          <input type="text" data-test="client-cpf" name="cpf" value={props.CPF} onChange={e=> props.setCPF(e.target.value)} placeholder="Digite seu CPF..." />
          <button type="submit" data-test="book-seat-btn">Reservar assento(s)</button>
        </Form>
        <div style={{marginBottom: '117px'}}></div>
        <ResumoFilme data-test="footer">
            <img src={props.filme.posterURL} />{props.filme.title}
        </ResumoFilme>
        </>
    );
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
  const Form = styled.form`
    width: 375px;
    margin-left:24px;
    label{
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 21px;
      display: flex;
      align-items: center;
    }
    input{
    width: 309px;
    height: 50px;
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    }
    button{
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
      justify-content: center;
      letter-spacing: 0.04em;
      color: #FFFFFF;
      margin-top:57px;
      margin-left:40px;
    }
  `
  const ContainerLegenda = styled.div`
    display: flex;
    gap:40px;
    margin-bottom: 40px;
  `
  const Disponivel = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    div{
      width: 24px;
      height: 24px;
      background: #C3CFD9;
      border: 1px solid #7B8B99;
      border-radius: 17px;
  `
  const Indisponivel = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    div{
      width: 24px;
      height: 24px;
      background: #FBE192;
      border: 1px solid #F7C52B;
      border-radius: 17px;
    }
  `
  const Selecionado = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    div{
      background: #1AAE9E;
      border: 1px solid #0E7D71;
      border-radius: 17px;
      width: 25px;
      height: 25px;
    }

    `
  const SelecioneAssentos = styled.div`
    width: 375px ;
    display: flex;
    justify-content: center;
    margin:20px 0px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;
  `
const AssentosContainer = styled.div `
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 7px;
    width: 375px;
`
const SeatContainer =  styled.div `
    background: #C3CFD9;
    border: 1px solid #808F9D;
    border-radius: 12px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: 0.04em;
    width: 26px;
    height: 26px;
    cursor:pointer;
    border: 1px solid #808F9D;
    background-color: ${props => {
                                switch(props.selecao){
                                  case 'selected':
                                    return '#1AAE9E';
                                  case 'available':
                                    return '#C3CFD9'
                                  case 'unavailable':
                                    return '#FBE192'
                                  default: return false
                                }
    } }
  }
  .available {
    background-color: lightgrey;
  }
  
  .unavailable {
    background-color: lightcoral;
  }
`