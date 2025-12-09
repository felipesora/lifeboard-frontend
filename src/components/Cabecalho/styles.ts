import styled from "styled-components";

export const CabecalhoContainer = styled.header`
    display: none;
    background-color: var(--cor-principal);
    justify-content: space-between;
    padding: 15px 20px;
    align-items: center;
    @media (max-width: 1260px) {
        display: flex;
    }
    .logo {
        display: flex;
        align-items: center;
        color: white;
        gap: 7px;
        img {
            width: 70px;
            height: auto;
            @media (max-width: 810px) {
                width: 60px;
            }
            @media (max-width: 620px) {
                width: 50px;
            }
        }
        h1 {
            font-size: 24px;
        }
    }
    .btn_menu_hamburger {
        border: 1px solid #9198A1;
        background-color: transparent;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        img {
            width: 30px;
            height: auto;
        }
        &:hover {
            background-color: #455A64;
        }
    }
    .menu_hamburguer {
        position: fixed;
        top: 0;
        right: -300px; /* escondido */
        width: 300px;
        height: 100%;
        background: var(--cor-principal);
        color: white;
        transition: right 0.3s ease;
        z-index: 1000;
        @media (max-width: 530px) {
            right: -250px;
            width: 250px;
        }
    }

    .menu_hamburguer.ativo {
        right: 0; /* mostra */
    }
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 500;
    }
`;