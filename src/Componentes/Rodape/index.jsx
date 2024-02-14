import styled from "styled-components"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";
import { useContext } from "react";
import NameContext from "../../NameContext";

const RodapeEstilizado = styled.footer`
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    background-color: #FFF;
    align-items: center;
    height: 70px;
    :nth-child(1) {
        color: #52B6FF;
        text-decoration: none;
    }   
    :nth-child(2) {
        width: 91px;
        height: 91px;
        margin-top: -31px;
    }
`

const Rodape = () => {

    const { porcentagem } = useContext(NameContext)

    return (
        <RodapeEstilizado>
            <span>
                <Link to="/habitos">
                    Habitos
                </Link>
            </span>

            <span>
                <Link to="/habitos/hoje">
                    <CircularProgressbar 
                        value={porcentagem} 
                        text={"Hoje"}
                        background
                        backgroundPadding={6} 
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })} 
                    />
                </Link>
            </span>

            <span>
                <Link to="/historico">
                    Historico
                </Link>
            </span>
        </RodapeEstilizado>
    )
}

export default Rodape