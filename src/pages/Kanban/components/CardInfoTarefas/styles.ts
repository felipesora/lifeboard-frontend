import styled from "styled-components";

interface TextoComCorProps {
  cor: string;
}

export const CardTarefaContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  width: 330px;
  padding: 15px 0 35px 15px;
`;

export const CardTarefaContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CardTarefaCabecalho = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const IconeCard = styled.img`
  width: 35px;
  height: auto;
`;

export const TituloCard = styled.h2`
  font-size: 20px;
  font-weight: 500;
`;

export const CardTarefaConteudo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DescricaoCard = styled.p<TextoComCorProps>`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.cor};
`;

export const QuantidadeCard = styled.p<TextoComCorProps>`
  font-size: 32px;
  font-weight: bold;
  color: ${props => props.cor};
`;