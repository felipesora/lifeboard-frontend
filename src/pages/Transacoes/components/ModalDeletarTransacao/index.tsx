import {
  ModalOverlayDeletar,
  ModalConteudoDeletar,
  ModalCabecalhoDeletar,
  BotaoFecharDeletar,
  DivisorModal,
  ModalCorpoDeletar,
  TextoConfirmacao,
  BotoesAcaoContainer,
  BotaoCancelar,
  BotaoDeletar
} from "./styles";
import IconeFechar from "../../../../assets/images/icone-fechar.png";

interface ModalDeletarTransacaoProps {
  aberto: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ModalDeletarTransacao = ({ aberto, onClose, onDelete }: ModalDeletarTransacaoProps) => {
  if (!aberto) return null;

  return (
    <ModalOverlayDeletar>
      <ModalConteudoDeletar>
        <ModalCabecalhoDeletar>
          <h2>Deletar Transação</h2>
          <BotaoFecharDeletar onClick={onClose}>
            <img src={IconeFechar} alt="Ícone de fechar" />
          </BotaoFecharDeletar>
        </ModalCabecalhoDeletar>

        <DivisorModal />

        <ModalCorpoDeletar>
          <TextoConfirmacao>
            Tem certeza que deseja deletar a transação? Esta ação é irreversível.
          </TextoConfirmacao>
          
          <BotoesAcaoContainer>
            <BotaoCancelar type="button" onClick={onClose}>
              Cancelar
            </BotaoCancelar>
            <BotaoDeletar type="button" onClick={onDelete}>
              Deletar
            </BotaoDeletar>
          </BotoesAcaoContainer>
        </ModalCorpoDeletar>
      </ModalConteudoDeletar>
    </ModalOverlayDeletar>
  );
};

export default ModalDeletarTransacao;