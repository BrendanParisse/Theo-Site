import React, { useState, useEffect } from 'react';
import { ApiDataContact } from '../../../_Services/APIService.js';
import emailjs from 'emailjs-com';
import ContactForm from '../../../Components/Formulaire/Formulaire.js';

const Contact = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [currentImage, setCurrentImageUrl] = useState();
    const [applyAnimation, setApplyAnimation] = useState(true);

    const fetchData = async () => {
        try {
            const apiData = await ApiDataContact();
            if (apiData && apiData.data && apiData.data.length > 0) {
                const imageUrl = `http://localhost:1337${apiData.data[0].attributes.Photo.data.attributes.url}`;
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

    const [messageSent, setMessageSent] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_racv4je', 'template_kv64teu', e.target)
            .then((result) => {
                console.log('SUCCESS!', result.text);
                setMessageSent(true);
                e.target.reset();
            }, (error) => {
                console.log('FAILED...', error.text);
            });
    };

    return (
        <section className="SectionContact">
            <img
                className={`backgroundimg background_current ${applyAnimation ? 'background-animation' : ''}`}
                src={currentImage}
                alt="background"
            />
            <div className='Container_Contact'>
                <div className='Contact'>
                    <div className='Block_Img'>
                        <img className='Photo_Theo' src={currentImage} alt="PhotoTheo" />
                    </div>
                    <div className='infos'>
                        <div className='Block_Texte'>
                            <h2>{title}</h2>
                            {description.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <ContactForm sendEmail={sendEmail} />
                        {messageSent && <p>Message envoyé avec succés!</p>}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;