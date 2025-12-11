import { useState } from 'react';
import {
  ModalOverlayMeta,
  ModalConteudoMeta,
  ModalCabecalhoMeta,
  BotaoFecharMeta,
  DivisorModalMeta,
  ModalCorpoMeta,
  InputValorMeta,
  ErroMeta,
  BotoesMetaContainer,
  BotaoCancelarMeta,
  BotaoAdicionarMeta
} from './styles';
import IconeFechar from '../../../../assets/images/icone-fechar.png';

interface ModalAdiconarSaldoMetaProps {
  aberto: boolean;
  onClose: () => void;
  onAdicionar: () => Promise<void>;
  valorAdicionar: string;
  setValorAdicionar: (valor: string) => void;
}

const ModalAdiconarSaldoMeta = ({ 
  aberto, 
  onClose, 
  onAdicionar, 
  valorAdicionar, 
  setValorAdicionar }: ModalAdiconarSaldoMetaProps) => {
  const [erro, setErro] = useState('');

  const handleAdicionar = async () => {
    const valor = parseFloat(valorAdicionar);
    console.log('valorAdicionar:', valorAdicionar);

    if (isNaN(valor) || valor <= 0) {
      setErro('O valor a ser adicionado deve ser maior que zero.');
      return;
    }

    try {
      setErro('');
      await onAdicionar();
      onClose();
    } catch (error) {
      console.error('Erro completo:', error);

      if (typeof error === 'object' && error !== null && 'status' in error) {
        const err = error as { status: number, data?: { message?: string } };

        if (err.status === 400) {
          setErro(err.data?.message || 'Erro ao adicionar saldo.');
          return;
        }
      }

      setErro('Erro inesperado. Tente novamente.');
    }
  };

  if (!aberto) return null;

  return (
    <ModalOverlayMeta>
      <ModalConteudoMeta>
        <ModalCabecalhoMeta>
          <h2>Adicionar Saldo</h2>
          <BotaoFecharMeta onClick={onClose}>
            <img src={IconeFechar} alt="Ícone de fechar" />
          </BotaoFecharMeta>
        </ModalCabecalhoMeta>

        <DivisorModalMeta />

        <ModalCorpoMeta>
          <p>Digite o valor que deseja adicionar à meta.</p>
          <InputValorMeta
            type="number"
            step="any"
            name="valor"
            placeholder="Digite o valor"
            value={valorAdicionar}
            onChange={(e) => setValorAdicionar(e.target.value)}
          />

          {erro && <ErroMeta>{erro}</ErroMeta>}

          <BotoesMetaContainer>
            <BotaoCancelarMeta type="button" onClick={onClose}>
              Cancelar
            </BotaoCancelarMeta>
            <BotaoAdicionarMeta type="button" onClick={handleAdicionar}>
              Adicionar Valor
            </BotaoAdicionarMeta>
          </BotoesMetaContainer>
        </ModalCorpoMeta>
      </ModalConteudoMeta>
    </ModalOverlayMeta>
  );
};

export default ModalAdiconarSaldoMeta;