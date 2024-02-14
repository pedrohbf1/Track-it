import axios from "axios"
import { useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

const CentralizadoraLogin = styled.form`
  width: 303px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
  input {
    width: 100%;
    padding: 9px 11px;
    background-color: #FFF;
    border: 1px solid #D4D4D4;
    color: #000;
    border-radius: 5px;
    &:focus {
        outline: none;
    }
    &:placeholder-shown {
        color: #D4D4D4;
    }
  }
  :nth-child(5) {
    width: 100%;
    height: 45px;
    background-color: #52B6FF;
    border: none;
    border-radius: 5px;
    color: #FFF;
    font-size: 18px;
    margin-bottom: 25px;    
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
`

const CadastroLogin = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nome, setNome] = useState("")
    const [foto, setFoto] = useState("")
    const [recarregar, setRecarregar] = useState(false)
    const [usuario, setUsuario] = useState([])
    const [requestSend, setRequestSend] = useState(false)

    function entrar (e) {
        if (email != "" && senha != "" && nome != "" && foto != "") {
            e.preventDefault()
            setUsuario({
                email: email, 
                password: senha, 
                name: nome, 
                image: foto
            })
            setRequestSend(true)
            setRecarregar(true)
        }
    }

    useEffect(() => {
        if (requestSend) {
            axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", usuario)
            .then(() => {
                navigate("/")
                setRecarregar(false)
            })
        }
    }, [requestSend])

    return (
        <CentralizadoraLogin>
            <input type="text" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
            <input type="text" placeholder="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
            <input type="text" placeholder="foto" required value={foto} onChange={(e) => setFoto(e.target.value)} />
            <button onClick={(e) => entrar(e)} > 
                {!recarregar ? "Cadastrar" : <ThreeDots height="100" width="80" radius="9" color="white" ariaLabel="loading" />}
            </button>
            <Link to="/" style={{color: "#52B6FF"}}>
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </CentralizadoraLogin>
    )
}

export default CadastroLogin