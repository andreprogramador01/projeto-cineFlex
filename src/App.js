import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Filmes from "./pages/Filmes";

function App() {
  return (
    <>
    <BrowserRouter>
    <Header>
      CINEFLEX
    </Header>
  <Routes>
    <Route path="/" element={<Filmes />}></Route>
    
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
