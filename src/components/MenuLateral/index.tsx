import IconeControleFinanceiro from "../../assets/images/icone-financeiro.png";
import IconeTransacoes from "../../assets/images/icone-transacoes.png";
import IconeMetas from "../../assets/images/icone-metas-branco.png";
import IconeKanban from "../../assets/images/icone-kanban.png";
import IconeTarefas from "../../assets/images/icone-lista-branco.png";
import IconePomodoro from "../../assets/images/icone-pomodoro.png";
import IconeUsuario from "../../assets/images/icone-user.png";
import IconeBarra from "../../assets/images/icone-barra.png";
import IconeSair from "../../assets/images/icone-logout.png";
import { useNavigate } from 'react-router-dom';
import ModalLogout from "../ModalLogout";
import { useState } from "react";
import { ContainerMenuLateral, MenuNav, RodapeMenu } from "./styles";

const MenuLateral = () => {
    const navigate = useNavigate();
    const [modalLogoutAberto, setModalLogoutAberto] = useState<boolean>(false);

    return (
        <>
            <ContainerMenuLateral>
                <div className='logo'>
                    <h2>LifeBoard</h2>
                </div>

                <MenuNav>
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

                    <p className="menu_section_2">Tarefas</p>
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
                </MenuNav>

                <RodapeMenu>
                    <button onClick={() => navigate("/minha-conta")}><img src={IconeUsuario} alt="Icone de usuário" title="Minha Conta" /></button>
                    <img src={IconeBarra} alt="Icone de barra vertical" />
                    <button onClick={() => setModalLogoutAberto(true)}><img src={IconeSair} alt="Icone de sair" title="Sair da Conta" /></button>
                </RodapeMenu>

                <ModalLogout
                    aberto={modalLogoutAberto}
                    onClose={() => setModalLogoutAberto(false)}
                />
            </ContainerMenuLateral>
        </>
    )
}

export default MenuLateral;