import styled from "styled-components";

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

export const DashboardMainKanban = styled.main`
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > p {
    font-weight: bold;
    color: #000000;
  }

  @media (max-width: 1470px) {
    padding: 40px 30px;
  }

  @media (max-width: 940px) {
    padding: 40px 20px;
  }

  @media (max-width: 900px) {
    padding: 40px 10px;
  }

  @media (max-width: 760px) {
    > p {
      font-size: 15px;
    }
  }

  @media (max-width: 600px) {
    padding: 40px 0;

    > p {
      margin-left: 10px;
    }
  }
`;

export const CardsTarefasContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 35px;

  @media (max-width: 1450px) {
    gap: 20px;
  }

  @media (max-width: 1420px) {
    gap: 15px;
  }

  @media (max-width: 1410px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
  }

  @media (max-width: 760px) {
    gap: 20px;
  }
`;

export const ColunasTarefasContainer = styled.div`
  margin-top: 65px;
  display: flex;
  gap: 35px;

  @media (max-width: 1450px) {
    gap: 20px;
  }

  @media (max-width: 1420px) {
    gap: 15px;
  }

  @media (max-width: 1410px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
  }

  @media (max-width: 760px) {
    gap: 20px;
  }

  @media (max-width: 745px) {
    margin-top: 40px;
  }
`;

export const ColunaTarefa = styled.div`
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  width: 345px;
  height: 680px;
  display: flex;
  flex-direction: column;
`;

interface ColunaCabecalhoProps {
  backgroundColor: string;
}

export const ColunaCabecalho = styled.div<ColunaCabecalhoProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  flex-shrink: 0;
  background-color: ${props => props.backgroundColor};

  p {
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
`;

export const BotaoAdicionarTarefa = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  img {
    width: 35px;
    height: auto;
  }
`;

export const ColunaConteudo = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #90a4ae;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #677379;
  }
`;