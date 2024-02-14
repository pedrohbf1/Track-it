import { useState } from "react"
import styled from "styled-components"

const DivEstilizada = styled.button`
    width: 30px;
    height: 30px;
    background-color: ${props => props.$select ? "#CFCFCF" : "white"};
    color: ${props => props.$select ? "white" : "#D4D4D4"};
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    cursor: pointer;
`

const BotaoDeSelecionarDia = ({ dia, diasDoHabito, setDiasDoHabito, indexDoDia }) => {

    function onClickNoBotao (valor) {

        setDiasDoHabito([...diasDoHabito, valor])
        
        const existe = diasDoHabito.includes(valor)
        if (existe) {
            const novoArray = diasDoHabito.filter(item => item != valor)
            setDiasDoHabito(novoArray)
        }
        
        setSelect(!select)


    }

    const [select, setSelect] = useState(false)

    return (
        <DivEstilizada $select={select} onClick={() => onClickNoBotao(indexDoDia)}>{dia}</DivEstilizada>
    )
}

export default BotaoDeSelecionarDia