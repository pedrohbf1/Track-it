import styled from "styled-components"
import DiasSelecionadosDoHabito from "../DiasDoHabitoSelecionado"
import axios from "axios"
import { useContext } from "react"
import NameContext from "../../NameContext"
import { useNavigate } from "react-router-dom"

const SectionEstilizada = styled.span`
    width: 100%;
    background-color: #FFF;
    border-radius: 5px;
    padding: 13px 11px 15px 15px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    div {
        display: flex;
        justify-content: space-between;
        :nth-child(2) {
            cursor: pointer;
        }
    }
`

const Habito = ({ nomeHabito, diasHabito, idHabito}) => {

    const { setHabitos } = useContext(NameContext)

    const data = JSON.parse(localStorage.getItem('data'))

    const navigate = useNavigate()

   function deletarHabito () {

    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}`

    axios.delete(url, {
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    }) .then(() => {
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        }).then(r => {
            setHabitos(r.data)
        })
    })
   }

    return (
        <SectionEstilizada>
            <div>
                <span>
                    {nomeHabito}
                </span>
                <span>
                    <img src="/public/Vector (6).png" alt="" onClick={() => deletarHabito()} />
                </span>
            </div>

            <>
                <DiasSelecionadosDoHabito diasHabito={diasHabito} />
            </>

        </SectionEstilizada>
    )
}

export default Habito