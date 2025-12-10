import styled from "styled-components";

export const DashBoardContainer = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: stretch;
    @media (max-width: 1260px) {
        display: initial;
    }
`;

export const DashboardMainCadastroMetas = styled.main`
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

  @media (max-width: 460px) {
    > p {
      font-size: 13px;
    }
  }
`;

export const CadastroMetasContainer = styled.div`
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

export const CadastroMetasForm = styled.form``;

export const InputsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 42px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const InputNomeMeta = styled(InputGroup)`
  width: 515px;
`;

export const InputDataLimite = styled(InputGroup)`
  width: 500px;
`;

export const InputValorMeta = styled(InputGroup)`
  width: 515px;
`;

export const InputLabel = styled.label`
  font-size: 16px;

  @media (max-width: 760px) {
    font-size: 15px;
  }
`;

export const InputField = styled.input`
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
`;

export const MensagensContainer = styled.div`
  margin-top: 20px;

  @media (max-width: 600px) {
    font-size: 15px;
  }
`;

export const MensagemSucesso = styled.p`
  color: #2e7d32;
  font-weight: 500;
  margin: 10px 0;
`;

export const MensagemErro = styled.p`
  color: #c62828;
  font-weight: 500;
  margin: 10px 0;
`;

export const BotoesContainer = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 30px;

  @media (max-width: 760px) {
    margin-top: 30px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const BotaoAcao = styled.button`
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

  @media (max-width: 760px) {
    width: 250px;
    font-size: 15px;
  }

  @media (max-width: 600px) {
    width: 200px;
    font-size: 15px;
  }

  @media (max-width: 460px) {
    width: 190px;
    font-size: 15px;
    padding: 9px 0;
  }
`;

export const CadastrarButton = styled.button<{ $loading?: boolean }>`
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

    @media (max-width: 760px) {
      width: 250px;
      font-size: 15px;
    }

    @media (max-width: 600px) {
      width: 200px;
      font-size: 15px;
    }

    @media (max-width: 460px) {
      width: 190px;
      font-size: 15px;
      padding: 9px 0;
    }
  
    ${props => props.$loading && `
        opacity: 0.8;
        cursor: wait;
    `}
`;