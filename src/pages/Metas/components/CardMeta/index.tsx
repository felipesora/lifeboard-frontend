import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CardMetaContainer,
  CardMetaCabecalho,
  IconeMeta,
  NomeMeta,
  ContainerMenu,
  BotaoMenuVertical,
  MenuMetaDropdown,
  MenuItem,
  CardMetaDataLimite,
  BarraProgressoContainer,
  BarraProgresso,
  ProgressoFill
} from './styles';
import IconeMenuVertical from "../../../../assets/images/icone-menu-vertical.png";

interface CardMetaProps {
  valorAtualNum: number;
  valorMetaNum: number;
  idMeta: number;
  iconeMeta: string;
  nomeMeta: string;
  onAdicionarSaldo: (idMeta: number) => void;
  onRetirarSaldo: (idMeta: number) => void;
  onDeletar: (idMeta: number) => void;
  valorAtual: string;
  valorMeta: string;
  dataLimite: string;
}

const CardMeta = ({ 
  dataLimite, 
  iconeMeta, 
  idMeta, 
  nomeMeta, 
  onAdicionarSaldo, 
  onDeletar, 
  onRetirarSaldo, 
  valorAtual, 
  valorAtualNum, 
  valorMeta, 
  valorMetaNum 
}: CardMetaProps) => {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const progresso = Math.min(
    (valorAtualNum / valorMetaNum) * 100,
    100
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
      }
    }

    if (menuAberto) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAberto]);

  const handleEditar = () => {
    navigate(`/editar-meta/${idMeta}`);
    setMenuAberto(false);
  };

  const handleAdicionarSaldo = () => {
    onAdicionarSaldo(idMeta);
    setMenuAberto(false);
  };

  const handleRetirarSaldo = () => {
    onRetirarSaldo(idMeta);
    setMenuAberto(false);
  };

  const handleDeletar = () => {
    onDeletar(idMeta);
    setMenuAberto(false);
  };

  return (
    <CardMetaContainer>
      <CardMetaCabecalho>
        <div>
          <IconeMeta src={iconeMeta} alt="Ícone da Meta" />
          <NomeMeta>{nomeMeta}</NomeMeta>
        </div>

        <ContainerMenu>
          <BotaoMenuVertical onClick={() => setMenuAberto(!menuAberto)}>
            <img src={IconeMenuVertical} alt="Ícone menu vertical" />
          </BotaoMenuVertical>

          {menuAberto && (
            <MenuMetaDropdown ref={menuRef}>
              <MenuItem onClick={handleAdicionarSaldo}>
                Adicionar Saldo
              </MenuItem>

              <MenuItem onClick={handleRetirarSaldo}>
                Retirar Saldo
              </MenuItem>

              <MenuItem onClick={handleEditar}>
                Editar
              </MenuItem>

              <MenuItem onClick={handleDeletar}>
                Deletar
              </MenuItem>
            </MenuMetaDropdown>
          )}
        </ContainerMenu>
      </CardMetaCabecalho>

      <p>{valorAtual} | {valorMeta}</p>

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
  );
};

export default CardMeta;