import { Link, Outlet } from "react-router-dom"
import styled from "styled-components"

const Header = styled.header`
    display: flex;
    flex-direction: column;
    img {
        margin: 62px auto 32px;
    }
`

const PaginaPadraoLogin = () => {
    return (
        <Header>
            <Link to="/" style={{display: "flex"}}>
                <img src="/public/LogoTrackLd.png" alt="Logo TrackLd"/>
            </Link>
            <Outlet />
        </Header>
    )
}

export default PaginaPadraoLogin