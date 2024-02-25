import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from '../../../Components/Modal/Modal.js';
import { ApiDataGalerie } from '../../../_Services/APIService.js';

const Galerie = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(location.state ? location.state.selectedCategory : "");
    const [imagesData, setImagesData] = useState([]);
    const [currentImage, setCurrentImage] = useState('');
    const [applyAnimation, setApplyAnimation] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [filteredImages, setFilteredImages] = useState([]);
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const previousImageRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await ApiDataGalerie();
                console.log(apiData);
                if (apiData && apiData.data && apiData.data.length > 0) {
                    const updatedImagesData = apiData.data.map(item => ({
                        id: item.id,
                        category: item.attributes.theo_categorie.data.attributes.Categorie,
                        images: item.attributes.Photo.data.map(imageData => ({
                            id: imageData.id,
                            url: `http://localhost:1337${imageData.attributes.url}`,
                            formats: imageData.attributes.formats
                        }))
                    }));
                    setImagesData(updatedImagesData);
                    setCurrentImage(updatedImagesData[0].images[0].url);
                    const categories = updatedImagesData.map(image => image.category);
                    setUniqueCategories(Array.from(new Set(categories)));
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'API', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filteredImages = [];
        if (selectedCategory) {
            filteredImages = imagesData.find(item => item.category === selectedCategory)?.images || [];
        } else {
            filteredImages = imagesData.flatMap(item => item.images);
        }
        setFilteredImages(filteredImages);
        setCurrentImage(filteredImages.length > 0 ? filteredImages[0].url : '');
    }, [selectedCategory, imagesData]);

    useEffect(() => {
        previousImageRef.current = currentImage;
    }, [currentImage]);

    const handleCarouselClick = (image, index) => {
        setCurrentImage(image);
        setApplyAnimation(true);
        setHoveredIndex(index);
        setActiveIndex(index);
        const mosaiqueSection = document.getElementById('mosaique');
        if (mosaiqueSection) {
            mosaiqueSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleAnimationEnd = () => {
        setApplyAnimation(false);
    };

    const handleImageHover = (index) => {
        setHoveredImageIndex(index);
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setModalOpen(true);
    };

    const handleCategoryClick = (category) => {
        setApplyAnimation(true);
        setSelectedCategory(category);
    };
    const isVerticalImage = (image) => {
        const img = new Image();
        img.src = image.url;
        return img.height > img.width;
    };
    return (
        <section className="SectionGalerie">
            <img
                className={`backgroundimg_1 background_old ${applyAnimation ? 'background-animation_1' : ''}`}
                src={previousImageRef.current || ''}
                alt="background"
                onAnimationEnd={handleAnimationEnd}
            />
            <img
                className={`backgroundimg background_current ${applyAnimation ? 'background-animation' : ''}`}
                src={currentImage}
                alt="background"
                onAnimationEnd={handleAnimationEnd}
            />
            <div className='Container_Galerie'>
                <div className='Galerie'>
                    <h2>GALERIE</h2>
                    <ul className='Menu_Galerie'>
                        <li onClick={() => handleCategoryClick('')} className={selectedCategory === '' ? 'active' : ''}>TOUS</li>
                        {uniqueCategories.map((category, index) => (
                            <li key={index} onClick={() => handleCategoryClick(category)} className={selectedCategory === category ? 'active' : ''}>
                                {category}
                            </li>
                        ))}
                    </ul>
                    <div id="mosaique" className='Mosaique'>
                        {filteredImages && filteredImages.map((image, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => handleImageHover(index)}
                                onMouseLeave={() => handleImageHover(null)}
                                className={`ImageContainer ${hoveredImageIndex !== null && hoveredImageIndex !== index ? 'grayscale' : ''} ${isVerticalImage(image) ? 'vertical-image' : 'horizontal-image'}`}
                                onClick={() => handleImageClick(index)}
                            >
                                {image && image.url && <img src={image.url} alt='PhotoGalerie' />}
                            </div>
                        ))}
                    </div>
                    <Modal
                        isOpen={modalOpen}
                        onRequestClose={() => setModalOpen(false)}
                        imageUrl={selectedImageIndex !== null ? filteredImages[selectedImageIndex].url : ''}
                    />
                </div>
            </div>
        </section>
    );
}

export default Galerie;