import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import MenuLateral from "../../components/MenuLateral";
import { useEffect, useState } from "react";
import { editarDadosTarefa, obterDadosTarefa } from "../../services/tarefasService";
import Cabecalho from "../../components/Cabecalho";
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
  BotaoAcaoTarefa,
  EditarButton
} from "./styles";
import LoadingTelaCheia from "../../components/LoadingTelaCheia";

type Prioridade = "BAIXA" | "MEDIA" | "ALTA";
type Status = "A_FAZER" | "EM_ANDAMENTO" | "CONCLUIDA";

const EditarTarefa = () => {
    useAuthRedirect();
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const fromPage = location.state?.from || "tarefas-quadro-kanban";

    const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [tituloTarefa, setTituloTarefa] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [dataLimite, setDataLimite] = useState<string>('');
    const [prioridade, setPrioridade] = useState<Prioridade>("BAIXA");
    const [status, setStatus] = useState<Status>("A_FAZER");
    const [idUsuario, setIdUsuario] = useState<number>(0);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                setLoadingFetch(true);
                const dados = await obterDadosTarefa(Number(id));
                setTituloTarefa(dados.titulo);
                setDescricao(dados.descricao);
                setDataLimite(dados.data_limite);
                setStatus(dados.status || "A_FAZER");
                setPrioridade(dados.prioridade || "BAIXA")
                setIdUsuario(dados.id_usuario);
            } catch (erro) {
                console.error(erro);
                setError("Erro ao carregar dados da tarefa.");
            } finally {
                setLoadingFetch(false);
            }
        };

        fetchMeta();
    }, [id]);

    const handleEditarTarefa = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setSuccess("");

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

        if (idUsuario === 0) {
            setError("ID do usuário não encontrado.");
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
            prioridade: prioridade as Prioridade,
            status: status as Status, 
            data_limite: dataLimite,
            id_usuario: idUsuario
        };

        try {
            setLoading(true);

            await editarDadosTarefa(Number(id), tarefa);

            setError("");
            setSuccess("Tarefa editada com sucesso!");

            setTimeout(() => {
                navigate(fromPage === "tarefas-quadro-kanban" ? "/tarefas-quadro-kanban" : "/minhas-tarefas");
            }, 1500);

        } catch (erro) {
            console.log(erro);

            setError("Erro ao editar a tarefa. Tente novamente.");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LoadingTelaCheia carregando={loadingFetch}/>
            
            <DashBoardContainer $carregando={loadingFetch}>
                <Cabecalho />
                <MenuLateral />
                <DashboardMainCadastroTarefas>
                    <p>Minhas tarefas<span> {'>'} Editar Tarefa</span></p>

                    <CadastroTarefasContainer>

                        <CadastroTarefasForm>
                            <InputsContainerTarefa>

                                <InputTituloTarefa>
                                    <InputLabel htmlFor="tituloTarefa">Título da Tarefa</InputLabel>
                                    <InputField
                                        id="tituloTarefa"
                                        type="text"
                                        name="tituloTarefa"
                                        placeholder='Ex: Arrumar a cama'
                                        required
                                        value={tituloTarefa}
                                        onChange={(e) => setTituloTarefa(e.target.value)}
                                        disabled={loading}
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
                                        disabled={loading}
                                    />
                                </InputDescricaoTarefa>

                                <InputPrioridade>
                                    <InputLabel htmlFor="prioridade">Prioridade</InputLabel>
                                    <SelectField
                                        id="prioridade"
                                        name="prioridade"
                                        required
                                        value={prioridade}
                                        disabled={loading}
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
                                        disabled={loading}
                                    />
                                </InputDataLimiteTarefa>
                                
                                {fromPage === "minhas-tarefas" && ( 
                                
                                    <InputPrioridade>
                                        <InputLabel htmlFor="status">Status</InputLabel>
                                        <SelectField
                                            id="status"
                                            name="status"
                                            required
                                            value={status}
                                            disabled={loading}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                                setStatus(e.target.value as Status)}
                                        >
                                            <option value="" disabled>Selecione um status</option>
                                            <option value="A_FAZER">A fazer</option>
                                            <option value="EM_ANDAMENTO">Em andamento</option>
                                            <option value="CONCLUIDA">Concluída</option>
                                            
                                        </SelectField>
                                    </InputPrioridade>
                                )}
                                

                            </InputsContainerTarefa>

                            <MensagensContainer>
                                {success && <MensagemSucesso>{success}</MensagemSucesso>}
                                {error && <MensagemErro>{error}</MensagemErro>}
                            </MensagensContainer>

                            <BotoesContainerTarefas>
                                <BotaoAcaoTarefa onClick={() => navigate(fromPage === "tarefas-quadro-kanban" ? "/tarefas-quadro-kanban" : "/minhas-tarefas")}>Cancelar</BotaoAcaoTarefa>
                                <EditarButton
                                    type="button" 
                                    onClick={handleEditarTarefa}
                                    $loading={loading}
                                    disabled={loading}
                                    >
                                    {loading ? 'Editando...' : 'Editar Tarefa'}
                                </EditarButton>
                            </BotoesContainerTarefas>
                        </CadastroTarefasForm>
                    </CadastroTarefasContainer>
                </DashboardMainCadastroTarefas>
            </DashBoardContainer>
        </>
    )
}

export default EditarTarefa;