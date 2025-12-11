import styled from "styled-components";

export const ContainerCardPequeno = styled.div`
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    width: 280px;
    padding: 15px 0px 65px 15px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    @media (max-width: 675px) {
        width: 320px;
    }
    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
            display: flex;
            align-items: center;
            gap: 7px;
            p {
                font-size: 18px;
                width: 200px;
                white-space: normal;        /* Permite quebra de linha */
                overflow-wrap: break-word;  /* Quebra palavras grandes */
                word-wrap: break-word;      /* Compatibilidade */
            }
            img {
                width: 35px;
                height: auto;
            }
        }
    }
    h3 {
        font-size: 28px;
        white-space: normal;        /* Permite quebra de linha */
        overflow-wrap: break-word;  /* Quebra palavras grandes */
        word-wrap: break-word;      /* Compatibilidade */
    }
    .menu_container {
        position: relative;
        display: inline-block;
        button {
            margin-right: 10px;
            border: none;
            background-color: transparent;
            cursor: pointer;
            img {
                width: 20px;
                height: auto;
            }
        }
    }
    .menu_suspenso {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        min-width: 160px;
        z-index: 10;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        width: 150px;
        overflow: hidden; /* arredondar também nas bordas internas */
        button {
            width: 100%;
            padding: 8px 12px;
            border: none;
            background: none;
            text-align: left;
            cursor: pointer;
            font-family: var(--fonte-principal);
            font-size: 14px;
            &:hover {
                background: #f5f7fa;
            }
        }
    }
`;