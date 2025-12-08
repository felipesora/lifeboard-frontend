import { useNavigate } from 'react-router-dom';
import MenuLateral from '../../components/MenuLateral';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import './MinhasTarefas.css';
import { useEffect, useState, useRef } from 'react';
import { obterTarefas } from '../../utils/obterTarefas';
import IconeMenuVertical from "../../assets/images/icone-menu-vertical.png";
import { deletarTarefa } from "../../services/tarefasService";
import { exportarParaExcel } from '../../utils/exportarParaExcel';
import ModalDeletarTarefa from '../../components/ModalDeletarTarefa';
import Cabecalho from "../../components/Cabecalho";

const MinhasTarefas = () => {
    useAuthRedirect();
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const [todasTarefas, setTodasTarefas] = useState([]);
    const [tarefas, setTarefas] = useState([]);
    const [status, setStatus] = useState('');
    const [dataLimite, setDataLimite] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
    const [modalDelete, setModalDelete] = useState(false);
    const [idTarefaParaDeletar, setIdTarefaParaDeletar] = useState(null);

    const prioridadePeso = { ALTA: 0, MEDIA: 1, BAIXA: 2 };

    function ordenarTarefas(tarefas) {
        return [...tarefas].sort((a, b) => {
            const dataA = new Date(a.data_limite);
            const dataB = new Date(b.data_limite);

            // 1) Data
            const diffData = dataA - dataB;
            if (diffData !== 0) return diffData;

            // 2) Prioridade
            const diffPrioridade = prioridadePeso[a.prioridade] - prioridadePeso[b.prioridade];
            if (diffPrioridade !== 0) return diffPrioridade;

            // 3) Título
            return a.titulo.localeCompare(b.titulo);
        });
    }

    useEffect(() => {
        const fetchDadosUsuario = async () => {
            try {
                const tarefas = await obterTarefas();
                const tarefasOrdenadas = ordenarTarefas(tarefas);

                setTodasTarefas(tarefasOrdenadas);
                setTarefas(tarefasOrdenadas);

            } catch (erro) {
                console.error("Erro ao obter dados do usuário:", erro);
            }
        };
        fetchDadosUsuario();
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setTarefaSelecionada(null);
            }
        }

        if (tarefaSelecionada !== null) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [tarefaSelecionada]);

    const formatarStatus = (status) => {
        switch (status) {
            case 'CONCLUIDA':
                return 'Concluída';
            case 'EM_ANDAMENTO':
                return 'Em Andamento';
            case 'A_FAZER':
                return 'A Fazer';
            default:
                return status;
        }
    };

    const formatarPrioridade = (prioridade) => {
        switch (prioridade) {
            case 'ALTA':
                return 'Alta';
            case 'MEDIA':
                return 'Média';
            case 'BAIXA':
                return 'Baixa';
            default:
                return prioridade;
        }
    };

    function formatarDataISOParaBR(dataISO) {
        if (!dataISO) return "";
        const [ano, mes, dia] = dataISO.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    const aplicarFiltros = () => {
        let filtradas = [...todasTarefas];

        // Filtrar por status
        if (status) {
            filtradas = filtradas.filter((tarefa) => tarefa.status === status);
        }

        // Filtrar por prioridade
        if (prioridade) {
            filtradas = filtradas.filter((tarefa) => tarefa.prioridade === prioridade);
        }

        // Filtrar por data limite
            if (dataLimite) {
                const [ano, mes, dia] = dataLimite.split('-').map(Number);
                const dataSelecionada = new Date(ano, mes - 1, dia, 23, 59, 59, 999);

                filtradas = filtradas.filter((tarefa) => {
                    const [anoT, mesT, diaT] = tarefa.data_limite.split('-').map(Number);
                    const dataTarefa = new Date(anoT, mesT - 1, diaT, 23, 59, 59, 999);
                    return dataTarefa <= dataSelecionada;
                });
            }

        // Ordenar por data e prioridade
        filtradas = ordenarTarefas(filtradas);

        setTarefas(filtradas);
    };

    const limparFiltros = () => {
        setStatus('');
        setDataLimite('');
        setPrioridade('');
        setTarefas(todasTarefas);
    };


    const handleEditar = (id) => {
        navigate(`/editar-tarefa/${id}`, { state: { from: "minhas-tarefas" } });
        setTarefaSelecionada(null);
    };

    const handleDeletar = async (id) => {
        setIdTarefaParaDeletar(id);
        setModalDelete(true);
        setTarefaSelecionada(null);
    };

    const exportarTarefas = () => {
        const dados = tarefas.map((t) => ({
            Título: t.titulo,
            Descrição: t.descricao,
            Prioridade: formatarPrioridade(t.prioridade),
            Status: formatarStatus(t.status),
            DataLimite: formatarDataISOParaBR(t.data_limite),
        }));

        exportarParaExcel(dados, 'tarefas', 'Tarefas');
    };

    return (
        <div className="dashboard_container">
            <Cabecalho />
            <MenuLateral />
            <main className="dashboard_main_minhas_tarefas">
                <p>Minhas tarefas</p>

                <div className='minhas_tarefas_container'>


                    <form className='minhas_tarefas_form'>

                        <div className='filtros_minhas_tarefas_form'>

                            <div className='minhas_tarefas_filtro'>
                                <label htmlFor="tipoTransacao">Status:</label>
                                <select
                                    id="tipoTransacao"
                                    name="tipoTransacao"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="" disabled>Selecione um status</option>
                                    <option value="A_FAZER">A fazer</option>
                                    <option value="EM_ANDAMENTO">Em andamento</option>
                                    <option value="CONCLUIDA">Concluída</option>
                                </select>
                            </div>

                            <div className='minhas_tarefas_filtro'>
                                <label htmlFor="dataFim">Data limite:</label>
                                <input
                                    id="dataFim"
                                    type="date"
                                    name="dataFim"
                                    value={dataLimite}
                                    onChange={(e) => setDataLimite(e.target.value)}
                                />
                            </div>

                            <div className='minhas_tarefas_filtro'>
                                <label htmlFor="categoria">Prioridade:</label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    value={prioridade}
                                    onChange={(e) => setPrioridade(e.target.value)}
                                >
                                    <option value="" disabled>Selecione uma prioridade</option>
                                    <option value="BAIXA">Baixa</option>
                                    <option value="MEDIA">Média</option>
                                    <option value="ALTA">Alta</option>
                                </select>
                            </div>

                        </div>

                        <div className='minhas_tarefas_botoes_filtro'>
                            <button type='button' onClick={aplicarFiltros}>Filtrar</button>
                            <button type='button' onClick={limparFiltros}>Limpar Filtros</button>
                            <button type='button' onClick={() => navigate("/cadastrar-tarefa", { state: { from: "minhas-tarefas" } })}>
                                Cadastrar Tarefa
                            </button>
                        </div>
                    </form>

                    <div className="tabela_scroll_wrapper">
                        <table className="tabela_minhas_tarefas">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Descrição</th>
                                    <th>Prioridade</th>
                                    <th>Status</th>
                                    <th>Data Limite</th>
                                    {/* Coluna de ações */}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tarefas.length > 0 ? (
                                    tarefas.map((tarefa, index) => {
                                        const isLastRows = index >= tarefas.length - 2;
                                        return (
                                            <tr key={tarefa.id_tarefa}>
                                                <td>{tarefa.titulo}</td>
                                                <td>{tarefa.descricao}</td>
                                                <td style={{
                                                    color:
                                                        tarefa.prioridade === 'ALTA' ? '#C62828' :
                                                            tarefa.prioridade === 'MEDIA' ? '#F9A825' :
                                                                tarefa.prioridade === 'BAIXA' ? '#2E7D32' : 'inherit'
                                                }}>
                                                    {formatarPrioridade(tarefa.prioridade)}
                                                </td>
                                                <td>{formatarStatus(tarefa.status)}</td>
                                                <td>{formatarDataISOParaBR(tarefa.data_limite)}</td>
                                                <td style={{ position: 'relative' }}>
                                                    <div
                                                        ref={tarefaSelecionada === tarefa.id_tarefa ? menuRef : null}
                                                        style={{ display: 'inline-block' }}
                                                    >
                                                        <button
                                                            className="menu_minhas_tarefas_btn"
                                                            onClick={() => setTarefaSelecionada(tarefa.id_tarefa)}
                                                        >
                                                            <img src={IconeMenuVertical} alt="Icone de três pontos" />
                                                        </button>
                                                        {tarefaSelecionada === tarefa.id_tarefa && (
                                                            <div className={`menu_minhas_tarefas_dropdown ${isLastRows ? 'open-up' : ''}`}>
                                                                <button onClick={() => handleEditar(tarefa.id_tarefa)}>Editar</button>
                                                                <button onClick={() => handleDeletar(tarefa.id_tarefa)}>Deletar</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6">Nenhuma tarefa encontrada.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className='btn_excel'>
                        <button type='button' onClick={exportarTarefas}>
                            Exportar para Excel
                        </button>
                    </div>

                </div>

                <ModalDeletarTarefa
                    aberto={modalDelete}
                    onClose={() => setModalDelete(false)}
                    onDelete={async () => {
                        try {
                            await deletarTarefa(idTarefaParaDeletar);

                            const tarefasAtualizadas = await obterTarefas();
                            setTarefas(tarefasAtualizadas);

                            setModalDelete(false);
                            setIdTarefaParaDeletar(null);
                        } catch (erro) {
                            console.error("Erro ao deletar tarefa:", erro);
                            alert("Erro ao deletar a tarefa. Por favor, tente novamente.");
                        }
                    }}
                />
            </main>
        </div>
    )
}

export default MinhasTarefas;