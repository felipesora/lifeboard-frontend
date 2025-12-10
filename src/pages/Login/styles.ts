import styled from "styled-components";

export const ContainerLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 20px;
    /* dá respiro acima e abaixo */
    min-height: 100vh;
    /* ocupa pelo menos a altura total */
    gap: 30px;
    img {
        @media (max-width: 670px) {
            width: 90px;
            height: auto;
        }
        @media (max-width: 610px) {
            width: 80px;
        }
    }
`;

export const SecaoLogin = styled.section`
    background-color: #ffffff;
    padding: 30px 0 200px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 700px;
    .login_conteudo {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        h1 {
            font-size: 32px;
            font-weight: 400;
            @media (max-width: 610px) {
                font-size: 28px;
            }
            @media (max-width: 450px) {
                font-size: 26px;
            }
        }
        p {
            font-size: 18px;
            font-weight: 400;
            color: #78909C;
            @media (max-width: 610px) {
                font-size: 17px;
            }
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 35px;
        margin-top: 60px;
        div {
            display: flex;
            flex-direction: column;
            width: 400px;
            gap: 10px;
            @media (max-width: 450px) {
                width: 360px;
            }
            label {
                font-size: 20px;
                @media (max-width: 610px) {
                    font-size: 17px;
                }
                @media (max-width: 420px) {
                    width: 320px;
                }
            }
            input {
                padding: 5px 0 5px 5px;
                background-color: #F5F7FA;
                border: 1px solid #B0BEC5;
                font-size: 16px;
                font-family: var(--fonte-principal);
                transition: border-color 0.3s ease, box-shadow 0.3s ease;
                &:focus {
                    outline: none;
                    border-color: #e5e5e5;
                    box-shadow: 0 0 0 2px #d1d5db;
                }
            }
        }
    }
    @media (max-width: 860px) {
        width: 600px;
    }
    @media (max-width: 670px) {
        width: 600px;
    }
    @media (max-width: 610px) {
        width: 500px;
    }
    @media (max-width: 500px) {
        width: 450px;
    }
    @media (max-width: 450px) {
        width: 420px;
    }
    @media (max-width: 420px) {
        width: 400px;
    }
    @media (max-width: 400px) {
        width: 390px;
    }
    @media (max-width: 390px) {
        width: 370px;
    }
    @media (max-width: 370px) {
        width: 350px;
    }
`;

export const MensagemLogin = styled.div`
    display: flex;
    margin-top: 20px;
    .erro {
        color: #A44A48;
        font-weight: 500;
    }
`;

export const LinkPaginaCadastro = styled.div`
    margin-top: 30px;
    .link {
        font-size: 15px;
        button {
            border: none;
            background-color: transparent;
            font-family: var(--fonte-principal);
            font-size: 15px;
            color: #546E7A;
            cursor: pointer;
            text-decoration: underline;
            margin-left: 5px;
        }
    }
`;

export const LoginButton = styled.button<{ $loading?: boolean }>`
    background-color: var(--cor-principal);
    padding: 10px 0;
    font-size: 18px;
    color: white;
    border: none;
    font-family: var(--fonte-principal);
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    &:hover {
        background-color: #455A64;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    }
  
    ${props => props.$loading && `
        opacity: 0.8;
        cursor: wait;
    `}
`;