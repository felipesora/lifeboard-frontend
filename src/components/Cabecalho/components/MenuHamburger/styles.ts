import styled from "styled-components";

export const ContainerMenuHamburger = styled.aside`
    padding: 10px 0 0 20px;
    display: flex;
    flex-direction: column;
    .btn_fechar {
        display: flex;
        justify-content: flex-start;
        button {
            border: 1px solid #9198A1;
            background-color: transparent;
            padding: 5px;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background-color: #455A64;
            }
            img {
                width: 20px;
                height: auto;   
            }
        }
    }
    .menu_hamburger_nav {
        margin-top: 30px;
        flex-grow: 1;
        p{
            font-size: 16px;
            color: #CFD8DC;
        }
        ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 10px;
        }
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
    .menu_hamburger_secao_2 {
        margin-top: 45px;
    }
    .menu_hamburger_footer {
        margin-top: 45px;
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
            &:hover img {
                filter: brightness(0.9);
                transform: scale(1.1);
                transition: transform 0.2s ease, filter 0.2s ease;
            }
        }
        img {
            width: 30px;
            height: auto;
        }
    }
`;