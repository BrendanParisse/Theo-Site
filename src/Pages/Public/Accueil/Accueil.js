import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Zoom from '../../../Assets/Images/Agrandir.png';
import { ApiDataAccueil } from '../../../_Services/APIService.js';

const Accueil = () => {
    const navigate = useNavigate(); // Get the navigate function from react-router
    const [images, setImages] = useState([]);
    const [titles, setTitles] = useState({});
    const [subtitles, setSubtitles] = useState({});
    const [categories, setCategories] = useState({});
    const [currentImageData, setCurrentImageData] = useState(null);

    const fetchData = async () => {
        try {
            const apiData = await ApiDataAccueil();
            console.log(apiData);
            if (apiData && apiData.data) {
                const imageTitles = {};
                const imageSubtitles = {};
                const imageCategories = {};
                apiData.data.forEach(entry => {
                    entry.attributes.Banniere.data.forEach(banniere => {
                        const imageId = banniere.id;
                        const title = entry.attributes.Titre;
                        const subtitle = entry.attributes.SousTitre;
                        const category = entry.attributes.theo_categorie.data.attributes.Categorie;

                        imageTitles[imageId] = title;
                        imageSubtitles[imageId] = subtitle;
                        imageCategories[imageId] = category;
                    });
                });

                const imageUrls = apiData.data.map(entry => {
                    return entry.attributes.Banniere.data.map(banniere => {
                        return {
                            id: banniere.id,
                            url: `https://my-strapi.kevinlebot.com${banniere.attributes.url}`
                        };
                    });
                }).flat();
                setImages(imageUrls);
                setTitles(imageTitles);
                setSubtitles(imageSubtitles);
                setCategories(imageCategories);
                setCurrentImageData(imageUrls[imageUrls.length - 1]);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'API', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const bannerImgRef = useRef(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleClick = (index) => {
        const newImages = [...images];
        const hoveredImage = newImages.splice(index, 1)[0];
        newImages.push(hoveredImage);
        setImages(newImages);
        setCurrentImageData(hoveredImage);
    };

    const handleGalerieClick = () => {
        navigate('/galerie', { state: { selectedCategory: categories[currentImageData.id] } });
    };

    const handleServiceClick = () => {
        navigate('/service', { state: { selectedCategory: categories[currentImageData.id] } });
    };

    useEffect(() => {
        const PreviousImage = document.querySelector('.Imageprécédente');
        const backgroundImgElement = document.querySelector('.backgroundimg');
        const backgroundImgElement1 = document.querySelector('.backgroundimg_1');
        const titreanimation = document.querySelector('h2');

        if (bannerImgRef.current) {
            bannerImgRef.current.classList.add('animation');
            PreviousImage.classList.add('animation-1');
            backgroundImgElement.classList.add('background-animation');
            backgroundImgElement1.classList.add('background-animation_1');
            titreanimation.classList.add('show');

            bannerImgRef.current.addEventListener('animationend', () => {
                bannerImgRef.current.classList.remove('animation');
                PreviousImage.classList.remove('animation-1');
                backgroundImgElement.classList.remove('background-animation');
                backgroundImgElement1.classList.remove('background-animation_1');
                titreanimation.classList.remove('show');
            });
        }
    }, [currentImageData]);

    return (
        <section className="SectionHome">
            <h1>TheoCorre - Photography</h1>
            <div className="Bannière">
                <img className="backgroundimg_1 " src={images[images.length - 2]?.url} alt="background" />
                <img className="backgroundimg " src={currentImageData?.url} alt="background" />
                <div className='background_menu'>
                    <h2>
                        {currentImageData ? categories[currentImageData.id] : ""}
                    </h2>
                    <img
                        className={`bannerimg PrevBanner Imageprécédente`}
                        src={images[images.length - 2]?.url}
                        alt="ImageBanner"
                    />
                    <img
                        ref={bannerImgRef}
                        className={`bannerimg CurrBanner`}
                        src={currentImageData?.url}
                        alt="ImageBanner"
                    />
                    <div className='btn'>
                        <button href="#" className='galerie' onClick={handleGalerieClick}>Galerie</button>
                        <button className='service' onClick={handleServiceClick}>Services</button>
                    </div>
                    <div className='description'>
                        <h3>{currentImageData ? titles[currentImageData.id] : ""}</h3>
                        <h4>{currentImageData ? subtitles[currentImageData.id] : ""}</h4>
                    </div>
                </div>
                <div className="Photos" >
                    {images.map((img, index) => (
                        <div key={index} className={`image-container image-container-${index + 1}`}>
                            {index !== images.length - 1 && (
                                <img
                                    src={Zoom}
                                    alt="Zoom"
                                    onClick={() => handleClick(index)}
                                    className={`zoom-logo ${hoveredIndex === index ? 'show' : ''}`}
                                    onMouseEnter={(e) => {
                                        e.stopPropagation();
                                        handleMouseEnter(index);
                                    }}
                                />
                            )}
                            <img
                                src={img.url}
                                alt="ImageBanner"
                                onClick={() => handleClick(index)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                className={`photo photo-${index} ${hoveredIndex === index ? 'hovered ' : ''
                                    }${hoveredIndex !== null && hoveredIndex !== index ? 'grayscale' : ''}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Accueil;