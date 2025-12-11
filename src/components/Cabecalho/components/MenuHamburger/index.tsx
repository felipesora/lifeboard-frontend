import IconeControleFinanceiro from "../../../../assets/images/icone-financeiro.png";
import IconeTransacoes from "../../../../assets/images/icone-transacoes.png";
import IconeMetas from "../../../../assets/images/icone-metas-branco.png";
import IconeKanban from "../../../../assets/images/icone-kanban.png";
import IconeTarefas from "../../../../assets/images/icone-lista-branco.png";
import IconePomodoro from "../../../../assets/images/icone-pomodoro.png";
import IconeUsuario from "../../../../assets/images/icone-user.png";
import IconeBarra from "../../../../assets/images/icone-barra.png";
import IconeSair from "../../../../assets/images/icone-logout.png";
import IconeFechar from "../../../../assets/images/icone-fechar-branco.png";
import ModalLogout from "../../../ModalLogout/index.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ContainerMenuHamburger } from "./styles";

interface MenuHamburgerProps {
    toggleMenu: () => void;
}

const MenuHamburger = ({ toggleMenu }: MenuHamburgerProps) => {
    const navigate = useNavigate();
    const [modalLogoutAberto, setModalLogoutAberto] = useState<boolean>(false);

    return (
        <ContainerMenuHamburger>

            <div className="btn_fechar">
                <button onClick={toggleMenu}>
                    <img src={IconeFechar} alt="Icone de X" />
                </button>
            </div>

            <nav className='menu_hamburger_nav'>
                <p>Financeiro</p>
                <ul>
                    <li>
                        <button onClick={() => navigate("/controle-financeiro")}>
                            <img src={IconeControleFinanceiro} alt="Icone de bolsa de dinheiro" />
                            Controle Financeiro
                        </button>

                    </li>

                    <li>
                        <button onClick={() => navigate("/transacoes")}>
                            <img src={IconeTransacoes} alt="Icone de nota de dinheiro" />
                            Transações
                        </button>
                    </li>

                    <li>
                        <button onClick={() => navigate("/metas")}>
                            <img src={IconeMetas} alt="Icone de cofrinho" />
                            Metas
                        </button>
                    </li>
                </ul>

                <p className="menu_hamburger_secao_2">Tarefas</p>
                <ul>
                    <li>
                        <button onClick={() => navigate("/tarefas-quadro-kanban")}>
                            <img src={IconeKanban} alt="Icone de papel com anotações" />
                            Quadro (Kanban)
                        </button>

                    </li>

                    <li>
                        <button onClick={() => navigate("/minhas-tarefas")}>
                            <img src={IconeTarefas} alt="Icone de uma lista" />
                            Minhas Tarefas
                        </button>

                    </li>

                    <li>
                        <button onClick={() => navigate("/pomodoro")}>
                            <img src={IconePomodoro} alt="Icone de relogio" />
                            Pomodoro
                        </button>

                    </li>
                </ul>
            </nav>

            <div className='menu_hamburger_footer'>
                <button onClick={() => navigate("/minha-conta")}><img src={IconeUsuario} alt="Icone de usuário" title="Minha Conta" /></button>
                <img src={IconeBarra} alt="Icone de barra vertical" />
                <button onClick={() => setModalLogoutAberto(true)}><img src={IconeSair} alt="Icone de sair" title="Sair da Conta" /></button>
            </div>

            <ModalLogout
                aberto={modalLogoutAberto}
                onClose={() => setModalLogoutAberto(false)}
            />
        </ContainerMenuHamburger>
    );
}

export default MenuHamburger;