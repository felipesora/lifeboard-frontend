import Logo from "../../assets/images/logo-lifeboard-azul.png";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { cadastro } from "./services/cadastroService";
import { ContainerCadastro, LinkPaginaLogin, MensagemCadastro, SecaoCadastro } from "./styles";

const Cadastro = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const handleCadastro = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (senha.length < 6) {
            setError("A senha deve ter no mínimo 6 caracteres.");
            setSuccess("");
            return;
        }

        if (senha !== confirmarSenha) {
            setError("As senhas devem ser iguais.");
            setSuccess("");
            return;
        }

        try {
            await cadastro({ nome, email, senha });
            setError("");
            setSuccess("Cadastro realizado com sucesso!");


            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (erro) {
            console.log(erro);

            if (erro instanceof Error) {
                if (erro.message.includes("ORA-00001") ||erro.message.includes("restrição exclusiva")) {
                    setError("Este email já está cadastrado. Tente outro.");
                } else {
                    setError("Erro ao realizar o cadastro. Tente novamente.");
                }
            } else {
                setError("Erro desconhecido. Tente novamente.");
            }

            setSuccess("");
        }
    }

    return (
        <ContainerCadastro>
            <img src={Logo} alt="Logo do LifeBoard" />
            <SecaoCadastro>
                <div className="cadastro_conteudo">
                    <h1>Bem-vindo ao LifeBoard</h1>
                    <p>Cadastre-se para acessar o painel de gestão</p>
                </div>

                <form onSubmit={handleCadastro}>

                    <div>
                        <label htmlFor="">Nome Completo</label>
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                            required
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            required
                            onChange={(e) => setSenha(e.target.value)}
                            value={senha}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Confirmar senha</label>
                        <input
                            type="password"
                            placeholder="Confirme sua senha"
                            required
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            value={confirmarSenha}
                        />
                    </div>

                    <div>
                        <button type="submit">Cadastrar</button>
                    </div>

                </form>

                <MensagemCadastro>
                    {success && <p className="sucesso">{success}</p>}
                    {error && <p className="erro">{error}</p>}
                </MensagemCadastro>

                <LinkPaginaLogin>
                    <p className="link">Já possui uma conta? <button onClick={() => navigate("/login")}>Entrar</button></p>
                </LinkPaginaLogin>
            </SecaoCadastro>
        </ContainerCadastro>
    )
}

export default Cadastro;