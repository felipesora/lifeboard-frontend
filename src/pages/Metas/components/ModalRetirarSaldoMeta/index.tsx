import IconeFechar from '../../../../assets/images/icone-fechar.png';
import { useState } from 'react';
import { BotaoCancelarMeta, BotaoFecharMeta, BotaoRetirarMeta, BotoesMetaContainer, DivisorModalMeta, ErroMeta, InputValorMeta, ModalCabecalhoMeta, ModalConteudoMeta, ModalCorpoMeta, ModalOverlayMeta } from './styles';

interface ModalRetirarSaldoMetaProps {
  aberto: boolean;
  onClose: () => void;
  onRetirar: () => Promise<void>;
  valorRetirar: string;
  setValorRetirar: (valor: string) => void;
}

const ModalRetirarSaldoMeta = ({ aberto, onClose, onRetirar, valorRetirar, setValorRetirar }: ModalRetirarSaldoMetaProps) => {

    const [erro, setErro] = useState('');

    const handleAdicionar = async () => {
        const valor = parseFloat(valorRetirar);

        if (isNaN(valor) || valor <= 0) {
            setErro('O valor a ser retirado deve ser maior que zero.');
            return;
        }

        try {
            setErro('');
            await onRetirar();
            onClose();

        } catch (error) {
            console.error('Erro completo:', error);

            if (typeof error === 'object' && error !== null && 'status' in error) {
                const err = error as { status: number, data?: { message?: string } };

                if (err.status === 400) {
                setErro(err.data?.message || 'Erro ao retirar saldo.');
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
                    <h2>Retirar Saldo</h2>
                    <BotaoFecharMeta onClick={onClose}>
                        <img src={IconeFechar} alt="Icone de x" />
                    </BotaoFecharMeta>
                </ModalCabecalhoMeta>

                <DivisorModalMeta />

                <ModalCorpoMeta>

                    <p>Digite o valor que deseja retirar da meta.</p>
                    <InputValorMeta
                        type="number"
                        step="any"
                        name="valor"
                        placeholder="Digite o valor"
                        value={valorRetirar}
                        onChange={(e) => setValorRetirar(e.target.value)}
                    />

                    {erro && <ErroMeta>{erro}</ErroMeta>}

                    <BotoesMetaContainer>
                        <BotaoCancelarMeta type="button" onClick={onClose}>Cancelar</BotaoCancelarMeta>
                        <BotaoRetirarMeta type="button" onClick={handleAdicionar}>Retirar Valor</BotaoRetirarMeta>
                    </BotoesMetaContainer>

                </ModalCorpoMeta>

            </ModalConteudoMeta>
        </ModalOverlayMeta>
    );
}

export default ModalRetirarSaldoMeta;