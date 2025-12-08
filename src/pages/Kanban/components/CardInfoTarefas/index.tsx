import {
  CardTarefaContainer,
  CardTarefaContent,
  CardTarefaCabecalho,
  IconeCard,
  TituloCard,
  CardTarefaConteudo,
  DescricaoCard,
  QuantidadeCard
} from "./styles";

interface CardInfoTarefasProps {
  icone: string;
  titulo: string;
  cor: string;
  descricao: string;
  quantidade: number;
}

const CardInfoTarefas = ({ 
  icone, 
  titulo, 
  cor, 
  descricao, 
  quantidade 
}: CardInfoTarefasProps) => {
  return (
    <CardTarefaContainer>
      <CardTarefaContent>
        <CardTarefaCabecalho>
          <IconeCard src={icone} alt="Ícone do card" />
          <TituloCard>{titulo}</TituloCard>
        </CardTarefaCabecalho>

        <CardTarefaConteudo>
          <DescricaoCard cor={cor}>{descricao}</DescricaoCard>
          <QuantidadeCard cor={cor}>{quantidade}</QuantidadeCard>
        </CardTarefaConteudo>
      </CardTarefaContent>
    </CardTarefaContainer>
  );
};

export default CardInfoTarefas;