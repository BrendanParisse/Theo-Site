import React, { useState, useEffect } from 'react';
import { ApiDataApropos } from '../../../_Services/APIService.js';

const Apropos = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [applyAnimation] = useState(true);

    const fetchData = async () => {
        try {
            const apiData = await ApiDataApropos();
            if (apiData && apiData.data && apiData.data.length > 0) {
                const imageUrl = `https://my-strapi.kevinlebot.com${apiData.data[0].attributes.Photo.data.attributes.url}`;
                setCurrentImageUrl(imageUrl);
                const descriptionText = apiData.data[0].attributes.Description;
                setDescription(descriptionText);
                const titleText = apiData.data[0].attributes.Titre;
                setTitle(titleText);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'API', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <section className="SectionApropos">
            <img
                className={`backgroundimg background_current ${applyAnimation ? 'background-animation' : ''}`}
                src={currentImageUrl}
                alt="background"
            />
            <div className='Container_Apropos'>
                <div className='Apropos'>
                    <div className='Block_Texte'>
                        <h2>{title}</h2>
                        {description.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                    <div className='Block_Img'>
                        <img className='Photo_Theo' src={currentImageUrl} alt="PhotoBrendan" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Apropos;