import {
  ModalOverlayMeta,
  ModalConteudoMeta,
  ModalCabecalhoMeta,
  BotaoFecharMeta,
  DivisorModalMeta,
  ModalCorpoMeta,
  TextoConfirmacao,
  BotoesMetaContainer,
  BotaoCancelarMeta,
  BotaoDeletarMeta
} from "./styles";
import IconeFechar from "../../../../assets/images/icone-fechar.png";

interface ModalDeletarMetaProps {
  aberto: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ModalDeletarMeta = ({ aberto, onClose, onDelete }: ModalDeletarMetaProps) => {
  if (!aberto) return null;

  return (
    <ModalOverlayMeta>
      <ModalConteudoMeta>
        <ModalCabecalhoMeta>
          <h2>Deletar Meta</h2>
          <BotaoFecharMeta onClick={onClose}>
            <img src={IconeFechar} alt="Ícone de fechar" />
          </BotaoFecharMeta>
        </ModalCabecalhoMeta>

        <DivisorModalMeta />

        <ModalCorpoMeta>
          <TextoConfirmacao>
            Tem certeza que deseja deletar esta meta financeira? Esta ação não poderá ser desfeita.
          </TextoConfirmacao>
          
          <BotoesMetaContainer>
            <BotaoCancelarMeta type="button" onClick={onClose}>
              Cancelar
            </BotaoCancelarMeta>
            <BotaoDeletarMeta type="button" onClick={onDelete}>
              Deletar
            </BotaoDeletarMeta>
          </BotoesMetaContainer>
        </ModalCorpoMeta>
      </ModalConteudoMeta>
    </ModalOverlayMeta>
  );
};

export default ModalDeletarMeta;