import dayjs from "dayjs"
import { useContext } from "react"
import styled from "styled-components"
import NameContext from "../../NameContext"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import HabitosDeHoje from "../../Componentes/HabitosDeHoje"
import { useNavigate } from "react-router-dom"

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

const CorpoEstilizado = styled.header`
    width: 100%;
    color: #126BA5;
    display: flex;
    flex-direction: column;
    div { 
        display: flex;
        flex-direction: column;
        gap: 28px;
        :nth-child(1) {
            color: ${props => props.$porcentagemFeitos ? "#8FC549" : "#BABABA"};
        }
        footer {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }
`

const Hoje = () => {

    const diaDeHoje = dayjs().format('DD/MM')

    const diaDaSemana = dayjs().day()

    const { setCorDeFundo } = useContext(NameContext)

    const diasDaSemana = [
        {
            dia: "Domingo",
            indexDoDia: 7
        },
        {
            dia: "Segunda",
            indexDoDia: 1
        },
        {
            dia: "Terça",
            indexDoDia: 2
        },
        {
            dia: "Quarta",
            indexDoDia: 3
        },
        {
            dia: "Quinta",
            indexDoDia: 4
        },
        {
            dia: "Sexta",
            indexDoDia: 5
        },
        {
            dia: "Sabado",
            indexDoDia: 6
        }
    ]

    const data = JSON.parse(localStorage.getItem('data'))

    const diaEncontrado = diasDaSemana.find(dia => dia.indexDoDia === diaDaSemana)

    const [habitosEncontrados, setHabitosEncontrados] = useState("")

    const [porcentagemDeFeitos, setPorcentagemFeitos] = useState(0)

    

    useEffect(() => {
        const url =  "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        })
        .then(response => {
            setHabitosEncontrados(response.data)
        })
    }, [])

    setCorDeFundo("#F2F2F2")

    const { setPorcentagem } = useContext(NameContext)

    useEffect(() => {

        if(Array.isArray(habitosEncontrados)) {
            const totalFeitos = habitosEncontrados.filter(objeto => objeto.done).length;

            setPorcentagemFeitos((totalFeitos / habitosEncontrados.length) * 100) ;

            setPorcentagem(porcentagemDeFeitos)

        }
    }, [habitosEncontrados])


    return (
        <Centralizadora>
            <CorpoEstilizado $select={false} $porcentagemFeitos={porcentagemDeFeitos}>
                <h2>{diaEncontrado.dia}, {diaDeHoje}</h2>
                <div>
                    <span>
                        {!porcentagemDeFeitos ? "Nenhum hábito concluído ainda" : `${porcentagemDeFeitos}% dos hábitos concluídos`}
                    </span>

                    <footer>
                        {habitosEncontrados && habitosEncontrados.map((habito) => {
                            return (
                                <HabitosDeHoje key={habito.id} porcentagemDeFeitos={porcentagemDeFeitos} setPorcentagemFeitos={setPorcentagemFeitos} habitosEncontrados={habitosEncontrados} setHabitosEncontrados={setHabitosEncontrados} idDoHabito={habito.id} done={habito.done} currentSequence={habito.currentSequence} highestSequence={habito.highestSequence} name={habito.name}  />
                            )
                        })}
                    </footer>

                </div>
            </CorpoEstilizado>
        </Centralizadora>
    )
}

export default Hoje