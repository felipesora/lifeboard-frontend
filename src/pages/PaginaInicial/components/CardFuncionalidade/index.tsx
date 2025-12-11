import { ContainerCardFuncionalidade } from './styles';

interface CardFuncionalidadeProps {
    imagem: string;
    altImagem: string;
    titulo: string;
    texto: string
}

const CardFuncionalidade = ({ imagem, altImagem, titulo, texto }: CardFuncionalidadeProps) => {
    return (
        <ContainerCardFuncionalidade>
            <div className="imagem_funcionalidade">
                <img src={imagem} alt={altImagem} />
            </div>

            <div className='conteudo_card'>
                <h4>{titulo}</h4>
                <p>{texto}</p>
            </div>
        </ContainerCardFuncionalidade>
    )
}

export default CardFuncionalidade;