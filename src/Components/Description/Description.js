import React from "react";
const Description = ({ title, description }) => {
    return (
        <div className="ProjectDescription">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Description;