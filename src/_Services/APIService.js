const token = 'process.env.REACT_APP_API_TOKEN';

export async function ApiDataAccueil() {
    try {
        const response = await fetch("https://my-strapi.kevinlebot.com/api/theo-accueils?&populate=*", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log('Données de l\'API 1:', data);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'API 1', error);
    }
}

export async function ApiDataApropos() {
    try {
        const response = await fetch("https://my-strapi.kevinlebot.com/api/theo-abouts?&populate=*", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log('Données de l\'API 1:', data);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'API 1', error);
    }
}

export async function ApiDataContact() {
    try {
        const response = await fetch("https://my-strapi.kevinlebot.com/api/theo-contacts?&populate=*", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log('Données de l\'API 1:', data);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'API 1', error);
    }
}

export async function ApiDataServices() {
    try {
        const response = await fetch("https://my-strapi.kevinlebot.com/api/theo-services?&populate=*", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log('Données de l\'API 1:', data);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'API 1', error);
    }
}

export async function ApiDataGalerie() {
    try {
        const response = await fetch("https://my-strapi.kevinlebot.com/api/theo-galeries?&populate=*", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log('Données de l\'API 1:', data);
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'API 1', error);
    }
}


