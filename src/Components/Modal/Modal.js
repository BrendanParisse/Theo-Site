import React from 'react';

const Modal = ({ isOpen, onRequestClose, imageUrl }) => {
    return (
        <div className={`modal ${isOpen ? 'open' : 'closing'}`} onClick={onRequestClose}>
            <div className="modal-content">
                <span className="buttonclose" onClick={onRequestClose}>&times;</span>
                <img src={imageUrl} alt="Modal" />
            </div>
        </div>
    );
};

export default Modal;