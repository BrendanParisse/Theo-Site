import React from 'react';
import Theo from '../../../Assets/Images/Photos/Photo_Theo.avif';

const MentionsLegales = () => {
    return (
        <section className="mentions-legales">
            <img
                className={`backgroundimg`}
                src={Theo}
                alt="background"
            />
            <div className="container">
                <div className='Block_texte'>
                    <h1>Mentions Légales</h1>
                    <p>Ce site est édité par theocorrephotography.</p>
                    <p>Téléphone : 06.11.21.10.43</p>
                    <p>Email : theocorrephotography@gmail.com</p>

                    <h2>Propriété intellectuelle</h2>
                    <p>Tous les contenus présents sur ce site sont protégés par le droit d'auteur. Toute reproduction, même partielle, est strictement interdite.</p>

                    <h2>Protection des données personnelles</h2>
                    <p>Aucune donnée personnelle n'est collectée sur ce site.</p>

                    <h2>Responsabilité</h2>
                    <p>L'entreprise ne peut être tenue responsable de tout dommage direct ou indirect résultant de l'utilisation de ce site web.</p>

                    <h2>Modification des mentions légales</h2>
                    <p>L'entreprise se réserve le droit de modifier les présentes mentions légales à tout moment. Il est donc conseillé de les consulter régulièrement.</p>
                </div>
            </div>
        </section>
    );
}

export default MentionsLegales;