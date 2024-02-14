import axios from "axios"
import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import NameContext from "../../NameContext"
import BotaoDeSelecionarDia from "../../Componentes/BotaoDeSelecionarDia"
import CriarHabito from "../../Componentes/CriarHabito"
import Habito from "../../Componentes/Habito"

const CorpoEstilizado = styled.header`
    width: 100%;
    color: #126BA5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
        width: 45px;
        height: 35px;
        justify-content: center;
        align-items: center;
        display: flex;
        border-radius: 5px;
        background-color: #52B6FF;
        cursor: pointer;
        color: white;
    }
`

const Centralizadora = styled.main`
    width: 100%;
    padding: 22px 20px 0 17px;
    display: flex;
    gap: 28px;
    flex-direction: column;
    box-sizing: border-box;
    section {
        display: flex;
        flex-direction: column;
        gap: 28px;
        p {
            color: #666666;
        }

    }
`

const Habitos = () => {

    const { setCorDeFundo, habitos, setHabitos } = useContext(NameContext)

    const data = JSON.parse(localStorage.getItem('data'))

    const [criarHabito, setCriarHabito] = useState(false)

    useEffect(() => {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        }).then(response => {
            setHabitos(response.data)
        })
    }, [data.token])

    setCorDeFundo("#F2F2F2")

    return (
        <Centralizadora>
            <CorpoEstilizado>
                <h2>Meus hábitos</h2>
                <div onClick={() => setCriarHabito(true)}>+</div>
            </CorpoEstilizado>
            <section> 

                {criarHabito && 
                    <CriarHabito setCriarHabito={setCriarHabito} token={data.token} />
                }

                {habitos == "" ? 
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p> 
                    : 
                    <>
                        {habitos.map((habito) => (
                            <Habito key={habito.id} idHabito={habito.id} nomeHabito={habito.name} diasHabito={habito.days} />
                        ))}
                    </>
                }
            </section>
        </Centralizadora>
    )   
}

export default Habitos