import styled from "styled-components";

export const ContainerMenuLateral = styled.aside`
    width: 300px;
    height: auto;
    background-color: var(--cor-principal);
    color: white;
    display: flex;
    flex-direction: column;
    padding: 40px 30px 20px 30px;
    box-sizing: border-box;
    .logo {
        display: flex;
        justify-content: center;
        h2 {
            font-size: 40px;
            font-weight: 400;
            @media (max-width: 1810px) {
                font-size: 35px;
            }
            @media (max-width: 1330px) {
                font-size: 32px;
            }
        }
    }
    @media (max-width: 1810px) {
        width: 270px;
    }
    @media (max-width: 1330px) {
        width: 250px;
    }
    @media (max-width: 1260px) {
        display: none;
    }
`;

export const MenuNav = styled.nav`
    margin-top: 45px;
    flex-grow: 1;
    p{
        font-size: 16px;
        color: #CFD8DC;
    }
    .menu_section_2 {
        margin-top: 45px;
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 10px;
        li {
            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 14px;
                cursor: pointer;
                color: #FFFFFF;
                font-family: var(--fonte-principal);
                position: relative;
                transition: all 0.3s ease;
                &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 0;
                    height: 100%;
                    background-color: #FFFFFF;
                    transition: width 0.3s ease;
                }
                &:hover::before {
                    width: 4px;
                }
                &:hover {
                    background-color: rgba(255, 255, 255, 0.05);
                    padding: 0 7px 0 10px;
                }
                &:hover::after {
                    width: 100%;
                }
                img {
                    width: 30px;
                    height: auto;
                }
            }
        }
    }
`;

export const RodapeMenu = styled.div`
    display: flex;
    gap: 2px;
    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        img {
            width: 30px;
            height: auto;
        }
        :hover img {
            filter: brightness(0.9);
            transform: scale(1.1);
            transition: transform 0.2s ease, filter 0.2s ease;
        }
    }
    img {
        width: 30px;
        height: auto;
    }
`;