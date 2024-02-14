import { BrowserRouter, Route, Routes } from "react-router-dom"
import styled from "styled-components"
import Login from "./Paginas/Login"
import CadastroLogin from "./Paginas/Cadastro"
import PaginaPadraoLogin from "./PaginasPadroes/PaginaPadraoLogin"
import NameContext from "./NameContext"
import { useState } from "react"
import PaginaPadraoPage from "./PaginasPadroes/PaginaPadraoPage"
import Habitos from "./Paginas/Habitos"
import Hoje from "./Paginas/Hoje"

const Centralizador = styled.main`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.$corDeFundo};
  border-radius: 5px;
  border: 1px solid #D4D4D4;
  overflow: auto;
  position: relative;
`

function App() {

  const [data, setData] = useState("")

  const [habitos, setHabitos] = useState("")

  const [corDeFundo, setCorDeFundo] = useState("white")

  if (data) {
    localStorage.setItem("data", JSON.stringify(data))
  }

  const [porcentagem, setPorcentagem] = useState("")
  
  return (
    <Centralizador $corDeFundo={corDeFundo}>

      <NameContext.Provider value={{ habitos, setHabitos, setData, data, setCorDeFundo, setPorcentagem, porcentagem }}>

        <BrowserRouter>
          <Routes>

            <Route path="/" element={<PaginaPadraoLogin />}>

              <Route index element={<Login />}/>
              <Route path="/cadastro" element={<CadastroLogin />}/>

            </Route>

            <Route path="/habitos" element={<PaginaPadraoPage />}>
              <Route index element={<Habitos />} />
              <Route path="/habitos/hoje" element={<Hoje />} />
            </Route>
            
          </Routes>
        </BrowserRouter>

      </NameContext.Provider>

    </Centralizador>
    
  )

}

export default App
