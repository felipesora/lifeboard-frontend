import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DashBoardContainer,
  DashboardMainMetas,
  MetasContainer,
  MetasForm,
  FiltrosMetasContainer,
  FiltroMeta,
  BotoesFiltroContainer,
  BotaoFiltro,
  CardsMetasContainer,
  MensagemSemMetas
} from './styles';

import MenuLateral from '../../components/MenuLateral';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import IconeMetaAndamento from "../../assets/images/icone-meta-andamento.png";
import IconeMetaConcluida from "../../assets/images/icone-meta-concluida.png";
import { obterMetas } from '../../utils/obterMetas';
import Cabecalho from "../../components/Cabecalho";
import CardMeta from './components/CardMeta';
import ModalAdicionarSaldoMeta from './components/ModalAdiconarSaldoMeta';
import ModalDeletarMeta from './components/ModalDeletarMeta';
import ModalRetirarSaldoMeta from './components/ModalRetirarSaldoMeta';
import type { MetaResponse } from '../../types/meta';
import { adicionarSaldo, deletarMeta, retirarSaldo } from '../../services/metaService';

const Metas = () => {
  useAuthRedirect();
  const navigate = useNavigate();

  const [statusMeta, setStatusMeta] = useState<string>('');
  const [dataLimiteMeta, setDataLimiteMeta] = useState<string>('');
  const [todasMetas, setTodasMetas] = useState<MetaResponse[]>([]);
  const [metas, setMetas] = useState<MetaResponse[]>([]);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [idMetaParaDeletar, setIdMetaParaDeletar] = useState<number | null>(null);

  const [modalAdicionar, setModalAdicionar] = useState<boolean>(false);
  const [modalRetirar, setModalRetirar] = useState<boolean>(false);
  const [idMetaParaAdicionar, setIdMetaParaAdicionar] = useState<number | null>(null);
  const [valorAdicionar, setValorAdicionar] = useState<string>('');
  const [valorRetirar, setValorRetirar] = useState<string>('');

  useEffect(() => {
    const fetchDadosUsuario = async () => {
      try {
        const metas = await obterMetas();
        setTodasMetas(metas);
        setMetas(metas);
      } catch (erro) {
        console.error("Erro ao obter dados do usuário:", erro);
      }
    };

    fetchDadosUsuario();
  }, []);

  const formatarDataISOParaBR = (dataISO: string) => {
    if (!dataISO) return "";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const handleDeletar = (id: number) => {
    setIdMetaParaDeletar(id);
    setModalDelete(true);
  };

  const handleAdicionarSaldo = (id: number) => {
    setIdMetaParaAdicionar(id);
    setModalAdicionar(true);
  };

  const handleRetirarSaldo = (id: number) => {
    setIdMetaParaAdicionar(id);
    setModalRetirar(true);
  };

  const aplicarFiltros = () => {
    const dataLimiteFiltro = dataLimiteMeta ? new Date(dataLimiteMeta + "T23:59:59") : null;

    const metasFiltradas = todasMetas.filter((meta) => {
      const dataMeta = new Date(meta.data_limite);

      const statusOk = statusMeta ? meta.status === statusMeta : true;
      const dataLimiteOk = dataLimiteFiltro ? dataMeta <= dataLimiteFiltro : true;

      return statusOk && dataLimiteOk;
    });

    setMetas(metasFiltradas);
  };

  const limparFiltros = () => {
    setStatusMeta('');
    setDataLimiteMeta('');
    setMetas(todasMetas);
  };

  const ordenarMetas = (metasParaOrdenar: MetaResponse[]) => {
    return metasParaOrdenar
      .slice()
      .sort((a, b) => {
        if (a.status === b.status) {
          return a.valor_meta - b.valor_meta;
        }
        if (a.status === "EM_ANDAMENTO") return -1;
        if (b.status === "EM_ANDAMENTO") return 1;
        return 0;
      });
  };

  return (
    <DashBoardContainer>
      <Cabecalho />
      <MenuLateral />
      <DashboardMainMetas>
        <p>
          Controle Financeiro <span> {'>'} Metas</span>
        </p>

        <MetasContainer>
          <MetasForm>
            <FiltrosMetasContainer>
              <FiltroMeta>
                <label htmlFor="statusMeta">Status:</label>
                <select
                  id="statusMeta"
                  name="statusMeta"
                  value={statusMeta}
                  onChange={(e) => setStatusMeta(e.target.value)}
                >
                  <option value="" disabled>Selecione um Status</option>
                  <option value="EM_ANDAMENTO">Em Andamento</option>
                  <option value="CONCLUIDA">Concluída</option>
                </select>
              </FiltroMeta>

              <FiltroMeta>
                <label htmlFor="dataLimite">Data Limite:</label>
                <input
                  id="dataLimite"
                  type="date"
                  name="dataLimite"
                  value={dataLimiteMeta}
                  onChange={(e) => setDataLimiteMeta(e.target.value)}
                />
              </FiltroMeta>
            </FiltrosMetasContainer>

            <BotoesFiltroContainer>
              <BotaoFiltro type="button" onClick={aplicarFiltros}>
                Filtrar
              </BotaoFiltro>
              <BotaoFiltro type="button" onClick={limparFiltros}>
                Limpar Filtros
              </BotaoFiltro>
              <BotaoFiltro type="button" onClick={() => navigate("/cadastrar-meta")}>
                Nova Meta
              </BotaoFiltro>
            </BotoesFiltroContainer>
          </MetasForm>

          <CardsMetasContainer>
            {metas.length > 0 ? (
              ordenarMetas(metas).map((meta) => (
                <CardMeta
                  key={meta.id_meta}
                  idMeta={meta.id_meta}
                  iconeMeta={meta.status === "EM_ANDAMENTO" ? IconeMetaAndamento : IconeMetaConcluida}
                  nomeMeta={meta.nome}
                  valorMeta={meta.valor_meta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  valorAtual={meta.valor_atual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  valorMetaNum={meta.valor_meta}
                  valorAtualNum={meta.valor_atual}
                  dataLimite={formatarDataISOParaBR(meta.data_limite)}
                  onDeletar={handleDeletar}
                  onAdicionarSaldo={handleAdicionarSaldo}
                  onRetirarSaldo={handleRetirarSaldo}
                />
              ))
            ) : (
              <MensagemSemMetas>Nenhuma meta encontrada.</MensagemSemMetas>
            )}
          </CardsMetasContainer>
        </MetasContainer>

        <ModalDeletarMeta
          aberto={modalDelete}
          onClose={() => setModalDelete(false)}
          onDelete={async () => {
            try {
              if (idMetaParaDeletar !== null) {
                  await deletarMeta(idMetaParaDeletar);
                  const metasAtualizadas = await obterMetas();
                  setMetas(metasAtualizadas);
                  setModalDelete(false);
                  setIdMetaParaDeletar(null);
              }
            } catch (erro) {
              console.error("Erro ao deletar meta:", erro);
            }
          }}
        />

        <ModalAdicionarSaldoMeta
          aberto={modalAdicionar}
          onClose={() => {
            setModalAdicionar(false);
            setValorAdicionar('');
          }}
          valorAdicionar={valorAdicionar}
          setValorAdicionar={setValorAdicionar}
          onAdicionar={async () => {
            try {
              if (idMetaParaAdicionar !== null) {
                await adicionarSaldo(idMetaParaAdicionar, Number(valorAdicionar));
                const metasAtualizadas = await obterMetas();
                setMetas(metasAtualizadas);
                setModalAdicionar(false);
                setIdMetaParaAdicionar(null);
                setValorAdicionar('');
              }
            } catch (erro) {
              console.error("Erro ao adicionar saldo na meta:", erro);
              throw erro;
            }
          }}
        />

        <ModalRetirarSaldoMeta
          aberto={modalRetirar}
          onClose={() => {
            setModalRetirar(false);
            setValorAdicionar('');
          }}
          valorRetirar={valorRetirar}
          setValorRetirar={setValorRetirar}
          onRetirar={async () => {
            try {
              if (idMetaParaAdicionar !== null) {
                  await retirarSaldo(idMetaParaAdicionar, Number(valorRetirar));
                  const metasAtualizadas = await obterMetas();
                  setMetas(metasAtualizadas);
                  setModalRetirar(false);
                  setIdMetaParaAdicionar(null);
                  setValorRetirar('');
              }
            } catch (erro) {
              console.error("Erro ao retirar saldo na meta:", erro);
              throw erro;
            }
          }}
        />
      </DashboardMainMetas>
    </DashBoardContainer>
  );
};

export default Metas;