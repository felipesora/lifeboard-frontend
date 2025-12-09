import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DashBoardContainer,
  DashboardMainKanban,
  CardsTarefasContainer,
  ColunasTarefasContainer,
  ColunaTarefa,
  ColunaCabecalho,
  BotaoAdicionarTarefa,
  ColunaConteudo
} from './styles';

import MenuLateral from '../../components/MenuLateral';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import IconeFazer from '../../assets/images/icone-tarefa-fazer.png';
import IconeAndamento from '../../assets/images/icone-tarefa-andamento.png';
import IconeConcluido from '../../assets/images/icone-tarefa-concluida.png';
import IconeAdicionar from '../../assets/images/icone-tarefa-adicionar.png';
import Cabecalho from "../../components/Cabecalho";
import ModalDeletarTarefa from '../../components/ModalDeletarTarefa';
import CardInfoTarefas from './components/CardInfoTarefas';
import CardTarefa from './components/CardTarefa';
import { obterTarefas } from '../../utils/obterTarefas';
import type { TarefaEditDTO, TarefaResponse } from '../../types/tarefa';
import { deletarTarefa, editarDadosTarefa } from '../../services/tarefasService';
import LoadingTelaCheia from '../../components/LoadingTelaCheia';

const Kanban = () => {
  useAuthRedirect();
  const navigate = useNavigate();

  const [carregando, setCarregando] = useState<boolean>(true);
  const [tarefas, setTarefas] = useState<TarefaResponse[]>([]);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [idTarefaDeletar, setIdTarefaDeletar] = useState<number | null>(null);

  useEffect(() => {
    const fetchDadosUsuario = async () => {
      try {
        setCarregando(true);
        const tarefas = await obterTarefas();
        setTarefas(tarefas);
      } catch (erro) {
        console.error("Erro ao obter dados do usuário:", erro);
      } finally {
        setCarregando(false);
      }
    };

    fetchDadosUsuario();
  }, []);

  const calculaQuantidade = (status: string) => {
    const listaFiltrada = tarefas.filter(t => t.status === status);
    return listaFiltrada.length;
  };

  const detalhesPrioridade = (prioridade: string) => {
    switch (prioridade) {
      case "ALTA":
        return { titulo: "Alta", fundo: "#FFEBEE", texto: "#C62828" };
      case "MEDIA":
        return { titulo: "Média", fundo: "#FFF8E1", texto: "#F9A825" };
      case "BAIXA":
        return { titulo: "Baixa", fundo: "#E8F5E9", texto: "#2E7D32" };
      default:
        return { titulo: "Não definida", fundo: "#F5F5F5", texto: "#000000" };
    }
  };

  const prioridadeParaNumero = (prioridade: string) => {
    switch (prioridade) {
      case "ALTA": return 1;
      case "MEDIA": return 2;
      case "BAIXA": return 3;
      default: return 4;
    }
  };

  const formatarDataISOParaBR = (dataISO: string) => {
    if (!dataISO) return "";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const moverTarefa = async (tarefa: TarefaResponse, novoStatus: string) => {
    try {
      const tarefaEditDTO: TarefaEditDTO = {
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        data_limite: tarefa.data_limite,
        prioridade: tarefa.prioridade,
        status: novoStatus as "A_FAZER" | "EM_ANDAMENTO" | "CONCLUIDA",
        id_usuario: tarefa.id_usuario
      };
      
      await editarDadosTarefa(tarefa.id_tarefa, tarefaEditDTO);

      setTarefas(prev => prev.map(t =>
        t.id_tarefa === tarefa.id_tarefa 
          ? { ...t, status: novoStatus as "A_FAZER" | "EM_ANDAMENTO" | "CONCLUIDA" } 
          : t
      ));
    } catch (erro) {
      console.error("Erro ao mover tarefa:", erro);
    }
  };

  const handleDeletar = (id: number) => {
    setIdTarefaDeletar(id);
    setModalDelete(true);
  };

  return (
    <>
        <LoadingTelaCheia  carregando={carregando}/>

        <DashBoardContainer $carregando={carregando}>
          <Cabecalho />
          <MenuLateral />
          <DashboardMainKanban>
            <p>Quadro (Kanban)</p>

            <CardsTarefasContainer>
              <CardInfoTarefas
                icone={IconeFazer}
                titulo="A Fazer"
                descricao="Tarefas a fazer:"
                quantidade={calculaQuantidade("A_FAZER")}
                cor="#000000"
              />

              <CardInfoTarefas
                icone={IconeAndamento}
                titulo="Em Andamento"
                descricao="Tarefas em andamento:"
                quantidade={calculaQuantidade("EM_ANDAMENTO")}
                cor="#42A5F5"
              />

              <CardInfoTarefas
                icone={IconeConcluido}
                titulo="Concluídas"
                descricao="Tarefas concluídas:"
                quantidade={calculaQuantidade("CONCLUIDA")}
                cor="#4CAF50"
              />
            </CardsTarefasContainer>

            <ColunasTarefasContainer>
              {/* Coluna A Fazer */}
              <ColunaTarefa>
                <ColunaCabecalho backgroundColor="#90A4AE">
                  <p>A Fazer ({calculaQuantidade("A_FAZER")})</p>
                  <BotaoAdicionarTarefa 
                    onClick={() => navigate("/cadastrar-tarefa", { 
                      state: { 
                        from: "tarefas-quadro-kanban", 
                        status: "A_FAZER" 
                      } 
                    })}
                  >
                    <img src={IconeAdicionar} alt="Ícone de adicionar tarefa" />
                  </BotaoAdicionarTarefa>
                </ColunaCabecalho>

                <ColunaConteudo>
                  {tarefas
                    .filter(t => t.status === "A_FAZER")
                    .sort((a, b) => prioridadeParaNumero(a.prioridade) - prioridadeParaNumero(b.prioridade))
                    .map((tarefa) => (
                      <CardTarefa
                        key={tarefa.id_tarefa}
                        tarefa={tarefa}
                        moverTarefa={moverTarefa}
                        corFundo={detalhesPrioridade(tarefa.prioridade).fundo}
                        corTexto={detalhesPrioridade(tarefa.prioridade).texto}
                        prioridade={detalhesPrioridade(tarefa.prioridade).titulo}
                        titulo={tarefa.titulo}
                        descricao={tarefa.descricao}
                        data={formatarDataISOParaBR(tarefa.data_limite)}
                        onDeletar={handleDeletar}
                      />
                    ))}
                </ColunaConteudo>
              </ColunaTarefa>

              {/* Coluna Em Andamento */}
              <ColunaTarefa>
                <ColunaCabecalho backgroundColor="#42A5F5">
                  <p>Em Andamento ({calculaQuantidade("EM_ANDAMENTO")})</p>
                  <BotaoAdicionarTarefa 
                    onClick={() => navigate("/cadastrar-tarefa", { 
                      state: { 
                        from: "tarefas-quadro-kanban", 
                        status: "EM_ANDAMENTO" 
                      } 
                    })}
                  >
                    <img src={IconeAdicionar} alt="Ícone de adicionar tarefa" />
                  </BotaoAdicionarTarefa>
                </ColunaCabecalho>

                <ColunaConteudo>
                  {tarefas
                    .filter(t => t.status === "EM_ANDAMENTO")
                    .sort((a, b) => prioridadeParaNumero(a.prioridade) - prioridadeParaNumero(b.prioridade))
                    .map((tarefa) => (
                      <CardTarefa
                        key={tarefa.id_tarefa}
                        tarefa={tarefa}
                        moverTarefa={moverTarefa}
                        corFundo={detalhesPrioridade(tarefa.prioridade).fundo}
                        corTexto={detalhesPrioridade(tarefa.prioridade).texto}
                        prioridade={detalhesPrioridade(tarefa.prioridade).titulo}
                        titulo={tarefa.titulo}
                        descricao={tarefa.descricao}
                        data={formatarDataISOParaBR(tarefa.data_limite)}
                        onDeletar={handleDeletar}
                      />
                    ))}
                </ColunaConteudo>
              </ColunaTarefa>

              {/* Coluna Concluída */}
              <ColunaTarefa>
                <ColunaCabecalho backgroundColor="#4CAF50">
                  <p>Concluída ({calculaQuantidade("CONCLUIDA")})</p>
                  <BotaoAdicionarTarefa 
                    onClick={() => navigate("/cadastrar-tarefa", { 
                      state: { 
                        from: "tarefas-quadro-kanban", 
                        status: "CONCLUIDA" 
                      } 
                    })}
                  >
                    <img src={IconeAdicionar} alt="Ícone de adicionar tarefa" />
                  </BotaoAdicionarTarefa>
                </ColunaCabecalho>

                <ColunaConteudo>
                  {tarefas
                    .filter(t => t.status === "CONCLUIDA")
                    .sort((a, b) => prioridadeParaNumero(a.prioridade) - prioridadeParaNumero(b.prioridade))
                    .map((tarefa) => (
                      <CardTarefa
                        key={tarefa.id_tarefa}
                        tarefa={tarefa}
                        moverTarefa={moverTarefa}
                        corFundo={detalhesPrioridade(tarefa.prioridade).fundo}
                        corTexto={detalhesPrioridade(tarefa.prioridade).texto}
                        prioridade={detalhesPrioridade(tarefa.prioridade).titulo}
                        titulo={tarefa.titulo}
                        descricao={tarefa.descricao}
                        data={formatarDataISOParaBR(tarefa.data_limite)}
                        onDeletar={handleDeletar}
                      />
                    ))}
                </ColunaConteudo>
              </ColunaTarefa>
            </ColunasTarefasContainer>
          </DashboardMainKanban>

          <ModalDeletarTarefa 
            aberto={modalDelete}
            onClose={() => setModalDelete(false)}
            onDelete={async () => {
              try {
                if (idTarefaDeletar != null) {
                  await deletarTarefa(idTarefaDeletar);
                  const tarefasAtualizadas = await obterTarefas();
                  setTarefas(tarefasAtualizadas);
                  setModalDelete(false);
                  setIdTarefaDeletar(null);
                }
              } catch (erro) {
                console.error("Erro ao deletar tarefa:", erro);
                alert("Erro ao deletar a tarefa. Por favor, tente novamente.");
              }
            }}
          />
      </DashBoardContainer>
    </>
  );
};

export default Kanban;