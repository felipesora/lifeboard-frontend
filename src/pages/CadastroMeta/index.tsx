import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DashBoardContainer,
  DashboardMainCadastroMetas,
  CadastroMetasContainer,
  CadastroMetasForm,
  InputsContainer,
  InputNomeMeta,
  InputDataLimite,
  InputValorMeta,
  InputLabel,
  InputField,
  MensagensContainer,
  MensagemSucesso,
  MensagemErro,
  BotoesContainer,
  BotaoAcao
} from "./styles";

import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import MenuLateral from "../../components/MenuLateral";
import Cabecalho from "../../components/Cabecalho";
import { cadastrarMeta } from "../../services/metaService";

const CadastroMeta = () => {
  useAuthRedirect();
  const navigate = useNavigate();

  const [nomeMeta, setNomeMeta] = useState<string>('');
  const [dataLimiteMeta, setDataLimiteMeta] = useState<string>('');
  const [valorMeta, setValorMeta] = useState<string>('');
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleCadastroMeta = async () => {
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

    const valorConvertido = parseFloat(valorMeta);

    if (isNaN(valorConvertido) || valorConvertido <= 0) {
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

    const meta = {
      nome: nomeMeta,
      data_limite: dataLimiteMeta,
      valor_atual: 0,
      valor_meta: Number(valorMeta),
    };

    try {
      await cadastrarMeta(meta);

      setError("");
      setSuccess("Meta cadastrada com sucesso!");

      setTimeout(() => {
        navigate("/metas");
      }, 1500);

    } catch (erro) {
      console.log(erro);
      setError("Erro ao cadastrar a meta. Tente novamente.");
      setSuccess("");
    }
  };

  return (
    <DashBoardContainer>
      <Cabecalho />
      <MenuLateral />
      <DashboardMainCadastroMetas>
        <p>
          Controle Financeiro {'>'} Metas <span> {'>'} Cadastro de Metas</span>
        </p>

        <CadastroMetasContainer>
          <CadastroMetasForm>
            <InputsContainer>
              <InputNomeMeta>
                <InputLabel htmlFor="nomeMeta">Nome da Meta</InputLabel>
                <InputField
                  id="nomeMeta"
                  type="text"
                  name="nomeMeta"
                  placeholder="Ex: Viagem para Europa"
                  required
                  value={nomeMeta}
                  onChange={(e) => setNomeMeta(e.target.value)}
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
                />
              </InputDataLimite>

              <InputValorMeta>
                <InputLabel htmlFor="valorMeta">Valor da Meta</InputLabel>
                <InputField
                  id="valorMeta"
                  type="number"
                  step="any"
                  name="valorMeta"
                  placeholder="Ex: 10.000,00"
                  required
                  value={valorMeta}
                  onChange={(e) => setValorMeta(e.target.value)}
                />
              </InputValorMeta>
            </InputsContainer>

            <MensagensContainer>
              {success && <MensagemSucesso>{success}</MensagemSucesso>}
              {error && <MensagemErro>{error}</MensagemErro>}
            </MensagensContainer>

            <BotoesContainer>
              <BotaoAcao type="button" onClick={() => navigate("/metas")}>
                Cancelar
              </BotaoAcao>
              <BotaoAcao type="button" onClick={handleCadastroMeta}>
                Cadastrar Meta
              </BotaoAcao>
            </BotoesContainer>
          </CadastroMetasForm>
        </CadastroMetasContainer>
      </DashboardMainCadastroMetas>
    </DashBoardContainer>
  );
};

export default CadastroMeta;