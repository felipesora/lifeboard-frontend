import { ContainerCardDemonstracao } from './styled';

interface CardDemonstracaoPaginaProps {
    imagem: string;
    descricao: string;
    texto: string;
}

const CardDemonstracaoPagina = ({ imagem, descricao, texto }: CardDemonstracaoPaginaProps) => {
    return (
        <ContainerCardDemonstracao>

            <div>
                <img className='imagem_demonstracao' src={imagem} alt={descricao} />
            </div>

            <div className='conteudo_demonstracao'>
                <p>{texto}</p>
            </div>
        </ContainerCardDemonstracao>
    )
}

export default CardDemonstracaoPagina;