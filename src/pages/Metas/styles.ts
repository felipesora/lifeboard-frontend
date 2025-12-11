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

export const DashboardMainMetas = styled.main`
  flex: 1;
  padding: 40px;
  background-color: #eceff1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > p {
    font-weight: bold;
    color: #666;

    span {
      color: #000000;
    }
  }

  @media (max-width: 1810px) {
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
      font-size: 14px;
    }
  }
`;

export const MetasContainer = styled.div`
  background-color: white;
  width: 100%;
  max-width: 1485px;
  padding: 65px 35px 150px 35px;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;

  @media (max-width: 940px) {
    padding: 65px 25px 150px 25px;
  }

  @media (max-width: 900px) {
    padding: 65px 15px 150px 15px;
  }

  @media (max-width: 825px) {
    padding: 45px 15px 100px 15px;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
  }
`;

export const MetasForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 450px) {
    gap: 30px;
  }
`;

export const FiltrosMetasContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 450px) {
    gap: 20px;
    flex-direction: column;
  }
`;

export const FiltroMeta = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  gap: 5px;

  label {
    font-size: 16px;

    @media (max-width: 780px) {
      font-size: 15px;
    }
  }

  select,
  input {
    background-color: #fafafa;
    border: 1px solid #e0e0e0;
    font-family: var(--fonte-principal);
    font-size: 14px;
    padding: 5px 2px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
      outline: none;
      border-color: #e5e5e5;
      box-shadow: 0 0 0 2px #d1d5db;
    }
  }
`;

export const BotoesFiltroContainer = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 900px) {
    gap: 10px;
  }

  @media (max-width: 600px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
`;

export const BotaoFiltro = styled.button`
  background-color: #37474f;
  padding: 10px 0;
  width: 270px;
  font-size: 16px;
  color: white;
  border: none;
  font-family: var(--fonte-principal);
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #455a64;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 900px) {
    width: 230px;
    font-size: 16px;
  }

  @media (max-width: 780px) {
    width: 180px;
    font-size: 15px;
  }
`;

export const CardsMetasContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap;
  gap: 95px;

  @media (max-width: 1373px) {
    gap: 50px;
    justify-content: center;
  }
`;

export const MensagemSemMetas = styled.p`
  color: #666;
  font-style: italic;
  text-align: center;
  width: 100%;
  margin-top: 20px;
`;