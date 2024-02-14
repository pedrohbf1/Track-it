import axios from "axios"
import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import NameContext from "../../NameContext"
import { Audio, BallTriangle, Circles, CirclesWithBar, LineWave, ThreeDots } from "react-loader-spinner"

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
  :nth-child(3) {
    width: 100%;
    height: 45px;
    background-color: #52B6FF;
    border: none;
    border-radius: 5px;
    color: #FFF;
    font-size: 18px;
    margin-bottom: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
`

const Login = () => {

    const { setData } = useContext(NameContext)

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [requestSend, setRequestSent] = useState(false)
    const [user, setUser] = useState("")
    const [recarregar, setRecarregar] = useState(false)

    function entrar (e) {
        if (email != "" && senha != "") {
            e.preventDefault()
            setUser({
                email,
                password: senha 
            })
            setRequestSent(true)
            setRecarregar(true)
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        if(requestSend) {
            axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", user)
            .then((response) => {
                setData({
                    image: response.data.image,
                    name: response.data.name,
                    token: response.data.token
                })
                setRecarregar(false)
                navigate("/habitos")
            })
        }
    }, [requestSend])

    return (
        <CentralizadoraLogin>
            <input type="text" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
            <button onClick={(e) => entrar(e)} > 
                {!recarregar ? "Entrar" : <ThreeDots height="100" width="80" radius="9" color="white" ariaLabel="loading" />}
            </button>
            <Link to="/cadastro" style={{color: "#52B6FF"}}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </CentralizadoraLogin>
    )
}

export default Login