import IconeMenuVertical from "../../../../assets/images/icone-menu-vertical.png"
import { useEffect, useRef, useState } from "react";
import { ContainerCardPequeno } from "./styles";

interface CardPequenoProps {
    onAbrirModal?: () => void;
    icone: string;
    descricao: string;
    titulo: string;
    mostrarMenu?: boolean;
    cor: string;
    valor: string;
}

const CardPequeno = ({ onAbrirModal, icone, descricao, titulo, mostrarMenu, cor, valor }: CardPequenoProps) => {
    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    }

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

    const handleDefinirSalario = () => {
        setMenuAberto(false);
        if (onAbrirModal) {
            onAbrirModal(); // Notifica o componente pai
        }
    };

    return (
        <ContainerCardPequeno>
            <div>
                <div>
                    <img src={icone} alt={descricao} />
                    <p>{titulo}</p>
                </div>
                {mostrarMenu && (
                    <div className="menu_container" ref={menuRef}>
                        <button onClick={toggleMenu}>
                            <img src={IconeMenuVertical} alt="Icone de três pontos" />
                        </button>

                        {menuAberto && (
                            <div className="menu_suspenso">
                                <button onClick={handleDefinirSalario}>Definir Salário</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <h3 style={{ color: cor }}>{valor}</h3>

        </ContainerCardPequeno>
    )
}

export default CardPequeno;
