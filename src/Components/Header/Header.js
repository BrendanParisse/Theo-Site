import { NavLink } from 'react-router-dom';
import Logo from './../../Assets/Images/Photos/Logo.png'
import FbNoir from './../../Assets/Images/Facebook_Black.png';
import InstaNoir from './../../Assets/Images/Insta_Black.png';

const Header = () => {
    return (
        <header>
            <NavLink to="/Accueil" className="Container_Logo">
                <img src={Logo} className='Logo' alt='Logo'></img>
            </NavLink>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/Accueil" className="elmenu">ACCUEIL</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Apropos" className="elmenu">A PROPOS</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Galerie" className="elmenu">GALERIE</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Service" className="elmenu">SERVICE</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Contact" className="elmenu">CONTACT</NavLink>
                    </li>

                </ul>
            </nav>
            <div className='Reseaux'>
                <NavLink to="https://www.instagram.com/theo_corre_photography/" className="elreseaux"><img src={InstaNoir} alt="LogoInsta" /></NavLink>
                <NavLink to="https://www.facebook.com/theocorrephotography" className="elreseaux"><img src={FbNoir} alt="LogoFb" /></NavLink>
            </div>
        </header >
    );
};
export default Header;


