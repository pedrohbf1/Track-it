import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import NameContext from "../../NameContext"

const SectionEstilizada = styled.main`
    width: 100%;
    padding: 13px 13px 12px 15px;
    background-color: #FFF;
    border-radius: 1px;
    display: flex;
    align-items: center;
    div {
        flex: 1;
        display: flex;
        flex-direction: column;
        row-gap: 7px;
        :nth-child(1) {
            h3 {
                color: #666666;
            }
        }
        :nth-child(2) {
            display: flex;
            flex-direction: column;
            :nth-child(1) {
                display: flex;
                gap: 5px;
                :nth-child(1) {
                    color: ${props => props.$select ? "#8FC549" : "#666666"};
                }
            }
            p {
                color: #666666;
            }
        }
    }

    footer {
        width: 69px;
        height: 69px;
        border-radius: 5px;
        background-color: ${props => props.$select ? "#8FC549" : "#EBEBEB"};
        align-items: center;
        justify-content: center;
        display: flex;
        cursor: pointer;
        img {
            width: 35px;
            height: 28px;
        }
    }
`

const HabitosDeHoje = ({ done, highestSequence, name, currentSequence, idDoHabito, setHabitosEncontrados, setPorcentagemFeitos, porcentagemDeFeitos }) => {

    const [select, setSelect] = useState(done)

    const { setPorcentagem } = useContext(NameContext)

    const navigate = useNavigate()

    const data = JSON.parse(localStorage.getItem('data'))

    function marcarComoConcluidoHabito () {
        setSelect(!select)
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idDoHabito}/${select ? 'uncheck' : 'check'}`;

        axios.post(url, null, {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        }).then(response => {
            const url =  "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            })
            .then(response => {
                setHabitosEncontrados(response.data)
                const totalFeitos = response.data.filter(objeto => objeto.done).length;
                setPorcentagemFeitos((totalFeitos / response.data.length) * 100) ;
                setPorcentagem(porcentagemDeFeitos)
            })
        }).catch(error => {
            
            console.error(error);
        });
    }

    return(
        <SectionEstilizada $select={select} >
            <div>
                <span>
                    <h3>{name}</h3>
                </span>
                <span>
                    <p>Sequência atual: <p>{currentSequence} dias</p></p>
                    <p>Seu recorde: {highestSequence} dias</p>
                </span>
            </div>

            <footer onClick={() => marcarComoConcluidoHabito()}>
                <img src="/public/Group.png" alt="" />
            </footer>
        </SectionEstilizada>
    )
}

export default HabitosDeHoje