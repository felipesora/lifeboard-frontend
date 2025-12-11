import { useState } from "react";
import IconeMenu from "../../assets/images/icone-menu.png";
import Logo from "../../assets/images/logo-lifeboard-branca.png";
import { CabecalhoContainer } from "./styles";
import MenuHamburger from "./components/MenuHamburger";

const Cabecalho = () => {

    const [menuAberto, setMenuAberto] = useState<boolean>(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <CabecalhoContainer>
            <div className="logo">
                <img src={Logo} alt="Logo LifeBoard" />
                <h1>LifeBoard</h1>
            </div>

            <div>
                <button className="btn_menu_hamburger" onClick={toggleMenu}>
                    <img src={IconeMenu} alt="Icone de menu" />
                </button>
            </div>

            <div className={`menu_hamburguer ${menuAberto ? "ativo" : ""}`}>
                <MenuHamburger toggleMenu={toggleMenu} />
            </div>

            {/* Overlay (fundo escuro) */}
            {menuAberto && <div className="overlay" onClick={toggleMenu}></div>}
        </CabecalhoContainer>
    )
}

export default Cabecalho;