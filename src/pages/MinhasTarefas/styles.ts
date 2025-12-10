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

export const DashboardMainMinhasTarefas = styled.main`
  flex: 1;
  padding: 40px;
  background-color: #eceff1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > p {
    font-weight: bold;
    color: #000000;
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
    }
  }
`;

export const MinhasTarefasContainer = styled.div`
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

  @media (max-width: 860px) {
    padding: 65px 5px 150px 5px;
  }

  @media (max-width: 825px) {
    padding: 45px 5px 100px 5px;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
  }
`;

export const MinhasTarefasForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FiltrosMinhasTarefasContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 1250px) {
    gap: 7px;
  }

  @media (max-width: 790px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
`;

export const FiltroMinhasTarefas = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  gap: 5px;

  label {
    font-size: 16px;
  }

  input,
  select {
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

  @media (max-width: 970px) {
    width: 240px;
  }
`;

export const BotoesFiltroContainer = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 1250px) {
    gap: 7px;
  }

  @media (max-width: 970px) {
    button {
      width: 240px;
    }
  }

  @media (max-width: 790px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
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

  @media (max-width: 1250px) {
    width: 270px;
    font-size: 15px;
  }

  @media (max-width: 790px) {
    width: 200px;
  }

  @media (max-width: 760px) {
    width: 180px;
    font-size: 14px;
  }

  @media (max-width: 560px) {
    width: 200px;
    font-size: 14px;
  }
`;

export const TabelaScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const TabelaMinhasTarefas = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  thead {
    background-color: #37474f;
    color: white;
  }

  th,
  td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  td {
    font-size: 15px;
  }

  tbody tr:hover {
    background-color: #f5f5f5;
  }

  td:last-child {
    text-align: center;
  }

  td:nth-child(2),
  th:nth-child(2) {
    max-width: 250px;
    white-space: normal;
    word-wrap: break-word;
  }

  @media (max-width: 760px) {
    th {
      font-size: 15px;
    }

    td {
      font-size: 14px;
    }
  }
`;

export const PrioridadeCell = styled.td<{ prioridade: string }>`
  color: ${props => 
    props.prioridade === 'ALTA' ? '#C62828' :
    props.prioridade === 'MEDIA' ? '#F9A825' :
    props.prioridade === 'BAIXA' ? '#2E7D32' : 'inherit'};
`;

export const CelulaAcoes = styled.td`
  position: relative;
`;

export const BotaoMenuTarefas = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const MenuTarefasDropdown = styled.div<{ isOpenUp?: boolean }>`
  position: absolute;
  right: 0;
  ${props => props.isOpenUp ? 'bottom: 50%; top: auto;' : 'top: 100%;'}
  background: #fff;
  border: 1px solid #ddd;
  z-index: 999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 150px;
  overflow: hidden;
`;

export const MenuItemTarefas = styled.button`
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-bottom: 1px solid #eee;
  background: none;
  text-align: left;
  font-family: var(--fonte-principal);
  font-size: 14px;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f5f7fa;
  }
`;

export const BotaoExcelContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: end;
`;

export const BotaoExcel = styled.button`
  background-color: #37474f;
  padding: 10px 0;
  width: 250px;
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
`;