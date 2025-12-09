import styled, { keyframes } from "styled-components";

export const DashBoardContainer = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: stretch;
    @media (max-width: 1260px) {
        display: initial;
    }
`;

export const DashboardMainPomodoro = styled.main`
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

export const ContainerPomodoro = styled.div`
  background-color: white;
  width: 100%;
  max-width: 1485px;
  padding: 65px 35px 100px 35px;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;

  @media (max-width: 940px) {
    padding: 65px 25px 100px 25px;
  }

  @media (max-width: 900px) {
    padding: 65px 15px 100px 15px;
  }

  @media (max-width: 640px) {
    width: 100%;
    max-width: 100%;
  }
`;

export const CaixaPomodoro = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 0 50px 0;
  background-color: white;
  border: 2px solid #e0e0e0;
  width: 690px;

  @media (max-width: 770px) {
    width: 600px;
  }

  @media (max-width: 700px) {
    width: 570px;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const IconeRelogio = styled.img`
  width: 90px;
  height: auto;
`;

const piscar = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

export const TempoDisplay = styled.h1<{ tempoZerado: boolean }>`
  font-size: 64px;
  color: #434343;
  margin-top: 10px;
  animation: ${props => props.tempoZerado ? piscar : 'none'} 1s infinite;
`;

export const BotoesControle = styled.div`
  margin-top: 35px;
  display: flex;
  gap: 15px;

  @media (max-width: 700px) {
    button {
      padding: 7px 0;
      width: 160px;
    }
  }

  @media (max-width: 440px) {
    button {
      padding: 5px 0;
      width: 150px;
    }
  }

  @media (max-width: 380px) {
    flex-direction: column;
  }
`;

export const BotaoControle = styled.button`
  background-color: #37474f;
  padding: 10px 0;
  width: 180px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #455a64;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }
`;

export const BotoesTempo = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 12px;

  @media (max-width: 700px) {
    margin-top: 20px;

    button {
      width: 120px;
      font-size: 18px;
    }
  }

  @media (max-width: 440px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 17px;
  }
`;

export const BotaoTempo = styled.button`
  background-color: #37474f;
  padding: 5px 0;
  width: 130px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-family: var(--fonte-prinicipal);
  font-size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #455a64;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }
`;

export const ContainerPergunta = styled.div`
  margin-top: 30px;
`;

export const DetalhesPergunta = styled.details`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  transition: box-shadow 0.3s ease;

  &[open] {
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
  }
`;

export const SumarioPergunta = styled.summary`
  cursor: pointer;
  padding: 10px 20px;
  font-weight: bold;
  font-family: var(--fonte-principal);
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #cfd8dc;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }

  img {
    width: 18px;
    height: auto;
    transition: transform 0.3s ease;
  }

  ${DetalhesPergunta}[open] & img {
    transform: rotate(180deg);
  }

  @media (max-width: 500px) {
    font-size: 15px;
  }
`;

export const RespostaPergunta = styled.div`
  background-color: #fafafa;
  padding: 20px;
  font-family: var(--fonte-principal);
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  transition: all 0.3s ease;
`;

export const ListaResposta = styled.ul`
  margin-top: 12px;
  padding-left: 20px;
  list-style-type: disc;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AudioAlarme = styled.audio`
  display: none;
`;