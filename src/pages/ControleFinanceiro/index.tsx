import CardPequeno from "./components/CardPequeno";
import MenuLateral from "../../components/MenuLateral";
import IconeSaldo from "../../assets/images/icone-saldo.png";
import IconeSalario from "../../assets/images/icone-salario.png";
import IconeGastos from "../../assets/images/icone-cartao-credito.png";
import IconeTransacoes from "../../assets/images/icone-lista-preto.png";
import IconeGrafico from "../../assets/images/icone-grafico.png";
import IconeMetas from "../../assets/images/icone-metas-preto.png";
import CardTrasacao from "./components/CardTransacao";
import GastosMensaisGrafico from "./components/GastosMensaisGrafico";
import { useEffect, useState } from "react";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import ModalDefinirSalario from "./components/ModalDefinirSalario";
import { useNavigate } from "react-router-dom";
import CardMetaControleFinanceiro from "./components/CardMetaControleFinanceiro";
import IconeMetaAndamento from "../../assets/images/icone-meta-andamento.png"
import IconeMetaConcluida from "../../assets/images/icone-meta-concluida.png"
import Cabecalho from "../../components/Cabecalho";
import type { TransacaoResponse } from "../../types/transacao";
import type { MetaResponse } from "../../types/meta";
import { obterDadosUsuario } from "../../services/usuarioService";
import { obterTransacoes } from "../../utils/obterTransacoes";
import { obterMetas } from "../../utils/obterMetas";
import { editarFinanceiroUsuario } from "./services/financeiroService";
import { CardMetasContainer, CardMetasLink, CardMetasLista, CardMetasTitulo, ContainerCardGrafico, ContainerCardsPequenos, ContainerCardsPequenosEGrafico, ContainerCardsPequenosETransacoes, ContainerCardTransacoes, DashBoardContainer, DashBoardMain, DivSemMetas, SemMetasText } from "./styles";
import LoadingTelaCheia from "../../components/LoadingTelaCheia";

const ControleFinanceiro = () => {
    useAuthRedirect();
    const navigate = useNavigate();

    const [carregando, setCarregando] = useState<boolean>(true);
    const [saldo, setSaldo] = useState<number>(0);
    const [salario, setSalario] = useState<number>(0);
    const [gastosMes, setGastosMes] = useState<number>(0);
    const [gastosUltimos12Meses, setGastosUltimos12Meses] = useState<Array<{name: string, valor: number}>>([]);
    const [modalSalarioAberto, setModalSalarioAberto] = useState<boolean>(false);
    const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);
    const [metas, setMetas] = useState<MetaResponse[]>([]);

    const obterUltimos12Meses = (): Array<{name: string, mes: number, ano: number}> => {
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const resultado = [];
        const dataAtual = new Date();
        
        for (let i = 0; i < 12; i++) {
            const data = new Date(dataAtual);
            data.setMonth(data.getMonth() - i);
            
            const mes = data.getMonth();
            const ano = data.getFullYear();
            
            let nomeMes = meses[mes];
            if (ano !== dataAtual.getFullYear()) {
                nomeMes = `${meses[mes]}/${ano.toString().slice(2)}`;
            }
            
            resultado.unshift({
                name: nomeMes,
                mes: mes,
                ano: ano
            });
        }
        
        return resultado;
    };

    useEffect(() => {
        const fetchDadosUsuario = async (): Promise<void> => {
            try {
                setCarregando(true);

                const userId = localStorage.getItem("userId");
                if (!userId) return;

                const usuario = await obterDadosUsuario(Number(userId));

                // Saldo e salario
                setSaldo(usuario.financeiro.saldo_atual ?? 0);
                setSalario(usuario.financeiro.salario_mensal ?? 0);

                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                const saidas = usuario.financeiro.transacoes.filter(
                    (transacao) => transacao.tipo === "SAIDA"
                );

                // Gastos do mês atual
                const totalSaidasMes = saidas
                .filter((t) => {
                    const dt = new Date(t.data);
                    return (
                        dt.getMonth() === currentMonth &&
                        dt.getFullYear() === currentYear
                    );
                })
                .reduce((total, t) => total + t.valor, 0);

                setGastosMes(totalSaidasMes);


                // Obter estrutura dos últimos 12 meses
                const mesesParaCalcular = obterUltimos12Meses();

                // Calcular gastos para cada mês
                const gastosPorMes = mesesParaCalcular.map(({ name, mes, ano }) => {
                    const total = saidas.reduce((acc, t) => {
                        const dt = new Date(t.data);
                        if (dt.getMonth() === mes && dt.getFullYear() === ano) {
                            return acc + t.valor;
                        }
                        return acc;
                    }, 0);
                    
                    return { name, valor: total };
                });

                setGastosUltimos12Meses(gastosPorMes);


                // Transações
                const transacoes = await obterTransacoes();

                const ultimasTransacoes = [...transacoes]
                    .sort((a, b) => Number(new Date(b.data)) - Number(new Date(a.data)))
                    .slice(0, 4);

                setTransacoes(ultimasTransacoes);

                // Metas
                const metas = await obterMetas();

                const melhoresMetas = [...metas]
                    .sort((a, b) => {
                        if (a.status === b.status) {
                            return a.valor_meta - b.valor_meta;
                        }
                        if (a.status === "CONCLUIDA") return -1;
                        if (b.status === "CONCLUIDA") return 1;
                        return 0;
                    })
                    .slice(0, 3);

                setMetas(melhoresMetas);

            } catch (erro) {
                console.error("Erro ao obter dados do usuário:", erro);
            } finally {
                setCarregando(false);
            }
        };

        fetchDadosUsuario();
    }, []);

    const data = gastosUltimos12Meses;

    const handleSalvarSalario = async (novoSalario: number) => {
        setCarregando(true);
        try {
            const userId = localStorage.getItem("userId");
            const usuario = await obterDadosUsuario(Number(userId));

            const financeiroId = usuario.financeiro.id_financeiro;

            await editarFinanceiroUsuario(financeiroId, {
                saldo_atual: usuario.financeiro.saldo_atual,
                salario_mensal: Number(novoSalario),
                id_usuario: usuario.id_usuario,
            });

            setSalario(Number(novoSalario));
        } catch (error) {
            console.error("Erro ao salvar salário:", error);
        } finally {
            setCarregando(false);
        }
    };

    const abrirModal = () => {
        setModalSalarioAberto(true);
    };

    function formatarDataISOParaBR(dataISO: string) {
        if (!dataISO) return "";
        const [ano, mes, dia] = dataISO.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    return (
        <>
            <LoadingTelaCheia  carregando={carregando}/>

            <DashBoardContainer $carregando={carregando}>
                <Cabecalho />
                <MenuLateral />
                <DashBoardMain>

                    <div className="titulo">
                        <p>Controle Financeiro</p>
                    </div>

                    <div>
                        <ContainerCardsPequenosETransacoes>
                            <ContainerCardsPequenosEGrafico>
                                <ContainerCardsPequenos>
                                    <CardPequeno
                                        icone={IconeSaldo}
                                        descricao="Icone sacola de dinheiro"
                                        titulo="Saldo Atual"
                                        valor={saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        cor="#000000"
                                    />
                                    <CardPequeno
                                        icone={IconeSalario}
                                        descricao="Icone notas de dinheiro"
                                        titulo="Salário"
                                        valor={salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        cor="#2E7D32"
                                        mostrarMenu
                                        onAbrirModal={abrirModal}
                                    />
                                    <CardPequeno
                                        icone={IconeGastos}
                                        descricao="Icone cartão de crédito"
                                        titulo="Gastos do mês"
                                        valor={gastosMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        cor="#A44A48"
                                    />
                                </ContainerCardsPequenos>
                                <ContainerCardGrafico>
                                    <div className="titulo_grafico">
                                        <img src={IconeGrafico} alt="Icone de grafico" />
                                        <p>Gastos dos Últimos 12 Meses</p>
                                    </div>
                                    <GastosMensaisGrafico dados={data} />
                                </ContainerCardGrafico>
                            </ContainerCardsPequenosEGrafico>
                            <ContainerCardTransacoes>
                                <div>
                                    <img src={IconeTransacoes} alt="Icone de lista" />
                                    <p>Últimas Transações</p>
                                </div>
                                {transacoes.length > 0 ? (
                                    transacoes.map((transacao) => {
                                        const tipo = transacao.tipo;
                                        let corFundo, corTexto, titulo;

                                        switch (tipo) {
                                            case "SAIDA":
                                                corFundo = "#FFEBEE";
                                                corTexto = "#A44A48";
                                                titulo = "Saída";
                                                break;
                                            case "ENTRADA":
                                                corFundo = "#E8F5E9";
                                                corTexto = "#2E7D32";
                                                titulo = "Entrada";
                                                break;
                                            case "APLICACAO":
                                                corFundo = "#E3F2FD";
                                                corTexto = "#1565C0";
                                                titulo = "Aplicação";
                                                break;
                                            case "RESGATE":
                                                corFundo = "#FFF8E1";
                                                corTexto = "#EF6C00";
                                                titulo = "Resgate";
                                                break;
                                        }

                                        const valorFormatado = transacao.valor.toLocaleString('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        });

                                        const data = new Date(transacao.data).toLocaleDateString('pt-BR');

                                        return (
                                            <CardTrasacao
                                                key={transacao.id_transacao}
                                                corFundo={corFundo}
                                                corTexto={corTexto}
                                                titulo={titulo}
                                                valor={valorFormatado}
                                                descricao={transacao.descricao}
                                                data={data}
                                            />
                                        );
                                    })
                                ) : (
                                    <p className="sem-transacoes">Nenhuma transação encontrada.</p>
                                )}

                                {transacoes.length > 0 && (
                                    <div className="card_transacoes_link">
                                        <button onClick={() => navigate("/transacoes")}>Ver mais...</button>
                                    </div>
                                )}
                            </ContainerCardTransacoes>
                        </ContainerCardsPequenosETransacoes>
                        <CardMetasContainer>
                            <CardMetasTitulo>
                                <img src={IconeMetas} alt="Icone de cofrinho" />
                                <p>Minhas metas</p>
                            </CardMetasTitulo>

                            <CardMetasLista>
                                {metas.length > 0 ? (
                                    metas.map((meta) => {

                                        return (
                                            <CardMetaControleFinanceiro
                                                key={meta.id_meta}
                                                idMeta={meta.id_meta}
                                                iconeMeta={meta.status === "EM_ANDAMENTO" ? IconeMetaAndamento : IconeMetaConcluida}
                                                nomeMeta={meta.nome}
                                                valorMeta={meta.valor_meta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                valorAtual={meta.valor_atual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                valorMetaNum={meta.valor_meta}
                                                valorAtualNum={meta.valor_atual}
                                                dataLimite={formatarDataISOParaBR(meta.data_limite)}
                                            />
                                        );

                                    })

                                ) : (
                                    <DivSemMetas>
                                        <SemMetasText>Nenhuma meta encontrada.</SemMetasText>
                                    </DivSemMetas>
                                    
                                )}
                            </CardMetasLista>
                            {metas.length > 0 && (
                                <CardMetasLink>
                                    <button onClick={() => navigate("/metas")}>Ver mais...</button>
                                </CardMetasLink>
                            )}
                        </CardMetasContainer>
                    </div>

                    <ModalDefinirSalario
                        aberto={modalSalarioAberto}
                        onClose={() => setModalSalarioAberto(false)}
                        onSalvar={handleSalvarSalario}
                    />
                </DashBoardMain>
            </DashBoardContainer>
        </>
    )
}

export default ControleFinanceiro;