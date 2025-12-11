import IconeFechar from '../../../../assets/images/icone-fechar.png';
import { useState } from 'react';
import { BotaoCancelar, BotaoFechar, BotaoSalvar, ContainerBotoes, Divisor, FormularioSalario, InputSalario, ModalCabecalho, ModalConteudoSalario, ModalCorpo, ModalOverlaySalario } from './styles';

interface ModalDefinirSalarioProps {
    aberto: boolean;
    onClose: () => void;
    onSalvar: (valor: number) => void;
}

const ModalDefinirSalario = ({ aberto, onClose, onSalvar }: ModalDefinirSalarioProps) => {
    const [erro, setErro] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const valor = parseFloat(form.salario.value);

        if (isNaN(valor) || valor <= 0) {
            setErro('O salário deve ser um número positivo.');
            return;
        }

        setErro('');
        onSalvar(valor);
        onClose();
    };

    if (!aberto) return null;

    return (
        <ModalOverlaySalario>
            <ModalConteudoSalario>
                <ModalCabecalho>
                    <h2>Definir Salário</h2>
                    <BotaoFechar onClick={onClose}>
                        <img src={IconeFechar} alt="Icone de x" />
                    </BotaoFechar>
                </ModalCabecalho>

                <Divisor />

                <ModalCorpo>

                    <p>Digite o valor do seu salário.</p>

                    <FormularioSalario onSubmit={handleSubmit} className='modal_form_salario'>
                        <InputSalario
                            type="number"
                            step="any"
                            name="salario"
                            placeholder="Digite o novo salário"
                            required
                        />

                        {erro && <p className="erro_salario">{erro}</p>}
                        
                        <ContainerBotoes>
                            <BotaoCancelar className='modal_salario_botao_cancelar' type="button" onClick={onClose}>Cancelar</BotaoCancelar>
                            <BotaoSalvar className='modal_salario_botao_adicionar' type="submit">Salvar</BotaoSalvar>
                        </ContainerBotoes>
                    </FormularioSalario>
                    
                </ModalCorpo>
            
            </ModalConteudoSalario>
        </ModalOverlaySalario>
    );
}

export default ModalDefinirSalario