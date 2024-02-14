import { useContext } from "react"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import NameContext from "../../NameContext"
import { useEffect } from "react"
import { useState } from "react"
import Rodape from "../../Componentes/Rodape"

const HeaderEstilizada = styled.header`
    width: 100%;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px 0px #00000026;
    height: 70px;
    div {
        display: flex;
        padding: 10px 10px 10px 18px;
        justify-content: space-between;
        display: flex;
        align-items: center;
        :nth-child(2) {
            img {
                width: 51px;
                height: 51px;
                border-radius: 50px;
            }
        }
    }
`
const PaginaPadraoPage = () => {

    const data = JSON.parse(localStorage.getItem('data'))

    return (
        <>
            <HeaderEstilizada>
                <div>
                    <span>
                        <img src="/public/TrackIt.png" alt="Logo" />
                    </span>

                    <span>
                        <img src={data.image} alt="" />
                    </span>
                </div>
            </HeaderEstilizada>

            <Outlet />

            <Rodape />            
        </>
    )
}

export default PaginaPadraoPage