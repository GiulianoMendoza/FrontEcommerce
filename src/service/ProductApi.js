const getProduct = async (Categoria, name, id,limit,offset ) => {
    let result = [];
    let url = `https://localhost:7123/api/Product`;
    if (id) {
        url += `/${encodeURIComponent(id)}&`;
    }
    if (name) {
        url += `?name=${encodeURIComponent(name)}&`;
    } 
    if (Categoria) {
        url += `?categories=${encodeURIComponent(Categoria)}&`;
    }
    if (limit !== undefined && offset !== undefined) {
        url += `${url.includes('?') ? '&' : '?'}limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`;
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
const ApiProduct = {
    Get: getProduct
};
export default ApiProduct;