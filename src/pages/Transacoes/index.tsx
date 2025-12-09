import { useNavigate } from 'react-router-dom';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { useEffect, useState, useRef } from 'react';
import { obterTransacoes } from '../../utils/obterTransacoes';
import IconeMenuVertical from "../../assets/images/icone-menu-vertical.png"
import ModalDeletarTransacao from './components/ModalDeletarTransacao';
import Cabecalho from "../../components/Cabecalho";
import MenuLateral from "../../components/MenuLateral";
import type { TransacaoResponse } from '../../types/transacao';
import { BotaoExcel, BotaoExcelContainer, BotaoFiltro, BotoesFiltroContainer, Breadcrumb, CelulaAcoes, DashBoardContainer, DashboardMainTransacoes, FiltroItem, FiltrosContainer, MenuTransacaoBtn, MenuTransacaoDropdown, TabelaScrollWrapper, TabelaTransacoes, TipoTransacaoSpan, TransacoesContainer, TransacoesForm } from './styles';
import { deletarTransacao } from '../../services/transacaoService';
import { exportarParaExcel } from '../../utils/exportarParaExcel';
import LoadingTelaCheia from '../../components/LoadingTelaCheia';

const Transacoes = () => {
    useAuthRedirect();
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    const [carregando, setCarregando] = useState<boolean>(true);
    const [todasTransacoes, setTodasTransacoes] = useState<TransacaoResponse[]>([]);
    const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);
    const [tipoTransacaoFiltro, setTipoTransacaoFiltro] = useState<string>('');
    const [dataInicioFiltro, setDataInicioFiltro] = useState<string>('');
    const [dataFimFiltro, setDataFimFiltro] = useState<string>('');
    const [categoriaFiltro, setCategoriaFiltro] = useState<string>('');
    const [transacaoSelecionada, setTransacaoSelecionada] = useState<number | null>(null);
    const [modalDelete, setModalDelete] = useState<boolean>(false);
    const [idTransacaoParaDeletar, setIdTransacaoParaDeletar] = useState<number | null>(null);

    useEffect(() => {
        const fetchDadosUsuario = async () => {
            try {
                setCarregando(true);
                const transacoes = await obterTransacoes();
                const transacoesOrdenadas = transacoes.sort((a, b) => {
                    const dataA = new Date(a.data).getTime();
                    const dataB = new Date(b.data).getTime();
                    return dataB - dataA; // Mais recente primeiro
                });

                setTodasTransacoes(transacoesOrdenadas);  // guardar a lista original
                setTransacoes(transacoesOrdenadas); // mostrar inicialmente todas

            } catch (erro) {

                console.error("Erro ao obter dados do usuário:", erro);
            } finally {
                setCarregando(false);
            }
        };

        fetchDadosUsuario();
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setTransacaoSelecionada(null);
            }
        }

        if (transacaoSelecionada !== null) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [transacaoSelecionada]);

    const formatarCategoria = (categoria: string) => {
        switch (categoria) {
            case 'ALIMENTACAO':
                return 'Alimentação';
            case 'TRANSPORTE':
                return 'Transporte';
            case 'LAZER':
                return 'Lazer';
            case 'SAUDE':
                return 'Saúde';
            case 'MORADIA':
                return 'Moradia';
            case 'OUTROS':
                return 'Outros';
            case 'SALARIO':
                return 'Salário';
            case 'INVESTIMENTO':
                return 'Investimento';
            default:
                return categoria;
        }
    };

    const formatarTipoFormatado = (tipo: string) => {
        switch (tipo) {
        case 'ENTRADA':
            return 'Entrada';
        case 'SAIDA':
            return 'Saída';
        case 'APLICACAO':
            return 'Aplicação';
        case 'RESGATE':
            return 'Resgate';
        default:
            return tipo;
        }
    };

    const aplicarFiltros = () => {
        const dataFim = dataFimFiltro ? new Date(dataFimFiltro + "T23:59:59") : null;

        const filtrosAtivos = todasTransacoes.filter((transacao) => {
            const dataTransacao = new Date(transacao.data);

            const tipoOk = tipoTransacaoFiltro ? transacao.tipo === tipoTransacaoFiltro : true;
            const categoriaOk = categoriaFiltro ? transacao.categoria === categoriaFiltro : true;
            const dataInicioOk = dataInicioFiltro ? dataTransacao >= new Date(dataInicioFiltro) : true;
            const dataFimOk = dataFim ? dataTransacao <= dataFim : true;

            return tipoOk && categoriaOk && dataInicioOk && dataFimOk;
        });

        return filtrosAtivos;
    };

    const limparFiltros = () => {
        setTipoTransacaoFiltro('');
        setCategoriaFiltro('');
        setDataInicioFiltro('');
        setDataFimFiltro('');
        setTransacoes(todasTransacoes);
    };

    const handleEditar = (id: number) => {
        // Navegar para rota de edição, passando o ID
        navigate(`/editar-transacao/${id}`);
        setTransacaoSelecionada(null);
    };

    const handleDeletar = async (id: number) => {
        setIdTransacaoParaDeletar(id);
        setModalDelete(true);
        setTransacaoSelecionada(null);
    };

    const exportarTransacoes = () => {
        const dados = transacoes.map((t) => ({
            Descrição: t.descricao,
            Categoria: formatarCategoria(t.categoria),
            Data: new Date(t.data).toLocaleDateString('pt-BR'),
            Tipo:
                t.tipo === 'ENTRADA' ? 'Entrada' :
                t.tipo === 'SAIDA' ? 'Saída' :
                t.tipo === 'APLICACAO' ? 'Aplicação' :
                t.tipo === 'RESGATE' ? 'Resgate' :
                t.tipo,
            Valor: t.valor.toLocaleString('pt-BR', {
                style: 'currency',  
                currency: 'BRL',
            }),
        }));

        exportarParaExcel(dados, 'transacoes', 'Transações');
    };

    return (
        <>
             <LoadingTelaCheia  carregando={carregando}/>

            <DashBoardContainer $carregando={carregando}>
                <Cabecalho />
                <MenuLateral />
                <DashboardMainTransacoes>
                    <Breadcrumb>
                        Controle Financeiro <span> {'>'} Transações</span>
                    </Breadcrumb>

                    <TransacoesContainer>

                        <TransacoesForm>

                            <FiltrosContainer>

                                <FiltroItem>
                                    <label htmlFor="tipoTransacao">Tipo de Transação:</label>
                                    <select
                                    id="tipoTransacao"
                                    name="tipoTransacao"
                                    value={tipoTransacaoFiltro}
                                    onChange={(e) => setTipoTransacaoFiltro(e.target.value)}
                                    >
                                    <option value="" disabled>Selecione um tipo</option>
                                    <option value="ENTRADA">Entrada</option>
                                    <option value="SAIDA">Saída</option>
                                    <option value="APLICACAO">Aplicação</option>
                                    <option value="RESGATE">Resgate</option>
                                    </select>
                                </FiltroItem>

                                <FiltroItem>
                                    <label htmlFor="dataInicio">Data Início:</label>
                                    <input
                                    id="dataInicio"
                                    type="date"
                                    name="dataInicio"
                                    value={dataInicioFiltro}
                                    onChange={(e) => setDataInicioFiltro(e.target.value)}
                                    />
                                </FiltroItem>

                                <FiltroItem>
                                    <label htmlFor="dataFim">Data Fim:</label>
                                    <input
                                    id="dataFim"
                                    type="date"
                                    name="dataFim"
                                    value={dataFimFiltro}
                                    onChange={(e) => setDataFimFiltro(e.target.value)}
                                    />
                                </FiltroItem>

                                <FiltroItem>
                                    <label htmlFor="categoria">Categoria:</label>
                                    <select
                                    id="categoria"
                                    name="categoria"
                                    value={categoriaFiltro}
                                    onChange={(e) => setCategoriaFiltro(e.target.value)}
                                    >
                                    <option value="" disabled>Selecione uma categoria</option>
                                    <option value="ALIMENTACAO">Alimentação</option>
                                    <option value="TRANSPORTE">Transporte</option>
                                    <option value="MORADIA">Moradia</option>
                                    <option value="LAZER">Lazer</option>
                                    <option value="SALARIO">Salário</option>
                                    <option value="SAUDE">Saúde</option>
                                    <option value="INVESTIMENTO">Investimento</option>
                                    <option value="OUTROS">Outros</option>
                                    </select>
                                </FiltroItem>

                            </FiltrosContainer>

                            <BotoesFiltroContainer>
                                <BotaoFiltro type="button" onClick={() => setTransacoes(aplicarFiltros())}>
                                    Filtrar
                                </BotaoFiltro>
                                <BotaoFiltro type="button" onClick={limparFiltros}>
                                    Limpar Filtros
                                </BotaoFiltro>
                                <BotaoFiltro type="button" onClick={() => navigate("/cadastrar-transacao")}>
                                    Cadastrar Transação
                                </BotaoFiltro>
                            </BotoesFiltroContainer>
                        </TransacoesForm>

                        <TabelaScrollWrapper>
                            <TabelaTransacoes>
                            <thead>
                                <tr>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th>Data</th>
                                <th>Tipo</th>
                                <th>Valor</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {transacoes.length > 0 ? (
                                transacoes.map((transacao, index) => {
                                    const isLastRows = index >= transacoes.length - 2;
                                    return (
                                    <tr key={transacao.id_transacao}>
                                        <td>{transacao.descricao}</td>
                                        <td>{formatarCategoria(transacao.categoria)}</td>
                                        <td>{new Date(transacao.data).toLocaleDateString('pt-BR')}</td>
                                        <td>
                                        <TipoTransacaoSpan tipo={transacao.tipo}>
                                            {formatarTipoFormatado(transacao.tipo)}
                                        </TipoTransacaoSpan>
                                        </td>
                                        <td>
                                        {transacao.valor.toLocaleString('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        })}
                                        </td>
                                        <CelulaAcoes>
                                        <div ref={transacaoSelecionada === transacao.id_transacao ? menuRef : null} style={{ display: 'inline-block' }}>
                                            <MenuTransacaoBtn onClick={() => setTransacaoSelecionada(transacao.id_transacao)}>
                                            <img src={IconeMenuVertical} alt="Ícone de menu" />
                                            </MenuTransacaoBtn>
                                            {transacaoSelecionada === transacao.id_transacao && (
                                            <MenuTransacaoDropdown isOpenUp={isLastRows}>
                                                <button onClick={() => handleEditar(transacao.id_transacao)}>Editar</button>
                                                <button onClick={() => handleDeletar(transacao.id_transacao)}>Deletar</button>
                                            </MenuTransacaoDropdown>
                                            )}
                                        </div>
                                        </CelulaAcoes>
                                    </tr>
                                    );
                                })
                                ) : (
                                <tr>
                                    <td colSpan={6}>Nenhuma transação encontrada.</td>
                                </tr>
                                )}
                            </tbody>
                            </TabelaTransacoes>
                        </TabelaScrollWrapper>

                        <BotaoExcelContainer>
                            <BotaoExcel type="button" onClick={exportarTransacoes}>
                            Exportar para Excel
                            </BotaoExcel>
                        </BotaoExcelContainer>

                    </TransacoesContainer>

                    <ModalDeletarTransacao
                        aberto={modalDelete}
                        onClose={() => setModalDelete(false)}
                        onDelete={async () => {
                            if (idTransacaoParaDeletar === null) return;

                            try {
                                await deletarTransacao(idTransacaoParaDeletar);

                                // RECARREGAR do backend
                                const transacoesAtualizadas = await obterTransacoes();
                                const transacoesOrdenadas = transacoesAtualizadas.sort((a, b) => {
                                    const dataA = new Date(a.data).getTime();
                                    const dataB = new Date(b.data).getTime();
                                    return dataB - dataA;
                                });

                                setTodasTransacoes(transacoesOrdenadas);
                                setTransacoes(transacoesOrdenadas);

                                setModalDelete(false);
                                setIdTransacaoParaDeletar(null);
                            } catch (erro) {
                                console.error("Erro ao deletar:", erro);
                                alert("Erro ao deletar a transação. Por favor, tente novamente.");
                            }
                        }}
                    />
                </DashboardMainTransacoes>
            </DashBoardContainer>
        </>
    )
}

export default Transacoes;