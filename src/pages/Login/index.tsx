import Logo from "../../assets/images/logo-lifeboard-azul.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { login } from './services/loginService';
import { isTokenValid } from '../../services/authService';
import { BotaoLogo, ContainerLogin, LinkPaginaCadastro, LoginButton, MensagemLogin, SecaoLogin } from './styles';

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
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(email, senha);
            navigate('/controle-financeiro');
        } catch (erro) {
            console.log(erro);
            setError('Email ou senha inválidos.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <ContainerLogin>
            <BotaoLogo onClick={() => navigate('/')}>
                <img src={Logo} alt="Logo do LifeBoard" />
            </BotaoLogo>

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
                            disabled={loading}
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
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <LoginButton 
                            type="submit" 
                            $loading={loading}
                            disabled={loading || !email || !senha}
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </LoginButton>
                    </div>
                </form>

                <MensagemLogin>
                    {error && <p className="erro">{error}</p>}
                </MensagemLogin>

                <LinkPaginaCadastro>
                    <p className="link">Ainda não possui uma conta? 
                        <button 
                            onClick={() => navigate("/cadastro")}
                            disabled={loading}
                        >
                            Cadastre-se
                        </button>
                    </p>
                </LinkPaginaCadastro>
            </SecaoLogin>
        </ContainerLogin>
    )
}

export default Login;