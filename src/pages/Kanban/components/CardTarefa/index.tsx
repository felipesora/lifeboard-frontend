import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CardTarefaColuna,
  CardTarefaCabecalho,
  PrioridadeBadge,
  ContainerMenu,
  BotaoMenu,
  CardTarefaConteudo,
  TituloTarefa,
  DescricaoTarefa,
  DataLimiteContainer,
  IconeData,
  TextoDataLimite,
  MenuTarefaDropdown,
  MenuMoverDropdown,
  MenuItem
} from "./styles";

import IconeDataImage from "../../../../assets/images/icone-tarefa-data-limite.png";
import IconeMenu from "../../../../assets/images/icone-menu-vertical.png";
import type { TarefaResponse } from "../../../../types/tarefa";

interface CardTarefaProps {
  tarefa: TarefaResponse;
  moverTarefa: (tarefa: TarefaResponse, novoStatus: string) => void;
  onDeletar: (id: number) => void;
  corFundo: string;
  corTexto: string;
  prioridade: string;
  titulo: string;
  descricao: string;
  data: string;
}

const CardTarefa = ({ 
  corFundo, 
  corTexto, 
  data, 
  descricao, 
  moverTarefa, 
  onDeletar, 
  prioridade, 
  tarefa, 
  titulo 
}: CardTarefaProps) => {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [menuMoverAberto, setMenuMoverAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const moverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clicouForaMenu = menuRef.current && !menuRef.current.contains(event.target as Node);
      const clicouForaMover = moverRef.current && !moverRef.current.contains(event.target as Node);

      if (menuAberto && clicouForaMenu) {
        setMenuAberto(false);
      }

      if (menuMoverAberto && clicouForaMover) {
        setMenuMoverAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAberto, menuMoverAberto]);

  const toggleMenu = () => {
    setMenuAberto((prev) => !prev);
    setMenuMoverAberto(false);
  };

  const abrirMover = () => {
    setMenuMoverAberto(true);
    setMenuAberto(false);
  };

  const moverPara = (novoStatus: string) => {
    moverTarefa(tarefa, novoStatus);
    setMenuAberto(false);
    setMenuMoverAberto(false);
  };

  const handleEditar = () => {
    navigate(`/editar-tarefa/${tarefa.id_tarefa}`, { 
      state: { from: "tarefas-quadro-kanban" } 
    });
    setMenuAberto(false);
  };

  const handleDeletar = () => {
    onDeletar(tarefa.id_tarefa);
    setMenuAberto(false);
  };

  const moverParaAFazer = () => moverPara("A_FAZER");
  const moverParaEmAndamento = () => moverPara("EM_ANDAMENTO");
  const moverParaConcluida = () => moverPara("CONCLUIDA");

  return (
    <CardTarefaColuna>
      <CardTarefaCabecalho>
        <PrioridadeBadge corFundo={corFundo} corTexto={corTexto}>
          <p>Prioridade {prioridade}</p>
        </PrioridadeBadge>

        <ContainerMenu>
          <BotaoMenu onClick={toggleMenu}>
            <img src={IconeMenu} alt="Ícone menu vertical" />
          </BotaoMenu>

          {menuAberto && (
            <MenuTarefaDropdown ref={menuRef}>
              <MenuItem onClick={abrirMover}>Mover</MenuItem>
              <MenuItem onClick={handleEditar}>Editar</MenuItem>
              <MenuItem onClick={handleDeletar}>Deletar</MenuItem>
            </MenuTarefaDropdown>
          )}

          {menuMoverAberto && (
            <MenuMoverDropdown ref={moverRef}>
              <MenuItem onClick={moverParaAFazer}>Para A Fazer</MenuItem>
              <MenuItem onClick={moverParaEmAndamento}>Para Em Andamento</MenuItem>
              <MenuItem onClick={moverParaConcluida}>Para Concluída</MenuItem>
            </MenuMoverDropdown>
          )}
        </ContainerMenu>
      </CardTarefaCabecalho>

      <CardTarefaConteudo>
        <TituloTarefa>{titulo}</TituloTarefa>
        <DescricaoTarefa>{descricao}</DescricaoTarefa>
        <DataLimiteContainer>
          <IconeData src={IconeDataImage} alt="Ícone calendário" />
          <TextoDataLimite>Data Limite: {data}</TextoDataLimite>
        </DataLimiteContainer>
      </CardTarefaConteudo>
    </CardTarefaColuna>
  );
};

export default CardTarefa;