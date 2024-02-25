import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectService = ({ urls, onCarouselClick, hoveredIndex, activeIndex, descriptionActive }) => {
    const navigate = useNavigate();

    const handleGalerieClick = (category) => {
        navigate('/galerie', { state: { selectedCategory: category } });
    };

    const handleFormulaireClick = () => {
        navigate('/contact');
    };

    return (
        <ul className={`Carrousel ${descriptionActive ? 'carrousel-description-active' : ''}`}>
            {Object.entries(urls).map(([imageId, imageData], index) => (
                <li
                    key={index}
                    className={`Carrousel_img Carrousel_img_1 ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => onCarouselClick(imageId, index)}
                >
                    <img src={imageData.imageUrl} className={`Photo ${hoveredIndex !== null && hoveredIndex !== index ? 'grayscale' : ''}`} alt={`PhotoCarrousel${imageId}`} />
                    <div>
                        <h2>{imageData.category}</h2>
                        {activeIndex === index && (
                            <>
                                <button onClick={() => handleGalerieClick(imageData.category)} className='btn_galerie' style={{ display: activeIndex === index ? 'block' : 'none' }}>
                                    Galerie
                                </button>
                                <button onClick={handleFormulaireClick} className='btn_formulaire' style={{ display: activeIndex === index ? 'block' : 'none' }}>
                                    Formulaire
                                </button>
                            </>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default SelectService;