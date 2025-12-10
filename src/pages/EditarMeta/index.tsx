import { useNavigate, useParams } from "react-router-dom";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import MenuLateral from "../../components/MenuLateral";
import { useEffect, useState } from "react";
import { editarDadosMeta, obterDadosMeta } from "../../services/metaService";
import Cabecalho from "../../components/Cabecalho";
import { BotaoAcao, BotoesContainer, CadastroMetasContainer, CadastroMetasForm, DashBoardContainer, DashboardMainCadastroMetas, EditarButton, InputDataLimite, InputField, InputLabel, InputNomeMeta, InputsContainer, InputValorMeta, MensagemErro, MensagemSucesso, MensagensContainer } from "./styles";
import LoadingTelaCheia from "../../components/LoadingTelaCheia";

const EditarMeta = () => {
    useAuthRedirect();
    const navigate = useNavigate();
    const { id } = useParams();

    const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [nomeMeta, setNomeMeta] = useState<string>('');
    const [dataLimiteMeta, setDataLimiteMeta] = useState<string>('');
    const [valorMeta, setValorMeta] = useState('');
    const [statusMeta, setStatusMeta] = useState<"EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA">("EM_ANDAMENTO");
    const [idFinanceiro, setIdFinanceiro] = useState<number | null>(null);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                setLoadingFetch(true);
                const dados = await obterDadosMeta(Number(id));
                setNomeMeta(dados.nome);
                setDataLimiteMeta(dados.data_limite);
                setValorMeta(String(dados.valor_meta));
                setStatusMeta(dados.status)
                setIdFinanceiro(dados.id_financeiro);
            } catch (erro) {
                console.error(erro);
                setError("Erro ao carregar dados da meta.");
            } finally {
                setLoadingFetch(false);
            }
        };

        fetchMeta();
    }, [id]);

    const handleEditarMeta = async () => {
        if (!nomeMeta.trim() || !dataLimiteMeta || !valorMeta) {
            setError("Preencha todos os campos.");
            setSuccess("");
            return;
        }

        if (nomeMeta.length < 3 || nomeMeta.length > 150) {
            setError("O nome deve ter entre 3 e 100 caracteres.");
            setSuccess("");
            return;
        }

        const valorMetaConvertido = parseFloat(valorMeta);

        if (isNaN(valorMetaConvertido) || valorMetaConvertido <= 0) {
            setError('O valor da meta deve ser um número positivo.');
            return;
        }

        const dataSelecionada = new Date(dataLimiteMeta);
        const hoje = new Date();

        // Zera a hora de hoje para comparar apenas a data
        hoje.setHours(0, 0, 0, 0);

        if (dataSelecionada <= hoje) {
            setError('A data limite da meta deve ser no futuro.');
            setSuccess('');
            return;
        }

        try {
            setLoading(true);

            await editarDadosMeta(Number(id), {
                nome: nomeMeta,
                valor_meta: Number(valorMeta),
                data_limite: dataLimiteMeta,
                status: statusMeta,
                id_financeiro: Number(idFinanceiro)
            });

            setError("");
            setSuccess("Meta Financeira editada com sucesso!");

            setTimeout(() => {
                navigate("/metas");
            }, 1500);
        } catch (erro) {
            console.error(erro);
            setError("Erro ao editar a meta. Tente novamente.");
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
                <DashboardMainCadastroMetas>
                    <p>Controle Financeiro {'>'} Metas <span> {'>'} Editar Meta</span></p>

                    <CadastroMetasContainer>

                        <CadastroMetasForm>
                            <InputsContainer>

                                <InputNomeMeta>
                                    <InputLabel htmlFor="nomeMeta">Nome da Meta</InputLabel>
                                    <InputField
                                        id="nomeMeta"
                                        type="text"
                                        name="nomeMeta"
                                        placeholder='Ex: Viagem para Europa'
                                        required
                                        value={nomeMeta}
                                        onChange={(e) => setNomeMeta(e.target.value)}
                                        disabled={loading}
                                    />
                                </InputNomeMeta>

                                <InputDataLimite>
                                    <InputLabel htmlFor="dataLimite">Data Limite:</InputLabel>
                                    <InputField
                                        id="dataLimite"
                                        type="date"
                                        name="dataLimite"
                                        value={dataLimiteMeta}
                                        onChange={(e) => setDataLimiteMeta(e.target.value)}
                                        disabled={loading}
                                    />
                                </InputDataLimite>

                                <InputValorMeta>
                                    <InputLabel htmlFor="valorMeta">Valor da Meta</InputLabel>
                                    <InputField
                                        id="valorMeta"
                                        type="number"
                                        step="any"
                                        name="valorMeta"
                                        placeholder='Ex: 10.000,00'
                                        required
                                        value={valorMeta}
                                        onChange={(e) => setValorMeta(e.target.value)}
                                        disabled={loading}
                                    />
                                </InputValorMeta>

                            </InputsContainer>

                            <MensagensContainer>
                                {success && <MensagemSucesso>{success}</MensagemSucesso>}
                                {error && <MensagemErro>{error}</MensagemErro>}
                            </MensagensContainer>

                            <BotoesContainer>
                                <BotaoAcao onClick={() => navigate("/metas")}>Cancelar</BotaoAcao>
                                <EditarButton
                                    type="button" 
                                    onClick={handleEditarMeta}
                                    $loading={loading}
                                    disabled={loading}
                                    >
                                    {loading ? 'Editando...' : 'Editar Meta'}
                                </EditarButton>
                            </BotoesContainer>
                        </CadastroMetasForm>
                    </CadastroMetasContainer>
                </DashboardMainCadastroMetas>
            </DashBoardContainer>
        </>
    )
}

export default EditarMeta;