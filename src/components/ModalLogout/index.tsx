import IconeFechar from '../../assets/images/icone-fechar.png';
import { useNavigate } from 'react-router-dom';
import { ContainerModalLogout, ConteudoModalLogout, SairButton } from "./styles";
import { useState } from 'react';

interface ModalLogout {
    aberto: boolean;
    onClose: () => void;
}

const ModalLogout = ({ aberto, onClose }: ModalLogout) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    if (!aberto) return null;

    const handleLogout = async () => {
        try {
            setLoading(true);
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/login');
        } catch (error) {
            console.log("Erro ao sair da conta");
        } finally {
            setLoading(false);
        }
        
    }

    return (
        <ContainerModalLogout>
            <ConteudoModalLogout>
                <div className='cabecalho'>
                    <h2>Sair da Conta</h2>
                    <button onClick={onClose}>
                        <img src={IconeFechar} alt="Icone de x" />
                    </button>
                </div>

                <hr />

                <div className='conteudo'>
                    <div className='texto'>
                        <p>Tem certeza que deseja sair da sua conta?</p>
                    </div>

                    <div className="botoes">
                        <button type="button" onClick={onClose}>Cancelar</button>
                        <SairButton type="button" onClick={handleLogout} $loading={loading} disabled={loading}>
                            {loading ? 'Saindo...' : 'Sair'}
                        </SairButton>
                    </div>
                </div>

            </ConteudoModalLogout>
        </ContainerModalLogout>
    );
}

export default ModalLogout;