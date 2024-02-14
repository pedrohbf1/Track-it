import styled from "styled-components"
import BotaoDeSelecionarDia from "../BotaoDeSelecionarDia"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import NameContext from "../../NameContext"

const CriarHabitoDiv = styled.div`
    width: 100%;
    background-color: #FFF;
    padding: 18px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    input {
        width: 100%;
        padding: 9px 0 11px 11px;
        border: 1px solid #D4D4D4;
        ::placeholder {
            color: #D4D4D4;
        }
    }
    main {
        display: flex;
        gap: 4px;
    }
    section {
        margin-top: 21px;
        width: 100%;
        div {
            display: flex;
            justify-content: end;
            gap: 23px;
            :nth-child(1) {
                border: none;
                background-color: #FFF;
                color: #52B6FF;
                cursor: pointer;
            }
            :nth-child(2) {
                border: none;
                background-color: #52B6FF;
                color: #FFF;
                padding: 7px 17px;
                border-radius: 5px;
                cursor: pointer;
            }
        }
    }
`

const CriarHabito = ({ setCriarHabito, token }) => {

    const { setHabitos } = useContext(NameContext)

    const diasDaSemana = [
        {
            dia: "D",
            indexDoDia: 7
        },
        {
            dia: "S",
            indexDoDia: 1
        },
        {
            dia: "T",
            indexDoDia: 2
        },
        {
            dia: "Q",
            indexDoDia: 3
        },
        {
            dia: "Q",
            indexDoDia: 4
        },
        {
            dia: "S",
            indexDoDia: 5
        },
        {
            dia: "S",
            indexDoDia: 6
        }
    ]

    const [nomeHabito, setNomeHabito] = useState("")

    const [diasDoHabito, setDiasDoHabito] = useState([]) 

    function enviarHabito () {
        const habitoCriado = {
            name: nomeHabito,
            days: diasDoHabito
        }
        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"

        axios.post(url, habitoCriado, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response)
            axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(r => {
                setHabitos(r.data)
            })
        })
    }

    return (
        <CriarHabitoDiv>
            <input type="text" placeholder="nome do hábito" value={nomeHabito} onChange={(e) => setNomeHabito(e.target.value)} />
            <main>
                {diasDaSemana.map((dia, index) => (
                    <BotaoDeSelecionarDia key={index} dia={dia.dia} indexDoDia={dia.indexDoDia} diasDoHabito={diasDoHabito} setDiasDoHabito={setDiasDoHabito} />
                ))}
            </main>
            <section>
                <div>
                    <button onClick={() => setCriarHabito(false)}>Cancelar</button>
                    <button onClick={() => enviarHabito()}>Salvar</button>
                </div>
            </section>
        </CriarHabitoDiv>
    )
}

export default CriarHabito