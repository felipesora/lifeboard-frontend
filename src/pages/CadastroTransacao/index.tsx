import { useNavigate } from 'react-router-dom';
import {
  DashboardMainCadastro,
  CadastroTransacaoContainer,
  CadastroForm,
  InputsContainer,
  InputDescricao,
  InputCategoria,
  InputTipo,
  InputValor,
  InputLabel,
  InputField,
  SelectField,
  MensagensContainer,
  MensagemSucesso,
  MensagemErro,
  BotoesContainer,
  BotaoAcao,
  DashBoardContainer
} from './styles';

import MenuLateral from '../../components/MenuLateral';
import { cadastrarTransacao } from '../../services/transacaoService';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import Cabecalho from "../../components/Cabecalho";
import { useState } from 'react';

const CadastroTransacao = () => {
  useAuthRedirect();
  const navigate = useNavigate();

  const [descricaoTransacao, setDescricaoTransacao] = useState<string>('');
  const [tipoTransacao, setTipoTransacao] = useState<"ENTRADA" | "SAIDA" | "APLICACAO" | "RESGATE" | "">("");
  const [categoriaTransacao, setCategoriaTransacao] = useState<"ALIMENTACAO" | "TRANSPORTE" | "MORADIA" | "LAZER" | "SALARIO" | "SAUDE" | "OUTROS" | "">("");
  const [valorTransacao, setValorTransacao] = useState<string>('');
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleCadastroTransacao = async () => {
    if (!descricaoTransacao.trim() || !categoriaTransacao || !tipoTransacao || !valorTransacao) {
      setError("Preencha todos os campos.");
      setSuccess("");
      return;
    }

    if (descricaoTransacao.length < 3 || descricaoTransacao.length > 150) {
      setError("A descrição deve ter entre 3 e 150 caracteres.");
      setSuccess("");
      return;
    }

    const valorConvertido = parseFloat(valorTransacao);

    if (isNaN(valorConvertido) || valorConvertido <= 0) {
      setError('O valor da transação deve ser um número positivo.');
      return;
    }

    const transacao = {
      descricao: descricaoTransacao,
      valor: valorConvertido,
      tipo: tipoTransacao,
      categoria: categoriaTransacao,
    };

    try {
      await cadastrarTransacao(transacao);

      setError("");
      setSuccess("Transação cadastrada com sucesso!");

      setTimeout(() => {
        navigate("/transacoes");
      }, 1500);

    } catch (erro) {
      console.log(erro);
      setError("Erro ao cadastrar a transação. Tente novamente.");
      setSuccess("");
    }
  };

  return (
    <DashBoardContainer>
      <Cabecalho />
      <MenuLateral />
      <DashboardMainCadastro>
        <p>
          Controle Financeiro {'>'} Transações <span> {'>'} Cadastro de Transações</span>
        </p>

        <CadastroTransacaoContainer>
          <CadastroForm>
            <InputsContainer>
              <InputDescricao>
                <InputLabel htmlFor="descricao">Descrição da Transação</InputLabel>
                <InputField
                  id="descricao"
                  type="text"
                  name="descricao"
                  placeholder="Ex: Celular"
                  required
                  value={descricaoTransacao}
                  onChange={(e) => setDescricaoTransacao(e.target.value)}
                />
              </InputDescricao>

              <InputCategoria>
                <InputLabel htmlFor="categoria">Categoria</InputLabel>
                <SelectField
                  id="categoria"
                  name="categoria"
                  required
                  value={categoriaTransacao}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setCategoriaTransacao(e.target.value as typeof categoriaTransacao)}
                >
                  <option value="" disabled>Selecione uma categoria</option>
                  <option value="ALIMENTACAO">Alimentação</option>
                  <option value="TRANSPORTE">Transporte</option>
                  <option value="MORADIA">Moradia</option>
                  <option value="LAZER">Lazer</option>
                  <option value="SALARIO">Salário</option>
                  <option value="SAUDE">Saúde</option>
                  <option value="OUTROS">Outros</option>
                </SelectField>
              </InputCategoria>

              <InputTipo>
                <InputLabel htmlFor="tipoTransacao">Tipo</InputLabel>
                <SelectField
                  id="tipoTransacao"
                  name="tipoTransacao"
                  required
                  value={tipoTransacao}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setTipoTransacao(e.target.value as typeof tipoTransacao)}
                >
                  <option value="" disabled>Selecione um tipo</option>
                  <option value="ENTRADA">Entrada</option>
                  <option value="SAIDA">Saída</option>
                </SelectField>
              </InputTipo>

              <InputValor>
                <InputLabel htmlFor="valor">Valor</InputLabel>
                <InputField
                  id="valor"
                  type="number"
                  step="any"
                  name="valor"
                  placeholder="Ex: 1500,00"
                  required
                  value={valorTransacao}
                  onChange={(e) => setValorTransacao(e.target.value)}
                />
              </InputValor>
            </InputsContainer>

            <MensagensContainer>
              {success && <MensagemSucesso>{success}</MensagemSucesso>}
              {error && <MensagemErro>{error}</MensagemErro>}
            </MensagensContainer>

            <BotoesContainer>
              <BotaoAcao type="button" onClick={() => navigate("/transacoes")}>
                Cancelar
              </BotaoAcao>
              <BotaoAcao type="button" onClick={handleCadastroTransacao}>
                Cadastrar Transação
              </BotaoAcao>
            </BotoesContainer>
          </CadastroForm>
        </CadastroTransacaoContainer>
      </DashboardMainCadastro>
    </DashBoardContainer>
  );
};

export default CadastroTransacao;