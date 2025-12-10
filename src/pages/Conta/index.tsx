import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DashBoardContainer,
  DashboardMainConta,
  ContaContainer,
  DadosConta,
  FotoPerfilContainer,
  FotoPerfilConteudo,
  FotoPerfil,
  BotaoEditarFoto,
  BotaoRemoverFoto,
  InputFotoPerfil,
  ContainerEditarConta,
  FormEditarConta,
  InputEditarConta,
  InputLabel,
  InputField,
  MensagensContainer,
  MensagemSucesso,
  MensagemErro,
  BotaoEditarConta,
  BotaoSalvar,
  BotaoExcluirContaContainer,
  BotaoExcluirConta
} from './styles';

import MenuLateral from '../../components/MenuLateral';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import ModalDeletarConta from './components/ModalDeletarConta';
import Cabecalho from "../../components/Cabecalho";
import FotoPefilPadrao from "../../assets/images/foto-perfil-padrao.png";
import IconeEditarFoto from "../../assets/images/icone-editar-foto-perfil.png";
import IconeRemoverFoto from "../../assets/images/icone-remover-foto-perfil.png";
import { atualizarFotoPefil, deletarUsuario, editarDadosUsuario, obterDadosUsuario, obterFotoPerfil, removerFotoPerfil } from '../../services/usuarioService';
import LoadingTelaCheia from '../../components/LoadingTelaCheia';

const Conta = () => {
  useAuthRedirect();
  const navigate = useNavigate();

  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [nomeEditar, setNomeEditar] = useState<string>('');
  const [emailEditar, setEmailEditar] = useState<string>('');
  const [senhaEditar, setSenhaEditar] = useState<string>('');
  const [senhaConfirmarEditar, setSenhaConfirmarEditar] = useState<string>('');
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [modalContaAberto, setModalContaAberto] = useState<boolean>(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState<string>('');

  useEffect(() => {
    const fetchDadosUsuario = async () => {
      try {
        setLoadingFetch(true);
        const id = localStorage.getItem("userId");
        if (!id) {
          throw new Error("ID do usuário não encontrado");
        }

        const usuario = await obterDadosUsuario(Number(id));
        setNome(usuario.nome);
        setEmail(usuario.email);
        setNomeEditar(usuario.nome);
        setEmailEditar(usuario.email);
      } catch (erro) {
        console.error("Erro ao obter dados do usuário:", erro);
      } finally {
        setLoadingFetch(false);
      }
    };

    fetchDadosUsuario();
  }, []);

  useEffect(() => {
    const fetchFotoPerfil = async () => {
      try {
        setLoadingFetch(true);

        const blob = await obterFotoPerfil();

        if (blob instanceof Blob && blob.size > 0) {
          const objectUrl = URL.createObjectURL(blob);
          setFotoPerfil(objectUrl);
        } else {
          setFotoPerfil(FotoPefilPadrao);
        }
      } catch (error) {
        console.error("Erro ao carregar foto de perfil:", error);
        setFotoPerfil(FotoPefilPadrao);
      } finally {
        setLoadingFetch(false);
      }
    };

    fetchFotoPerfil();
  }, []);

  useEffect(() => {
    return () => {
      if (fotoPerfil && fotoPerfil.startsWith('blob:')) {
        URL.revokeObjectURL(fotoPerfil);
      }
    };
  }, [fotoPerfil]);

  const handleAtualzarFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (fotoPerfil && fotoPerfil.startsWith('blob:')) {
      URL.revokeObjectURL(fotoPerfil);
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoadingFetch(true);
      await atualizarFotoPefil(formData);
      const novaImagem = URL.createObjectURL(file);
      setFotoPerfil(novaImagem);
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
    } finally {
      setLoadingFetch(false);
    }
  };

  const handleRemoverFoto = async () => {
    try {
      setLoadingFetch(true);
      if (fotoPerfil && fotoPerfil.startsWith('blob:')) {
        URL.revokeObjectURL(fotoPerfil);
      }

      await removerFotoPerfil();
      setFotoPerfil(FotoPefilPadrao);
    } catch (error) {
      console.error("Erro ao remover foto: ", error);
    } finally {
      setLoadingFetch(false);
    }
  };

  const handleEditarConta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    if (!nomeEditar || !emailEditar || !senhaEditar || !senhaConfirmarEditar) {
      setError("Preencha todos os campos.");
      setSuccess("");
      return;
    }

    if (senhaEditar.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      setSuccess("");
      return;
    }

    if (senhaEditar !== senhaConfirmarEditar) {
      setError("As senhas devem ser iguais.");
      setSuccess("");
      return;
    }

    const dados = {
      nome: nomeEditar,
      email: emailEditar,
      senha: senhaEditar
    };

    try {
      setLoading(true);
      const id = localStorage.getItem("userId");
      if (!id) {
        throw new Error("ID do usuário não encontrado");
      }

      await editarDadosUsuario(Number(id), dados);

      setError("");
      setSuccess("Dados atualizados com sucesso!");

      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (erro) {
      console.log(erro);
      setError("Erro ao editar os dados. Tente novamente.");
      setSuccess("");
    } finally {
      setLoading(true);
    }
  };

  const handleDeletarConta = async () => {
    if (confirmarExclusao.toLowerCase() !== "excluir conta") {
      alert("Você precisa digitar exatamente: excluir conta");
      return;
    }

    try {
      setLoadingFetch(true);
      const id = localStorage.getItem("userId");
      if (!id) {
        throw new Error("ID do usuário não encontrado");
      }

      await deletarUsuario(Number(id));
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      alert("Erro ao deletar conta. Tente novamente.");
    } finally {
      setLoadingFetch(false);
    }
  };

  const handleFotoError = () => {
    setFotoPerfil(FotoPefilPadrao);
  };

  return (
    <>
      <LoadingTelaCheia carregando={loadingFetch}/>

      <DashBoardContainer $carregando={loadingFetch}>
        <Cabecalho />
        <MenuLateral />
        <DashboardMainConta>
          <p>Minha Conta</p>

          <ContaContainer>
            <DadosConta>
              <FotoPerfilContainer>
                {fotoPerfil ? (
                  <FotoPerfilConteudo>
                    <FotoPerfil 
                      src={fotoPerfil} 
                      alt="Foto de perfil" 
                      onError={handleFotoError}
                    />

                    <BotaoEditarFoto htmlFor="inputFotoPerfil" title="Atualizar Foto de Perfil">
                      <img src={IconeEditarFoto} alt="Ícone de editar" />
                    </BotaoEditarFoto>

                    <InputFotoPerfil
                      type="file"
                      id="inputFotoPerfil"
                      accept="image/*"
                      onChange={handleAtualzarFoto}
                    />

                    <BotaoRemoverFoto 
                      onClick={handleRemoverFoto} 
                      title="Remover Foto de Perfil"
                      type="button"
                    >
                      <img src={IconeRemoverFoto} alt="ícone de remover foto" />
                    </BotaoRemoverFoto>
                  </FotoPerfilConteudo>
                ) : (
                  <FotoPerfilConteudo>
                    <FotoPerfil 
                      src={FotoPefilPadrao} 
                      alt="Foto de perfil padrão" 
                    />
                    <p>Carregando imagem...</p>
                  </FotoPerfilConteudo>
                )}
              </FotoPerfilContainer>

              <div>
                <p>Nome: <span>{nome}</span></p>
              </div>

              <div>
                <p>Email: <span>{email}</span></p>
              </div>

              <div>
                <p>Senha: <span>********</span></p>
              </div>
            </DadosConta>  

            <ContainerEditarConta>
              <h2>Quer editar seus dados?</h2>

              <FormEditarConta onSubmit={handleEditarConta}>
                <InputEditarConta>
                  <InputLabel htmlFor="nome">Nome:</InputLabel>
                  <InputField
                    type="text"
                    id="nome"
                    value={nomeEditar}
                    onChange={(e) => setNomeEditar(e.target.value)}
                  />
                </InputEditarConta>

                <InputEditarConta>
                  <InputLabel htmlFor="email">Email:</InputLabel>
                  <InputField
                    type="email"
                    id="email"
                    value={emailEditar}
                    onChange={(e) => setEmailEditar(e.target.value)}
                  />
                </InputEditarConta>

                <InputEditarConta>
                  <InputLabel htmlFor="senha">Nova senha:</InputLabel>
                  <InputField
                    type="password"
                    id="senha"
                    value={senhaEditar}
                    onChange={(e) => setSenhaEditar(e.target.value)}
                  />
                </InputEditarConta>

                <InputEditarConta>
                  <InputLabel htmlFor="senhaCorfirmar">Confirmar senha:</InputLabel>
                  <InputField
                    type="password"
                    id="senhaCorfirmar"
                    value={senhaConfirmarEditar}
                    onChange={(e) => setSenhaConfirmarEditar(e.target.value)}
                  />
                </InputEditarConta>

                <MensagensContainer>
                  {success && <MensagemSucesso>{success}</MensagemSucesso>}
                  {error && <MensagemErro>{error}</MensagemErro>}
                </MensagensContainer>

                <BotaoEditarConta>
                  <BotaoSalvar type="submit" $loading={loading} disabled={loading}>{loading ? 'Salvando...' : 'Salvar Alterações'}</BotaoSalvar>
                </BotaoEditarConta>
              </FormEditarConta>
            </ContainerEditarConta>

            <BotaoExcluirContaContainer>
              <BotaoExcluirConta 
                type="button" 
                onClick={() => setModalContaAberto(true)}
              >
                Excluir Conta
              </BotaoExcluirConta>
            </BotaoExcluirContaContainer>
          </ContaContainer>

          <ModalDeletarConta
            aberto={modalContaAberto}
            onClose={() => setModalContaAberto(false)}
            onDelete={handleDeletarConta}
            confirmarExclusao={confirmarExclusao}
            setConfirmarExclusao={setConfirmarExclusao}
          />
        </DashboardMainConta>
      </DashBoardContainer>
    </>
  );
};

export default Conta;