import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <p>06.11.21.10.43</p>
            <p>Copyright TheoCorre @2024 - <Link to="/ML">Mentions légales</Link></p>
            <p>theocorrephotography@gmail.com</p>
        </footer>
    );
};

export default Footer;