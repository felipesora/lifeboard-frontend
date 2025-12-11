import {
  ModalOverlayDeletarConta,
  ModalConteudoDeletarConta,
  ModalCabecalhoDeletarConta,
  BotaoFecharDeletarConta,
  DivisorModal,
  ModalCorpoDeletarConta,
  TextoConfirmacaoContainer,
  TextoConfirmacao,
  InputConfirmacao,
  InputConfirmacaoField,
  BotoesAcaoContainer,
  BotaoCancelarConta,
  BotaoDeletarConta
} from "./styles";
import IconeFechar from '../../../../assets/images/icone-fechar.png';

interface ModalDeletarContaProps {
  aberto: boolean;
  onClose: () => void;
  onDelete: () => void;
  confirmarExclusao: string;
  setConfirmarExclusao: (value: string) => void;
}

const ModalDeletarConta = ({ 
  aberto, 
  onClose, 
  onDelete, 
  confirmarExclusao, 
  setConfirmarExclusao 
}: ModalDeletarContaProps) => {
  if (!aberto) return null;

  const isDeletarDisabled = confirmarExclusao.toLowerCase() !== "excluir conta";

  return (
    <ModalOverlayDeletarConta>
      <ModalConteudoDeletarConta>
        <ModalCabecalhoDeletarConta>
          <h2>Excluir Conta</h2>
          <BotaoFecharDeletarConta onClick={onClose}>
            <img src={IconeFechar} alt="Ícone de fechar" />
          </BotaoFecharDeletarConta>
        </ModalCabecalhoDeletarConta>

        <DivisorModal />

        <ModalCorpoDeletarConta>
          <TextoConfirmacaoContainer>
            <TextoConfirmacao>
              Tem certeza que deseja excluir sua conta? Esta ação é irreversível.
            </TextoConfirmacao>
            <TextoConfirmacao>
              Para confirmar, digite "excluir conta" no campo abaixo:
            </TextoConfirmacao>
          </TextoConfirmacaoContainer>

          <InputConfirmacao>
            <InputConfirmacaoField
              type="text"
              value={confirmarExclusao}
              onChange={(e) => setConfirmarExclusao(e.target.value)}
              placeholder="Digite 'excluir conta'"
            />
          </InputConfirmacao>

          <BotoesAcaoContainer>
            <BotaoCancelarConta type="button" onClick={onClose}>
              Cancelar
            </BotaoCancelarConta>
            <BotaoDeletarConta
              type="button"
              onClick={onDelete}
              disabled={isDeletarDisabled}
            >
              Deletar
            </BotaoDeletarConta>
          </BotoesAcaoContainer>
        </ModalCorpoDeletarConta>
      </ModalConteudoDeletarConta>
    </ModalOverlayDeletarConta>
  );
};

export default ModalDeletarConta;