import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DashBoardContainer,
  DashboardMainCadastroTarefas,
  CadastroTarefasContainer,
  CadastroTarefasForm,
  InputsContainerTarefa,
  InputTituloTarefa,
  InputDescricaoTarefa,
  InputDataLimiteTarefa,
  InputPrioridade,
  InputLabel,
  InputField,
  SelectField,
  MensagensContainer,
  MensagemSucesso,
  MensagemErro,
  BotoesContainerTarefas,
  BotaoAcaoTarefa
} from "./styles";

import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import MenuLateral from "../../components/MenuLateral";
import { cadastrarTarefa } from "../../services/tarefasService";
import Cabecalho from "../../components/Cabecalho";

type Prioridade = "BAIXA" | "MEDIA" | "ALTA" | "";
type Status = "A_FAZER" | "EM_ANDAMENTO" | "CONCLUIDA";

const CadastroTarefa = () => {
  useAuthRedirect();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from || "tarefas-quadro-kanban";
  const statusInicial = location.state?.status || "A_FAZER";

  const [tituloTarefa, setTituloTarefa] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [dataLimite, setDataLimite] = useState<string>('');
  const [prioridade, setPrioridade] = useState<Prioridade>('');
  const [status] = useState<Status>(statusInicial);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleCadastroTarefa = async () => {
    if (!tituloTarefa.trim() || !descricao || !dataLimite || !prioridade) {
      setError("Preencha todos os campos.");
      setSuccess("");
      return;
    }

    if (tituloTarefa.length < 3 || tituloTarefa.length > 150) {
      setError("O título deve ter entre 3 e 100 caracteres.");
      setSuccess("");
      return;
    }

    if (descricao.length < 3 || descricao.length > 150) {
      setError("A descrição deve ter entre 3 e 100 caracteres.");
      setSuccess("");
      return;
    }

    const dataSelecionada = new Date(dataLimite);
    const hoje = new Date();

    // Zera a hora de hoje para comparar apenas a data
    hoje.setHours(0, 0, 0, 0);

    if (dataSelecionada <= hoje) {
      setError('A data limite da tarefa deve ser no futuro.');
      setSuccess('');
      return;
    }

    const tarefa = {
      titulo: tituloTarefa,
      descricao: descricao,
      prioridade: prioridade,
      status: status,
      data_limite: dataLimite,
    };

    try {
      await cadastrarTarefa(tarefa);

      setError("");
      setSuccess("Tarefa cadastrada com sucesso!");

      setTimeout(() => {
        navigate(fromPage === "tarefas-quadro-kanban" ? "/tarefas-quadro-kanban" : "/minhas-tarefas");
      }, 1500);

    } catch (erro) {
      console.log(erro);
      setError("Erro ao cadastrar a tarefa. Tente novamente.");
      setSuccess("");
    }
  };

  const getRedirectUrl = () => {
    return fromPage === "tarefas-quadro-kanban" ? "/tarefas-quadro-kanban" : "/minhas-tarefas";
  };

  return (
    <DashBoardContainer>
      <Cabecalho />
      <MenuLateral />
      <DashboardMainCadastroTarefas>
        <p>
          Minhas tarefas<span> {'>'} Cadastro de Tarefas</span>
        </p>

        <CadastroTarefasContainer>
          <CadastroTarefasForm>
            <InputsContainerTarefa>
              <InputTituloTarefa>
                <InputLabel htmlFor="tituloTarefa">Título da Tarefa</InputLabel>
                <InputField
                  id="tituloTarefa"
                  type="text"
                  name="tituloTarefa"
                  placeholder="Ex: Arrumar a cama"
                  required
                  value={tituloTarefa}
                  onChange={(e) => setTituloTarefa(e.target.value)}
                />
              </InputTituloTarefa>

              <InputDescricaoTarefa>
                <InputLabel htmlFor="descricao">Descrição</InputLabel>
                <InputField
                  id="descricao"
                  type="text"
                  name="descricao"
                  required
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </InputDescricaoTarefa>

              <InputPrioridade>
                <InputLabel htmlFor="prioridade">Prioridade</InputLabel>
                <SelectField
                  id="prioridade"
                  name="prioridade"
                  required
                  value={prioridade}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setPrioridade(e.target.value as Prioridade)}
                >
                  <option value="" disabled>Selecione uma prioridade</option>
                  <option value="BAIXA">Baixa</option>
                  <option value="MEDIA">Média</option>
                  <option value="ALTA">Alta</option>
                </SelectField>
              </InputPrioridade>

              <InputDataLimiteTarefa>
                <InputLabel htmlFor="dataLimite">Data Limite:</InputLabel>
                <InputField
                  id="dataLimite"
                  type="date"
                  name="dataLimite"
                  value={dataLimite}
                  onChange={(e) => setDataLimite(e.target.value)}
                />
              </InputDataLimiteTarefa>
            </InputsContainerTarefa>

            <MensagensContainer>
              {success && <MensagemSucesso>{success}</MensagemSucesso>}
              {error && <MensagemErro>{error}</MensagemErro>}
            </MensagensContainer>

            <BotoesContainerTarefas>
              <BotaoAcaoTarefa type="button" onClick={() => navigate(getRedirectUrl())}>
                Cancelar
              </BotaoAcaoTarefa>
              <BotaoAcaoTarefa type="button" onClick={handleCadastroTarefa}>
                Cadastrar Tarefa
              </BotaoAcaoTarefa>
            </BotoesContainerTarefas>
          </CadastroTarefasForm>
        </CadastroTarefasContainer>
      </DashboardMainCadastroTarefas>
    </DashBoardContainer>
  );
};

export default CadastroTarefa;