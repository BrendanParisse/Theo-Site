import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SelectService from '../../../Components/Carrousel/SelectService.js';
import { ApiDataServices } from '../../../_Services/APIService.js';
import Description from '../../../Components/Description/Description.js';

const Service = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(location.state ? location.state.selectedCategory : "");



    const [urls, setUrls] = useState({});
    const [descriptions, setDescriptions] = useState([]);
    const [titles, setTitles] = useState([]);
    const [currentImage, setCurrentImage] = useState('');
    const [oldImage, setOldImage] = useState('');
    const [applyAnimation, setApplyAnimation] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [descriptionActive, setDescriptionActive] = useState(false);
    const [DetailsActive, setDetailsActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await ApiDataServices();
                console.log(apiData)
                if (apiData && apiData.data && apiData.data.length > 0) {
                    setDescriptions(apiData.data);
                    setTitles(apiData.data.map(item => item.attributes.Titre));

                    const updatedUrls = {};

                    apiData.data.forEach(item => {
                        const imageId = item.id;
                        const imageUrl = item.attributes.Photo.data[0].attributes.url;
                        const imageCategory = item.attributes.theo_categorie.data.attributes.Categorie;

                        updatedUrls[imageId] = { imageUrl: `http://localhost:1337${imageUrl}`, category: imageCategory };
                    });

                    setUrls(updatedUrls);

                    setCurrentImage(Object.values(updatedUrls)[0].imageUrl); // Prend la première image de la liste
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'API', error);
            }
        };

        fetchData();
    }, []);

    const handleCarouselClick = (imageId, index) => {
        setOldImage(currentImage);
        setCurrentImage(urls[imageId].imageUrl);
        setApplyAnimation(true);
        setHoveredIndex(index);
        setActiveIndex(index);
        setDescriptionActive(true);
        setDetailsActive(true);
    };

    const handleBackgroundAnimationEnd = () => {
        setApplyAnimation(false);
    };

    const handleDetailsAnimationEnd = () => {
        setDetailsActive(false);
    };

    useEffect(() => {
        if (location.state && location.state.selectedCategory) {
            const category = location.state.selectedCategory;
            const index = Object.values(urls).findIndex(item => item.category === category);
            if (index !== -1) {
                setCurrentImage(Object.values(urls)[index].imageUrl);
                setActiveIndex(index);
            }
        }
    }, [location.state, urls]);

    return (
        <section className={`SectionService ${descriptionActive ? 'description-active' : ''}`}>
            <img
                className={`backgroundimg_1 background_old ${applyAnimation ? 'background-animation_1' : ''}`}
                src={oldImage}
                alt="background"
                onAnimationEnd={handleBackgroundAnimationEnd}
            />
            <img
                className={`backgroundimg background_current ${applyAnimation ? 'background-animation' : ''}`}
                src={currentImage}
                alt="background"
                onAnimationEnd={handleBackgroundAnimationEnd}
            />
            <div className={`Container_Service ${descriptionActive ? 'description-active' : ''}`}>
                <div className='Service'>
                    <SelectService
                        urls={urls}
                        onCarouselClick={handleCarouselClick}
                        hoveredIndex={hoveredIndex}
                        activeIndex={activeIndex}
                        descriptionActive={descriptionActive}
                    />
                    <div id="Details" className={`Details ${DetailsActive ? 'Details-active' : ''}`} onAnimationEnd={handleDetailsAnimationEnd}>
                        <Description
                            title={titles[activeIndex]}
                            description={descriptions[activeIndex]?.attributes?.Description}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Service;