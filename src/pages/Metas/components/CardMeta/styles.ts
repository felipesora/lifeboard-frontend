import styled from "styled-components";

interface ProgressoFillProps {
  progresso: number;
}

export const CardMetaContainer = styled.div`
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  width: 410px;
  padding: 20px 10px 60px 10px;

  p {
    font-size: 15px;
    color: #616161;
    margin-top: 10px;
  }
`;

export const CardMetaCabecalho = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    gap: 7px;
  }
`;

export const IconeMeta = styled.img`
  width: 30px;
  height: auto;
`;

export const NomeMeta = styled.h3`
  font-size: 20px;
  color: #37474f;
  max-width: 250px;
  white-space: normal;
  word-wrap: break-word;
`;

export const ContainerMenu = styled.div`
  position: relative;
  display: inline-block;
`;

export const BotaoMenuVertical = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const MenuMetaDropdown = styled.div`
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

export const CardMetaDataLimite = styled.div`
  margin-top: 15px;

  p {
    font-size: 15px;
    color: #9e9e9e;
  }
`;

export const BarraProgressoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;

  span {
    font-size: 15px;
    color: #616161;
  }
`;

export const BarraProgresso = styled.div`
  width: 100%;
  height: 8px;
  background-color: #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressoFill = styled.div<ProgressoFillProps>`
  height: 100%;
  width: ${props => props.progresso}%;
  background-color: #4caf50;
  border-radius: 4px 0 0 4px;
`;