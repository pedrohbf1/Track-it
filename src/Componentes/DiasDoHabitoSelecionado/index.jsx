import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"

const SpanEstilizado = styled.span`
    width: 100%;
    display: flex;
    gap: 4px;
`

const BotaoEstilizado = styled.button`
    width: 30px;
    height: 30px;
    background-color: ${props => props.$select ? "#CFCFCF" : "white"};
    color: ${props => props.$select ? "white" : "#D4D4D4"};
    border: 1px solid #D4D4D4;
    border-radius: 5px;
`

const DiasSelecionadosDoHabito = ({ diasHabito }) => {

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

    return (
        <SpanEstilizado>
            {diasDaSemana.map((day) => {
                return (
                <BotaoEstilizado key={day.indexDoDia} $select={diasHabito.includes(day.indexDoDia)} >
                    {day.dia}
                </BotaoEstilizado>)
            })}
        </SpanEstilizado>
    )
}

export default DiasSelecionadosDoHabito