import styled from "styled-components";

export const ModalOverlayMeta = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const ModalConteudoMeta = styled.div`
  background: #fff;
  width: 730px;
  border-radius: 2px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  @media (max-width: 1090px) {
    width: 690px;
  }

  @media (max-width: 960px) {
    width: 630px;
  }

  @media (max-width: 780px) {
    width: 570px;
  }

  @media (max-width: 740px) {
    width: 500px;
  }

  @media (max-width: 650px) {
    width: 470px;
  }

  @media (max-width: 550px) {
    width: 420px;
  }

  @media (max-width: 500px) {
    width: 400px;
  }

  @media (max-width: 470px) {
    width: 380px;
  }

  @media (max-width: 420px) {
    width: 340px;
  }

  @media (max-width: 390px) {
    width: 320px;
  }
`;

export const ModalCabecalhoMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 7px 10px;

  h2 {
    font-size: 20px;

    @media (max-width: 780px) {
      font-size: 18px;
    }
  }
`;

export const BotaoFecharMeta = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 25px;
    height: auto;
  }
`;

export const DivisorModalMeta = styled.hr`
  border: none;
  height: 2px;
  background-color: #e0e0e0;
`;

export const ModalCorpoMeta = styled.div`
  padding: 20px 0 60px 20px;

  @media (max-width: 500px) {
    padding: 10px 0 40px 10px;
  }
`;

export const TextoConfirmacao = styled.p`
  font-weight: bold;

  @media (max-width: 780px) {
    font-size: 14px;
  }

  @media (max-width: 550px) {
    max-width: 350px;
  }
`;

export const BotoesMetaContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 780px) {
    margin-top: 0;
  }

  @media (max-width: 500px) {
    flex-direction: column-reverse;
    gap: 0;
  }
`;

export const BotaoCancelarMeta = styled.button`
  background-color: var(--cor-principal);
  width: 180px;
  padding: 7px 0;
  font-size: 16px;
  color: white;
  font-weight: bold;
  border: none;
  font-family: var(--fonte-principal);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin: 15px 0 0 0;

  &:hover {
    background-color: #455a64;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 780px) {
    font-size: 15px;
  }

  @media (max-width: 550px) {
    width: 160px;
  }

  @media (max-width: 500px) {
    width: 180px;
  }
`;

export const BotaoDeletarMeta = styled.button`
  background-color: #c62828;
  width: 180px;
  padding: 7px 0;
  font-size: 16px;
  color: white;
  font-weight: bold;
  border: none;
  font-family: var(--fonte-principal);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin: 15px 0 0 0;

  &:hover {
    background-color: #ad1b1b;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 780px) {
    font-size: 15px;
  }

  @media (max-width: 550px) {
    width: 160px;
  }

  @media (max-width: 500px) {
    width: 180px;
  }
`;