const getSale = async (id, fechaDesde, fechaHasta) => {
    let result = [];
    let url = `https://localhost:7123/Sale`;

    if (id) {
        url += `/${encodeURIComponent(id)}&`;
    }
    if (fechaDesde,fechaHasta) {
        url += `?from=${encodeURIComponent(fechaDesde)}&to=${encodeURIComponent(fechaHasta)}&`;
    }    
    if (url.endsWith('&')) {
        url = url.slice(0, -1);
    }
    let response = await fetch(url);

    if (response.ok) {
        result = await response.json();
    }
    return result;
};
const postSale = async (products, totalPayed) => {
    let postResult = null;
    const postUrl = 'https://localhost:7123/Sale';
    
    try {
        const postResponse = await fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                products: products,
                totalPayed: totalPayed
            }),
        });

        if (postResponse.ok) {
            postResult = await postResponse.json();
        } else if (postResponse.status === 400) {
            postResult = 'Solicitud incorrecta';
        } else {
            throw new Error('Error en la solicitud POST');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }

    return postResult;
};
const ApiSale = {
    Get : getSale,
    Post : postSale
}
export default ApiSale;