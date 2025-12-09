import styled from "styled-components";

export const ContainerCardFuncionalidade = styled.div`
    background-color: white;
    width: 500px;
    padding: 35px 20px 30px 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: 2px solid transparent;
    transition: transform 0.2s ease, border 0.2s ease, box-shadow 0.3s ease;
    &:hover {
        transform: translateY(-2px);
        border: 2px solid #B0BEC5;
        box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    }
    @media(max-width: 675px) {
        width: 550px;
        padding: 35px 20px 30px 20px
    }
    @media(max-width: 550px) {
        max-width: 450px;
        width: 100%;
    }
    .imagem_funcionalidade {
        width: 250px;
        height: 180px; /* altura fixa para todas */
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain; /* garante que não distorça */
        }
    }
    .conteudo_card {
        width: 100%;
        h4 {
            font-size: 20px;
            color: #37474F;
        }
        p {
            font-size: 16px;
            color: #607D8B;
            margin-top: 5px;
        }
    }
`;