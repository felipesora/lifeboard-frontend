import styled from "styled-components";

interface PrioridadeProps {
  corFundo: string;
  corTexto: string;
}

interface TextoQuebraLinhaProps {
  largura?: string;
}

export const CardTarefaColuna = styled.div`
  background-color: white;
  border: 2px solid #e0e0e0;
  width: 290px;
  border-radius: 8px;
`;

export const CardTarefaCabecalho = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

export const PrioridadeBadge = styled.div<PrioridadeProps>`
  border-radius: 10px;
  padding: 5px;
  background-color: ${props => props.corFundo};
  
  p {
    font-weight: bold;
    font-size: 14px;
    color: ${props => props.corTexto};
  }
`;

export const ContainerMenu = styled.div`
  position: relative;
  display: inline-block;
`;

export const BotaoMenu = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const CardTarefaConteudo = styled.div`
  padding: 0 0 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TituloTarefa = styled.h2<TextoQuebraLinhaProps>`
  font-size: 16px;
  font-weight: bold;
  color: #37474f;
  width: ${props => props.largura || '200px'};
  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const DescricaoTarefa = styled.p<TextoQuebraLinhaProps>`
  font-size: 12px;
  font-weight: 400;
  color: #616161;
  width: ${props => props.largura || '200px'};
  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const DataLimiteContainer = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

export const IconeData = styled.img`
  width: 35px;
  height: auto;
`;

export const TextoDataLimite = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #616161;
`;

export const MenuTarefaDropdown = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: flex;
  flex-direction: column;
  width: 150px;
  overflow: hidden;
`;

export const MenuMoverDropdown = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: flex;
  flex-direction: column;
  width: 200px;
  overflow: hidden;
  margin-top: 4px;
`;

export const MenuItem = styled.button`
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