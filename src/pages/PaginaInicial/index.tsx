import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LogoAzul from '../../assets/images/logo-lifeboard-azul.png';
import LogoBranca from '../../assets/images/logo-lifeboard-branca.png';
import { useNavigate } from 'react-router-dom';
import LogoGithub from '../../assets/images/icone-github.png';
import LogoLinkedin from '../../assets/images/icone-linkedIn.png';
import LogoEmail from '../../assets/images/icone-email.png';
import ImagemDashboard from '../../assets/images/imagem-dashboard.png';
import CardFuncionalidade from "./components/CardFuncionalidade";
import CardDemonstracaoPagina from "./components/CardDemonstracaoPagina";
import { demonstracoes, funcionalidades } from "./dadosPaginaInicial";
import { Cabecalho, ContainerPaginaInicial, Rodape, SecaoApresentacao, SecaoDemonstracoes, SecaoFuncionalidades } from "./styles";

const PaginaInicial = () => {
    const navigate = useNavigate();

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <ContainerPaginaInicial>

            <Cabecalho id="cabecalho">
                <img src={LogoAzul} alt="Logo da lifeboard" />

                <div>
                    <button className='btn btn_entrar' onClick={() => navigate("/login")}>Fazer Login</button>
                    <button className='btn btn_cadastrar' onClick={() => navigate("/cadastro")}>Cadastrar-se</button>
                </div>
            </Cabecalho>

            <main>
                <SecaoApresentacao>
                    <div>
                        <h1>Controle suas finanças e produtividade de forma inteligente</h1>
                        <h2>Organize suas finanças, tarefas e metas em um único painel interativo.</h2>
                        <div className='secao_apresentacao_botoes'>

                            <button className='btn btn_comecar' onClick={() => navigate("/cadastro")}>
                                Comece agora
                            </button>

                            <button className='btn btn_funcionalidades' onClick={() => scrollToSection('funcionalidades')}>
                                Ver funcionalidades
                            </button>
                        </div>
                    </div>

                    <img src={ImagemDashboard} alt="Imagem de um dashboard" />
                </SecaoApresentacao>

                <SecaoFuncionalidades id="funcionalidades">
                    <div>
                        <h2>Funcionalidades do LifeBoard</h2>
                        <h3>Explore todas as ferramentas para organizar finanças, tarefas e metas de forma prática.</h3>
                    </div>

                    <div className='cards_funcionalidades'>

                        {funcionalidades.map((funcionalidade, index) => (
                            <CardFuncionalidade
                                key={index}
                                imagem={funcionalidade.imagem}
                                altImagem={funcionalidade.alt}
                                titulo={funcionalidade.titulo}
                                texto={funcionalidade.texto}
                            />
                        ))}

                    </div>

                    <div className='botao_funcionalidades'>
                        <button onClick={() => navigate("/cadastro")}>
                            Experimente Gratuitamente
                        </button>
                    </div>
                </SecaoFuncionalidades>

                <SecaoDemonstracoes>

                    <div>
                        <h2>Demonstração do LifeBoard</h2>
                        <h3>Explore as telas e funcionalidades do nosso painel de controle.</h3>
                    </div>

                    <div className='cards_demonstracoes'>

                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation={true}
                            pagination={{ clickable: true }}
                            loop={true}
                            className="carrossel_demonstracoes"
                        >

                            {demonstracoes.map((demonstracao, index) => (
                                <SwiperSlide key={index}>
                                    <CardDemonstracaoPagina
                                        imagem={demonstracao.imagem}
                                        descricao={demonstracao.descricao}
                                        texto={demonstracao.texto}
                                    />
                                </SwiperSlide>
                            ))}

                        </Swiper>

                    </div>

                </SecaoDemonstracoes>

                <Rodape>
                    <div className="logo">
                        <button onClick={() => scrollToSection('cabecalho')}>
                            <img src={LogoBranca} alt="Logo" />
                            <p>LifeBoard</p>
                        </button>
                        
                    </div>

                    <hr />

                    <div className="conteudo_rodape">
                        <p>© 2025 LifeBoard. Todos os direitos reservados.</p>

                        <div className="div_links">
                            <div>
                                <a href="https://github.com/felipesora" target="_blank">
                                    <img src={LogoGithub} alt="Icone Github" />
                                </a>
                            </div>

                            <div>
                                <a href="https://www.linkedin.com/in/felipesora/" target="_blank">
                                    <img src={LogoLinkedin} alt="Icone Linkedin" />
                                </a>
                            </div>

                            <div>
                                <a href="mailto:felipeusora@gmail.com" target="_blank">
                                    <img src={LogoEmail} alt="Icone Email" />
                                </a>
                            </div>
                        </div>
                    </div>
                </Rodape>

            </main>
        </ContainerPaginaInicial>
    )
}

export default PaginaInicial;