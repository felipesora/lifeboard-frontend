import React from "react";
import {
  ModalOverlayTarefa,
  ModalConteudoTarefa,
  ModalCabecalhoTarefa,
  BotaoFecharTarefa,
  DivisorModalTarefa,
  ModalCorpoTarefa,
  TextoConfirmacaoTarefa,
  BotoesTarefaContainer,
  BotaoCancelarTarefa,
  BotaoDeletarTarefa
} from "./styles";
import IconeFechar from '../../assets/images/icone-fechar.png';

interface ModalDeletarTarefaProps {
  aberto: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ModalDeletarTarefa = ({ aberto, onClose, onDelete }: ModalDeletarTarefaProps) => {
  if (!aberto) return null;

  return (
    <ModalOverlayTarefa>
      <ModalConteudoTarefa>
        <ModalCabecalhoTarefa>
          <h2>Deletar Tarefa</h2>
          <BotaoFecharTarefa onClick={onClose}>
            <img src={IconeFechar} alt="Ícone de fechar" />
          </BotaoFecharTarefa>
        </ModalCabecalhoTarefa>

        <DivisorModalTarefa />

        <ModalCorpoTarefa>
          <TextoConfirmacaoTarefa>
            Tem certeza que deseja deletar esta tarefa? Esta ação não poderá ser desfeita.
          </TextoConfirmacaoTarefa>
          
          <BotoesTarefaContainer>
            <BotaoCancelarTarefa type="button" onClick={onClose}>
              Cancelar
            </BotaoCancelarTarefa>
            <BotaoDeletarTarefa type="button" onClick={onDelete}>
              Deletar
            </BotaoDeletarTarefa>
          </BotoesTarefaContainer>
        </ModalCorpoTarefa>
      </ModalConteudoTarefa>
    </ModalOverlayTarefa>
  );
};

export default ModalDeletarTarefa;