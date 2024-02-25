import Header from './../Components/Header/Header.js';
import Footer from './../Components/Footer/Footer.js';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="ContainerLayout">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;