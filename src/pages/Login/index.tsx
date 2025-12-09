import Logo from "../../assets/images/logo-lifeboard-azul.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { login } from './services/loginService';
import { isTokenValid } from '../../services/authService';
import { ContainerLogin, LinkPaginaCadastro, MensagemLogin, SecaoLogin } from './styles';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isTokenValid()) {
            navigate('/controle-financeiro');
        }
    }, [navigate]);

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await login(email, senha);

            setError('');
            navigate('/controle-financeiro');

        } catch (erro) {
            console.log(erro);
            setError('Email ou senha inválidos.');
        }
    }

    return (
        <ContainerLogin>
            <img src={Logo} alt="Logo do LifeBoard" />

            <SecaoLogin>
                <div className="login_conteudo">
                    <h1>Bem-Vindo de volta</h1>
                    <p>Entre com sua conta</p>
                </div>

                <form onSubmit={handleLogin}>
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
                        <button type="submit">Entrar</button>
                    </div>

                </form>

                <MensagemLogin>
                    {error && <p className="erro">{error}</p>}
                </MensagemLogin>

                <LinkPaginaCadastro>
                    <p className="link">Ainda não possui uma conta? <button onClick={() => navigate("/cadastro")}>Cadastre-se</button></p>
                </LinkPaginaCadastro>

            </SecaoLogin>
        </ContainerLogin>
    )
}

export default Login;
