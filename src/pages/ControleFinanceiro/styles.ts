import styled from "styled-components";
import { ContainerCardTransacao } from "./components/CardTransacao/styles";

interface DashBoardContainerProps {
  $carregando?: boolean;
}

export const DashBoardContainer = styled.div<DashBoardContainerProps>`
    display: flex;
    min-height: 100vh;
    align-items: stretch;
    @media (max-width: 1260px) {
        display: initial;
    }
    ${props => props.$carregando && `
        pointer-events: none;
        user-select: none;
    `}
`;

export const DashBoardMain = styled.main`
    flex: 1;
    padding: 40px;
    background-color: #ECEFF1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .titulo {
        p {
            font-size: 16px;
            font-weight: 700;
            @media (max-width: 760px) {
                font-size: 15px;
            }
        }
        @media (max-width: 675px) {
            margin-left: 10px;
        }
    }
    @media (max-width: 1810px) {
        padding: 40px 30px;
    }
    @media (max-width: 1260px) {
        padding: 30px 0 50px 50px;
    
    }
    @media (max-width: 1150px) {
        padding: 30px 0 50px 30px;
    }
    @media (max-width: 970px) {
        padding: 30px 0 50px 20px;
    }
    @media (max-width: 810px) {
        padding: 30px 0 50px 10px;
    }
    @media (max-width: 675px) {
        padding: 30px 0 50px 0px;
    }
`;

export const ContainerCardsPequenosETransacoes = styled.div`
    display: flex;
    align-items: stretch;
    gap: 50px;
    margin-top: 20px;
    @media (max-width: 1760px) {
        gap: 30px; /* espaço entre cards pequenos e transações */
    }
    @media (max-width: 1740px) {
        gap: 35px;
        flex-direction: column;
    }
    @media (max-width: 675px) {
        display: inline;
    }
`;

export const ContainerCardsPequenosEGrafico = styled.div`
    display: flex;
    flex-direction: column;
    gap: 35px;
    @media (max-width: 675px) {
        display: inline;
    }
`;

export const ContainerCardsPequenos = styled.div`
    display: flex;
    gap: 50px;
    @media (max-width: 1760px) {
        gap: 50px;
    }
    @media (max-width: 1740px) {
        gap: 0px;
        justify-content: space-between;
    }
    @media (max-width: 950px) {
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }
    @media (max-width: 910px) {
        gap: 15px;
    }
    @media (max-width: 880px) {
        gap: 15px;
    }
    @media (max-width: 675px) {
        flex-wrap: nowrap;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
    }
`;

export const ContainerCardGrafico = styled.div`
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    width: 970px;
    padding: 15px 0px 65px 15px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    .titulo_grafico {
        display: flex;
        align-items: center;
        gap: 7px;
        p {
            font-size: 18px;
        }
    }
    @media (max-width: 1740px) {
        width: 1270px;
    }
    @media (max-width: 1620px) {
        width: 1200px;
    }
    @media (max-width: 1560px) {
        width: 1140px;
    }
    @media (max-width: 1500px) {
        width: 1100px;
    }
    @media (max-width: 1460px) {
        width: 1070px;
    }
    @media (max-width: 1430px) {
        width: 1050px;
    }
    @media (max-width: 1410px) {
        width: 1020px;
    }
    @media (max-width: 1380px) {
        width: 1000px;
    }
    @media (max-width: 1360px) {
        width: 970px;
    }
    @media (max-width: 1330px) {
        width: 960px;
    }
    @media (max-width: 1300px) {
        width: 940px;
    }
    @media (max-width: 1280px) {
        width: 920px;
    }
    @media (max-width: 1260px) {
        width: 1130px;
    }
    @media (max-width: 1230px) {
        width: 1100px;
    }
    @media (max-width: 1200px) {
        width: 1080px;
    }
    @media (max-width: 1180px) {
        width: 1050px;
    }
    @media (max-width: 1120px) {
        width: 1000px;
    }
    @media (max-width: 1070px) {
        width: 950px;
    }
    @media (max-width: 1020px) {
        width: 920px;
    }
    @media (max-width: 990px) {
        width: 890px;
    }
    @media (max-width: 950px) {
        width: 850px;
    }
    @media (max-width: 910px) {
        width: 820px;
    }
    @media (max-width: 880px) {
        width: 790px;
    }
    @media (max-width: 850px) {
        width: 750px;
    }
    @media (max-width: 800px) {
        width: 730px;
    }
    @media (max-width: 775px) {
        width: 700px;
    }
    @media (max-width: 720px) {
        width: 650px;
    }
    @media (max-width: 700px) {
        width: 630px;
    }
    @media (max-width: 675px) {
        width: 100%;
        margin-top: 30px;
    }
    @media (max-width: 430px) {
        padding: 15px 0px 65px 5px;
    }
    @media (max-width: 390px) {
        padding: 15px 0px 65px 2px;
    }
`;

export const ContainerCardTransacoes = styled.div`
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    width: 390px;
    padding: 15px 0px 65px 15px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    
    > div:first-child {
        display: flex;
        align-items: center;
        gap: 7px;
        
        p {
            font-size: 18px;
        }
        
        img {
            width: 35px;
            height: auto;
        }
    }
    
    .sem-transacoes {
        color: #666;
        font-style: italic;
        margin: 10px 0;
    }
    
    .card_transacoes_link {
        margin-top: 10px;
        
        button {
            background-color: transparent;
            border: none;
            font-family: var(--fonte-principal);
            font-size: 16px;
            cursor: pointer;
            
            &:hover {
                text-decoration: underline;
            }
        }
    }
    
    /* RESPONSIVO */
    @media (max-width: 1740px) {
        width: 1270px;
        flex-direction: column;
        gap: 15px;
        
        ${ContainerCardTransacao} {
            p {
                width: 700px;
                white-space: normal;
                overflow: visible;
                text-overflow: clip;
            }
        }
    }
    
    @media (max-width: 1620px) {
        width: 1200px;
    }
    
    @media (max-width: 1560px) {
        width: 1140px;
    }
    
    @media (max-width: 1500px) {
        width: 1100px;
    }
    
    @media (max-width: 1460px) {
        width: 1070px;
    }
    
    @media (max-width: 1430px) {
        width: 1050px;
    }
    
    @media (max-width: 1410px) {
        width: 1020px;
    }
    
    @media (max-width: 1380px) {
        width: 1000px;
    }
    
    @media (max-width: 1360px) {
        width: 970px;
    }
    
    @media (max-width: 1330px) {
        width: 960px;
    }
    
    @media (max-width: 1300px) {
        width: 940px;
    }
    
    @media (max-width: 1280px) {
        width: 920px;
    }
    
    @media (max-width: 1260px) {
        width: 1130px;
    }
    
    @media (max-width: 1230px) {
        width: 1100px;
    }
    
    @media (max-width: 1200px) {
        width: 1080px;
    }
    
    @media (max-width: 1180px) {
        width: 1050px;
    }
    
    @media (max-width: 1120px) {
        width: 1000px;
    }
    
    @media (max-width: 1070px) {
        width: 950px;
    }
    
    @media (max-width: 1020px) {
        width: 920px;
    }
    
    @media (max-width: 990px) {
        width: 890px;
    }
    
    @media (max-width: 950px) {
        width: 850px;
    }
    
    @media (max-width: 910px) {
        width: 820px;
    }
    
    @media (max-width: 880px) {
        width: 790px;
    }
    
    @media (max-width: 850px) {
        width: 750px;
    }
    
    @media (max-width: 800px) {
        width: 730px;
    }
    
    @media (max-width: 775px) {
        width: 700px;
    }
    
    @media (max-width: 720px) {
        width: 650px;
    }
    
    @media (max-width: 700px) {
        width: 630px;
    }
    
    @media (max-width: 675px) {
        width: 100%;
        margin-top: 30px;
        
        > div:first-child {
            width: 94%;
        }
    }
    
    @media (max-width: 450px) {
        > div:first-child {
            width: 98%;
        }
    }
    
    @media (max-width: 430px) {
        padding: 15px 0px 65px 5px;
    }
    
    @media (max-width: 390px) {
        padding: 15px 0px 65px 2px;
    }
`;

export const CardMetasContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  width: auto;
  align-self: flex-start;
  padding: 15px 0px 65px 15px;
  box-sizing: border-box;
  margin-top: 40px;

  @media (max-width: 1740px) {
    width: 1270px;
    box-sizing: initial;
    margin-top: 35px;
  }

  @media (max-width: 1620px) {
    width: 1200px;
  }

  @media (max-width: 1560px) {
    width: 1140px;
  }

  @media (max-width: 1500px) {
    width: 1100px;
  }

  @media (max-width: 1460px) {
    width: 1070px;
  }

  @media (max-width: 1430px) {
    width: 1050px;
  }

  @media (max-width: 1410px) {
    width: 1020px;
  }

  @media (max-width: 1380px) {
    width: 1000px;
  }

  @media (max-width: 1360px) {
    width: 970px;
  }

  @media (max-width: 1330px) {
    width: 960px;
  }

  @media (max-width: 1300px) {
    width: 940px;
  }

  @media (max-width: 1280px) {
    width: 920px;
  }

  @media (max-width: 1260px) {
    width: 1130px;
  }

  @media (max-width: 1230px) {
    width: 1100px;
  }

  @media (max-width: 1200px) {
    width: 1080px;
  }

  @media (max-width: 1180px) {
    width: 1050px;
  }

  @media (max-width: 1120px) {
    width: 1000px;
  }

  @media (max-width: 1070px) {
    width: 950px;
  }

  @media (max-width: 1020px) {
    width: 920px;
  }

  @media (max-width: 990px) {
    width: 890px;
  }

  @media (max-width: 950px) {
    width: 850px;
  }

  @media (max-width: 910px) {
    width: 820px;
  }

  @media (max-width: 880px) {
    width: 790px;
  }

  @media (max-width: 850px) {
    width: 750px;
  }

  @media (max-width: 800px) {
    width: 730px;
  }

  @media (max-width: 775px) {
    width: 700px;
  }

  @media (max-width: 720px) {
    width: 650px;
  }

  @media (max-width: 700px) {
    width: 630px;
  }

  @media (max-width: 675px) {
    width: 100%;
    margin-top: 30px;
    box-sizing: border-box;
  }

  @media (max-width: 450px) {
    padding: 15px 0px 65px 0px;
  }

  @media (max-width: 430px) {
    padding: 15px 0px 65px 5px;
  }

  @media (max-width: 390px) {
    padding: 15px 0px 65px 2px;
  }
`;

export const CardMetasTitulo = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  
  p {
    font-size: 18px;
  }
  
  @media (max-width: 450px) {
    margin-left: 15px;
  }
  
  @media (max-width: 430px) {
    margin-left: 0px;
  }
`;

export const DivSemMetas = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`;

export const CardMetasLista = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 50px;
  flex-wrap: wrap;

  @media (max-width: 1740px) {
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const CardMetasLink = styled.div`
  margin-top: 15px;
  
  button {
    background-color: transparent;
    border: none;
    font-family: var(--fonte-principal);
    font-size: 16px;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 450px) {
    margin-left: 15px;
  }
  
  @media (max-width: 430px) {
    margin-left: 0px;
  }
`;

export const SemMetasText = styled.p`
  color: #666;
  font-style: italic;
  margin: 10px 0;
`;