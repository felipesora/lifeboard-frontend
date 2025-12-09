import IconeFechar from '../../assets/images/icone-fechar.png';
import { useNavigate } from 'react-router-dom';
import { ContainerModalLogout, ConteudoModalLogout } from "./styles";

interface ModalLogout {
    aberto: boolean;
    onClose: () => void;
}

const ModalLogout = ({ aberto, onClose }: ModalLogout) => {
    const navigate = useNavigate();

    if (!aberto) return null;

    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
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
                        <button type="button" onClick={handleLogout}>Sair</button>
                    </div>
                </div>

            </ConteudoModalLogout>
        </ContainerModalLogout>
    );
}

export default ModalLogout;