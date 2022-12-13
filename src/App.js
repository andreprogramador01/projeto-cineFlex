import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Filmes from "./pages/Filmes";
import Sessoes from "./pages/Sessoes";
import Assentos from "./pages/Assentos";
import Sucesso from "./pages/Sucesso";
import {useState} from 'react'


function App() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [nome, setNome] = useState("")
  const [CPF, setCPF] = useState("")
  const [horarioData, setHorarioData] = useState("")
  const [weekday, setWeekday] = useState("")
  const [filme, setFilme] = useState([])
  function handleSeat(seat) {
    //Se o assento estiver indisponível não faz nada
    if (seat.isAvailable === false) {
      return;
    }
    //Toggle - "Liga e desliga" a seleção
    seat.selected = !seat.selected;
  
    //Se o estado atual é não selecionado precisamos remover o assento
    if (!seat.selected) {
      const filteredSeats = selectedSeats.filter((s) => !(s.name === seat.name));
      setSelectedSeats([...filteredSeats]);
      return;
    }
    //Adicionamos o assento a lista de assentos selecionados
    setSelectedSeats([...selectedSeats, seat]);
    return;
  }
  return (
    <>
    <BrowserRouter>
    <Header>
      CINEFLEX
    </Header>
  <Routes>
    <Route path="/" element={<Filmes />} />
    <Route path="/sessoes/:idFilme" element={<Sessoes 
                                              setHorarioData={setHorarioData}
                                              setWeekday={setWeekday} 
                                              setFilme={setFilme}
                                              filme={filme}
                                          />} />
    <Route 
      path="/assentos/:idSessao" 
      element={<Assentos 
                    handleSeat={handleSeat} 
                    selectedSeats={selectedSeats} 
                    nome={nome} 
                    setNome={setNome}
                    setCPF={setCPF}
                    CPF={CPF}
                    filme={filme}
                    weekday={weekday}                
                    />}
     />
    <Route path="/sucesso" element={<Sucesso selectedSeats={selectedSeats}
                                              setSelectedSeats={setSelectedSeats}
                                              nome={nome}                                      
                                              CPF={CPF} 
                                              filme={filme}
                                              horarioData={horarioData}
                                      />}
     />
  </Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;

const Header = styled.header`
  color:#E8833A;
  background-color:#C3CFD9;
  width: 375px;
  height: 67px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`
