
import { ContainerCardTransacao } from "./styles";

interface CardTrasacaoProps {
    corFundo: string;
    corTexto: string;
    titulo: string;
    data: string;
    valor: string;
    descricao: string;
}

const CardTrasacao = ({ corFundo, corTexto, titulo, data, valor, descricao }: CardTrasacaoProps) => {

    return (
        <ContainerCardTransacao style={{ backgroundColor: corFundo }}>
            <h1 style={{ color: corTexto }}>{titulo} - {data}</h1>
            <h2 style={{ color: corTexto }}>{valor}</h2>
            <p>{descricao}</p>
        </ContainerCardTransacao>
    )
}

export default CardTrasacao;