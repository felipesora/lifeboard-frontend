import { BarraProgresso, BarraProgressoContainer, CardMetaCabecalho, CardMetaContainer, CardMetaDataLimite, ProgressoFill } from './styles';

interface CardMetaControleFinanceiroProps {
    valorAtualNum: number;
    valorMetaNum: number;
    iconeMeta: string;
    nomeMeta: string;
    dataLimite: string;
    valorAtual: string;
    valorMeta: string;
    idMeta: number;
}

const CardMetaControleFinanceiro = ({ valorAtualNum, valorMetaNum, iconeMeta, nomeMeta, dataLimite, valorAtual, valorMeta }: CardMetaControleFinanceiroProps) => {

    const progresso = Math.min(
        (valorAtualNum / valorMetaNum) * 100,
        100
    );

    return (
        <CardMetaContainer>

            <CardMetaCabecalho>
                <div>
                    <img src={iconeMeta} alt="Icone da Meta" />
                    <h3>{nomeMeta}</h3>
                </div>

            </CardMetaCabecalho>

            <p>{valorAtual} | {valorMeta}</p>

            {/* Barra de progresso */}
            <BarraProgressoContainer>
                <BarraProgresso>
                    <ProgressoFill progresso={progresso} />
                </BarraProgresso>
                <span>{progresso.toFixed(0)}%</span>
            </BarraProgressoContainer>

            <CardMetaDataLimite>
                <p>Até: {dataLimite}</p>
            </CardMetaDataLimite>

        </CardMetaContainer>
    )
}

export default CardMetaControleFinanceiro;
