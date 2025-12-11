import styled from "styled-components";

export const ContainerCardDemonstracao = styled.div`
    background-color: #ECEFF1;
    border-radius: 12px;
    width: 675px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    cursor: grab;
    &:active {
        cursor: grabbing;
    }
    .imagem_demonstracao {
        width: 100%;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        border-bottom: 1px solid #37474F;
    }
    .conteudo_demonstracao {
        padding: 20px 0 20px 12px;
        p {
            font-size: 14px;
        }
    }
`;