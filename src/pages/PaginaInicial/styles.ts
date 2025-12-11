import styled from "styled-components";

export const ContainerPaginaInicial = styled.div`
    button {
        font-family: var(--fonte-principal);
    }
`;

export const Cabecalho = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    @media(max-width: 500px) {
        justify-content: center;
    }
    img {
        width: 60px;
        height: auto;
        @media(max-width: 500px) {
            display: none;
        }
    }
    div {
        display: flex;
        gap: 20px;

        .btn {
            cursor: pointer;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            font-weight: 500;
            padding: 10px 0;
            width: 140px;
            transition: background-color 0.3s ease;
        }

        .btn_entrar {
            background-color: transparent;
            color: #37474F;
            &:hover {
                background-color: #DDE1E4;
            }
        }

        .btn_cadastrar {
            background-color: #37474F;
            color: white;
            &:hover {
                background-color: #263238;
            }
        }
    }
`;

export const SecaoApresentacao = styled.section`
    padding: 65px 35px 100px 35px;
    display: flex;
    align-items: flex-start;
    gap: 70px;
    @media(max-width: 890px) {
        padding: 65px 15px 100px 15px;
    }
    @media(max-width: 770px) {
        padding: 65px 10px 100px 10px;
    }
    @media(max-width: 630px) {
        padding: 65px 25px 100px 25px;
    }
    @media(max-width: 390px) {
        padding: 65px 15px 100px 15px;
    }
    img {
        width: 100%;
        max-width: 900px;
        height: auto;
        @media(max-width: 1860px) {
            max-width: 800px;
        }
        @media(max-width: 1760px) {
            max-width: 700px;
        }
        @media(max-width: 1660px) {
            max-width: 600px;
        }
        @media(max-width: 1560px) {
            max-width: 500px;
        }
        @media(max-width: 1460px) {
            display: none;
        }
    }
    h1 {
        font-size: 42px;
        color: #37474F;
        width: 840px;
        @media(max-width: 890px) {
            font-size: 35px;
            width: 740px;
        }
        @media(max-width: 770px) {
            width: 95%;
        }
    }
    h2 {
        font-size: 30px;
        color: #607D8B;
        width: 840px;
        margin-top: 20px;
        @media(max-width: 890px) {
            font-size: 28px;
            width: 740px;
        }
        @media(max-width: 770px) {
            width: 95%;
        }
    }
    .secao_apresentacao_botoes {
        margin-top: 35px;
        display: flex;
        gap: 20px;
        @media(max-width: 630px) {
            flex-direction: column;
            gap: 10px;
        }
        .btn {
            cursor: pointer;
            border: none;
            border-radius: 4px;
            font-size: 18px;
            font-weight: 700;
            padding: 10px 0;
            transition: background-color 0.3s ease;
        }

        .btn_comecar {
            background-color: #37474F;
            color: white;
            width: 260px;
            &:hover {
                background-color: #263238;
            }
            @media(max-width: 630px) {
                width: 300px;
            }
        }

        .btn_funcionalidades {
            background-color: #607D8B;
            color: white;
            width: 300px;
            &:hover {
                background-color: #455A64;
            }
            @media(max-width: 630px) {
                width: 300px;
            }
        }
    }
`;

export const SecaoFuncionalidades = styled.section`
    background-color: #f0f4f5;
    padding: 65px 35px 100px 35px;
    @media(max-width: 890px) {
        padding: 65px 15px 100px 15px;
    }
    h2 {
        color: #37474f;
        font-size: 32px;
        @media(max-width: 890px) {
            font-size: 28px;
        }
    }
    h3 {
        color: #455a64;
        font-size: 24px;
        margin-top: 10px;
        @media(max-width: 890px) {
            font-size: 20px;
        }
    }
    .cards_funcionalidades {
        margin-top: 80px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 70px;
        @media (max-width: 1860px) {
            justify-content: center;
            gap: 30px;
        }
    }
    .botao_funcionalidades {
        display: flex;
        justify-content: center;
        margin-top: 50px;
        button {
            cursor: pointer;
            background-color: #37474f;
            border: none;
            border-radius: 4px;
            color: white;
            font-size: 18px;
            font-weight: 700;
            padding: 10px 0;
            width: 400px;
            transition: background-color 0.3s ease, transform 0.2s ease;
            &:hover {
            background-color: #263238;
            transform: translateY(-2px);
            }
        }
    }
`;

export const SecaoDemonstracoes = styled.section`
    padding: 65px 35px 100px 35px;
    background-color: #ffffff;
    @media(max-width: 890px) {
        padding: 65px 15px 100px 15px;
    }
    h2 {
        color: #37474f;
        font-size: 32px;
    }
    h3 {
        color: #455a64;
        font-size: 24px;
        margin-top: 10px;
    }
    .cards_demonstracoes {
        margin-top: 60px;
    }
    .carrossel_demonstracoes {
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
        padding: 20px 0;
        padding-bottom: 40px; /* aumenta o espaço entre card e bolinhas */
        box-sizing: border-box;
    }
    .swiper-slide {
        display: flex;
        justify-content: center; /* centraliza horizontalmente */
        align-items: center; /* centraliza verticalmente, se quiser */
    }

    /* Botão do Swiper */
    .swiper-button-next,
    .swiper-button-prev {
        width: 90px; /* largura do botão clicável */
        height: 30px; /* altura do botão clicável */
        background: none; /* remove fundo */
        @media (max-width: 900px) {
            display: none;
        }
    }

    /* Pseudo-elemento que mostra a seta */
    .swiper-button-next::after,
    .swiper-button-prev::after {
        font-size: 40px; /* controla o tamanho da seta */
        color: #37474f; /* cor da seta */
    }

    .swiper-pagination-bullet {
        background: #ccc;
        opacity: 1;
        margin-top: 5px;
    }

    .swiper-pagination-bullet-active {
        background: #37474f;
    }
`;

export const Rodape = styled.footer`
    background-color: #37474f;
    .logo {
        display: flex;
        justify-content: center;
        gap: 7px;
        padding: 30px 0;
        button {
            background-color: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 7px;
        }
        img {
            width: 60px;
            height: auto;
            @media (max-width: 1370px) {
                width: 40px;
            }
        }
        p {
            color: white;
            font-size: 24px;
            font-weight: 700;
            @media (max-width: 1370px) {
                font-size: 20px;
            }
        }
    }
    hr {
        height: 1px;
        background-color: #455a64;
        border: none;
        margin: 0;
    }
    .conteudo_rodape {
        padding: 40px 35px 20px 35px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 675px) {
            flex-direction: column-reverse;
            gap: 20px;
        }
        p {
            color: white;
            font-size: 15px;
            text-align: center;
            @media (max-width: 675px) {
                font-size: 14px;
            }
        }
    }
    .div_links {
        display: flex;
        gap: 15px;
        div {
            width: 40px;
            height: 40px;
            border: 1px solid #455a64;
            border-radius: 50%;
            padding: 5px;
            transition: background 0.2s ease, transform 0.2s ease;
            &:hover {
                background-color: #455a64;
            }
            @media (max-width: 675px) {
                width: 50px;
                height: 50px;
            }
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
`;

