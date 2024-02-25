import { NavLink } from 'react-router-dom';

const Not404 = () => {
    return (
        <section className="SectionNot404">
            <h1> 404 </h1>
            <p>Oups! La page que vous demandez n'existe pas.</p>
            <NavLink to="/Accueil">Retourner sur la page d'accueil</NavLink>
        </section>
    );
}

export default Not404