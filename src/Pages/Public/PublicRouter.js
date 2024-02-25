import { Routes, Route, Navigate } from 'react-router-dom';

import { Accueil, Apropos, Galerie, Service, Not404, Contact, ML } from './Index.js';

import Layout from '../../Layouts/Layouts.js';

const PublicRouter = () => {


    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/Accueil" />} />
                <Route path="/Accueil" element={<Accueil />} />
                <Route path="/Apropos" element={<Apropos />} />
                <Route path="/Galerie" element={<Galerie />} />
                <Route path="/Service" element={<Service />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/ML" element={<ML />} />
            </Route>
            <Route path="*" element={<Not404 />} />
        </Routes>
    );
};

export default PublicRouter;