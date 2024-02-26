const token = 'e98e1b6a60e1cce2296a55b9bbb7a62e16436ddea249e42b733df5df240520867e8a9fa4ee90332b8cc7d1d38b40ef8492a07a60c93e912e2ce184470272893f5e6b65fa3fb6a2c0668e4daedd88dd5fda997e557622a86f784a70fe60d071c9e1d55afd4e6c63b3701142bb694a7bc25d03f6aadcadb1a8edc87019c1c9d5e0';

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


