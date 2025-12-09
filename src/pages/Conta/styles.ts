import styled from "styled-components";

export const DashBoardContainer = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: stretch;
    @media (max-width: 1260px) {
        display: initial;
    }
`;

export const DashboardMainConta = styled.main`
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

export const ContaContainer = styled.div`
  background-color: white;
  width: 100%;
  max-width: 1485px;
  padding: 65px 35px 40px 35px;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;

  @media (max-width: 940px) {
    padding: 65px 25px 100px 25px;
  }

  @media (max-width: 870px) {
    padding: 65px 40px 100px 15px;
  }

  @media (max-width: 675px) {
    padding: 65px 15px 100px 15px;
  }
`;

export const DadosConta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  > div > p > span {
    font-weight: bold;
    color: #000000;
  }
`;

export const FotoPerfilContainer = styled.div`
  margin-bottom: 20px;
`;

export const FotoPerfilConteudo = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const FotoPerfil = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
`;

export const BotaoEditarFoto = styled.label`
  background-color: var(--cor-principal);
  border: none;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #455a64;
  }

  img {
    width: 25px;
    height: auto;
  }
`;

export const BotaoRemoverFoto = styled.button`
  background-color: var(--cor-principal);
  border: none;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #455a64;
  }

  img {
    width: 25px;
    height: auto;
  }
`;

export const InputFotoPerfil = styled.input`
  display: none;
`;

export const ContainerEditarConta = styled.div`
  margin-top: 40px;
  width: 770px;
  border: 2px solid #e0e0e0;
  padding: 20px 0 40px 20px;

  h2 {
    font-size: 20px;
  }

  @media (max-width: 870px) {
    width: 100%;
  }

  @media (max-width: 560px) {
    padding: 20px 0 40px 10px;
  }

  @media (max-width: 500px) {
    h2 {
      font-size: 18px;
    }
  }
`;

export const FormEditarConta = styled.form`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputEditarConta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const InputLabel = styled.label`
  font-size: 16px;

  @media (max-width: 500px) {
    font-size: 15px;
  }
`;

export const InputField = styled.input`
  padding: 5px 0 5px 5px;
  background-color: #f5f7fa;
  border: 1px solid #b0bec5;
  font-size: 16px;
  font-family: var(--fonte-principal);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  width: 480px;

  &:focus {
    outline: none;
    border-color: #e5e5e5;
    box-shadow: 0 0 0 2px #d1d5db;
  }

  @media (max-width: 630px) {
    width: 90%;
  }

  @media (max-width: 500px) {
    font-size: 15px;
  }
`;

export const MensagensContainer = styled.div`
  margin-top: 20px;
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

export const BotaoEditarConta = styled.div`
  margin-top: 13px;
`;

export const BotaoSalvar = styled.button`
  background-color: var(--cor-principal);
  padding: 10px 0;
  font-size: 16px;
  width: 210px;
  color: white;
  font-weight: bold;
  border: none;
  font-family: var(--fonte-principal);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #455a64;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 500px) {
    font-size: 15px;
    width: 190px;
  }
`;

export const BotaoExcluirContaContainer = styled.div`
  margin-top: 50px;
`;

export const BotaoExcluirConta = styled.button`
  background-color: #c62828;
  padding: 10px 0;
  width: 210px;
  font-size: 16px;
  color: white;
  font-weight: bold;
  border: none;
  font-family: var(--fonte-principal);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #ad1b1b;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 500px) {
    font-size: 15px;
    width: 190px;
  }
`;