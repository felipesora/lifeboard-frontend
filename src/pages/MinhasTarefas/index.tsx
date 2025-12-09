import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DashBoardContainer,
  DashboardMainMinhasTarefas,
  MinhasTarefasContainer,
  MinhasTarefasForm,
  FiltrosMinhasTarefasContainer,
  FiltroMinhasTarefas,
  BotoesFiltroContainer,
  BotaoFiltro,
  TabelaScrollWrapper,
  TabelaMinhasTarefas,
  PrioridadeCell,
  CelulaAcoes,
  BotaoMenuTarefas,
  MenuTarefasDropdown,
  MenuItemTarefas,
  BotaoExcelContainer,
  BotaoExcel
} from './styles';

import MenuLateral from '../../components/MenuLateral';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import IconeMenuVertical from "../../assets/images/icone-menu-vertical.png";
import { deletarTarefa } from "../../services/tarefasService";
import { exportarParaExcel } from '../../utils/exportarParaExcel';
import ModalDeletarTarefa from '../../components/ModalDeletarTarefa';
import Cabecalho from "../../components/Cabecalho";
import { obterTarefas } from '../../utils/obterTarefas';
import type { TarefaResponse } from '../../types/tarefa';
import LoadingTelaCheia from '../../components/LoadingTelaCheia';

const MinhasTarefas = () => {
  useAuthRedirect();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const [carregando, setCarregando] = useState<boolean>(true);
  const [todasTarefas, setTodasTarefas] = useState<TarefaResponse[]>([]);
  const [tarefas, setTarefas] = useState<TarefaResponse[]>([]);
  const [status, setStatus] = useState<string>('');
  const [dataLimite, setDataLimite] = useState<string>('');
  const [prioridade, setPrioridade] = useState<string>('');
  const [tarefaSelecionada, setTarefaSelecionada] = useState<number | null>(null);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [idTarefaParaDeletar, setIdTarefaParaDeletar] = useState<number | null>(null);

  const prioridadePeso = { ALTA: 0, MEDIA: 1, BAIXA: 2 };

  const ordenarTarefas = (tarefasParaOrdenar: TarefaResponse[]) => {
    return [...tarefasParaOrdenar].sort((a, b) => {
      const dataA = new Date(a.data_limite).getTime();
      const dataB = new Date(b.data_limite).getTime();

      const diffData = dataA - dataB;
      if (diffData !== 0) return diffData;

      const diffPrioridade = prioridadePeso[a.prioridade] - prioridadePeso[b.prioridade];
      if (diffPrioridade !== 0) return diffPrioridade;

      return a.titulo.localeCompare(b.titulo);
    });
  };

  useEffect(() => {
    const fetchDadosUsuario = async () => {
      try {
        setCarregando(true);
        const tarefas = await obterTarefas();
        const tarefasOrdenadas = ordenarTarefas(tarefas);

        setTodasTarefas(tarefasOrdenadas);
        setTarefas(tarefasOrdenadas);
      } catch (erro) {
        console.error("Erro ao obter dados do usuário:", erro);
      } finally {
        setCarregando(false);
      }
    };
    fetchDadosUsuario();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setTarefaSelecionada(null);
      }
    };

    if (tarefaSelecionada !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tarefaSelecionada]);

  const formatarStatus = (status: string) => {
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

  const formatarPrioridade = (prioridade: string) => {
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

  const formatarDataISOParaBR = (dataISO: string) => {
    if (!dataISO) return "";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const aplicarFiltros = () => {
    let filtradas = [...todasTarefas];

    if (status) {
      filtradas = filtradas.filter((tarefa) => tarefa.status === status);
    }

    if (prioridade) {
      filtradas = filtradas.filter((tarefa) => tarefa.prioridade === prioridade);
    }

    if (dataLimite) {
      const [ano, mes, dia] = dataLimite.split('-').map(Number);
      const dataSelecionada = new Date(ano, mes - 1, dia, 23, 59, 59, 999);

      filtradas = filtradas.filter((tarefa) => {
        const [anoT, mesT, diaT] = tarefa.data_limite.split('-').map(Number);
        const dataTarefa = new Date(anoT, mesT - 1, diaT, 23, 59, 59, 999);
        return dataTarefa <= dataSelecionada;
      });
    }

    filtradas = ordenarTarefas(filtradas);
    setTarefas(filtradas);
  };

  const limparFiltros = () => {
    setStatus('');
    setDataLimite('');
    setPrioridade('');
    setTarefas(todasTarefas);
  };

  const handleEditar = (id: number) => {
    navigate(`/editar-tarefa/${id}`, { state: { from: "minhas-tarefas" } });
    setTarefaSelecionada(null);
  };

  const handleDeletar = (id: number) => {
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
    <>
      <LoadingTelaCheia carregando={carregando}/>
      
      <DashBoardContainer $carregando={carregando}>
        <Cabecalho />
        <MenuLateral />
        <DashboardMainMinhasTarefas>
          <p>Minhas tarefas</p>

          <MinhasTarefasContainer>
            <MinhasTarefasForm>
              <FiltrosMinhasTarefasContainer>
                <FiltroMinhasTarefas>
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
                </FiltroMinhasTarefas>

                <FiltroMinhasTarefas>
                  <label htmlFor="dataFim">Data limite:</label>
                  <input
                    id="dataFim"
                    type="date"
                    name="dataFim"
                    value={dataLimite}
                    onChange={(e) => setDataLimite(e.target.value)}
                  />
                </FiltroMinhasTarefas>

                <FiltroMinhasTarefas>
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
                </FiltroMinhasTarefas>
              </FiltrosMinhasTarefasContainer>

              <BotoesFiltroContainer>
                <BotaoFiltro type="button" onClick={aplicarFiltros}>
                  Filtrar
                </BotaoFiltro>
                <BotaoFiltro type="button" onClick={limparFiltros}>
                  Limpar Filtros
                </BotaoFiltro>
                <BotaoFiltro type="button" onClick={() => navigate("/cadastrar-tarefa", { state: { from: "minhas-tarefas" } })}>
                  Cadastrar Tarefa
                </BotaoFiltro>
              </BotoesFiltroContainer>
            </MinhasTarefasForm>

            <TabelaScrollWrapper>
              <TabelaMinhasTarefas>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Prioridade</th>
                    <th>Status</th>
                    <th>Data Limite</th>
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
                          <PrioridadeCell prioridade={tarefa.prioridade}>
                            {formatarPrioridade(tarefa.prioridade)}
                          </PrioridadeCell>
                          <td>{formatarStatus(tarefa.status)}</td>
                          <td>{formatarDataISOParaBR(tarefa.data_limite)}</td>
                          <CelulaAcoes>
                            <div ref={tarefaSelecionada === tarefa.id_tarefa ? menuRef : null} style={{ display: 'inline-block' }}>
                              <BotaoMenuTarefas onClick={() => setTarefaSelecionada(tarefa.id_tarefa)}>
                                <img src={IconeMenuVertical} alt="Ícone de menu" />
                              </BotaoMenuTarefas>
                              {tarefaSelecionada === tarefa.id_tarefa && (
                                <MenuTarefasDropdown isOpenUp={isLastRows}>
                                  <MenuItemTarefas onClick={() => handleEditar(tarefa.id_tarefa)}>
                                    Editar
                                  </MenuItemTarefas>
                                  <MenuItemTarefas onClick={() => handleDeletar(tarefa.id_tarefa)}>
                                    Deletar
                                  </MenuItemTarefas>
                                </MenuTarefasDropdown>
                              )}
                            </div>
                          </CelulaAcoes>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6}>Nenhuma tarefa encontrada.</td>
                    </tr>
                  )}
                </tbody>
              </TabelaMinhasTarefas>
            </TabelaScrollWrapper>

            <BotaoExcelContainer>
              <BotaoExcel type="button" onClick={exportarTarefas}>
                Exportar para Excel
              </BotaoExcel>
            </BotaoExcelContainer>
          </MinhasTarefasContainer>

          <ModalDeletarTarefa
            aberto={modalDelete}
            onClose={() => setModalDelete(false)}
            onDelete={async () => {
              try {
                  if (idTarefaParaDeletar != null) {
                      await deletarTarefa(idTarefaParaDeletar);
                      const tarefasAtualizadas = await obterTarefas();
                      setTarefas(tarefasAtualizadas);
                      setModalDelete(false);
                      setIdTarefaParaDeletar(null);
                  }
              } catch (erro) {
                console.error("Erro ao deletar tarefa:", erro);
                alert("Erro ao deletar a tarefa. Por favor, tente novamente.");
              }
            }}
          />
        </DashboardMainMinhasTarefas>
      </DashBoardContainer>
    </>

  );
};

export default MinhasTarefas;