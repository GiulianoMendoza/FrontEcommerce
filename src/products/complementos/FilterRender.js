function filter(){
    const filterDiv = document.createElement('div');
    filterDiv.className = 'search-filter'
    filterDiv.innerHTML = `
        <input type="text" id="search-input" placeholder= "Busca un producto por nombre">
        <div class="ui-search-filter">
            <h3>Categorías:</h3>
            <ul>                
                <li class="ui-search-filter-container"  data-category="1">Electrodomésticos</li>
                <li class="ui-search-filter-container"  data-category="2">Tecnología y Electrónica</li>
                <li class="ui-search-filter-container"  data-category="3">Moda y Accesorios</li>
                <li class="ui-search-filter-container"  data-category="4">Hogar y Decoración</li>
                <li class="ui-search-filter-container"  data-category="5">Salud y Belleza</li>
                <li class="ui-search-filter-container"  data-category="6"> Deportes y Ocio</li>
                <li class="ui-search-filter-container"  data-category="7">Juguetes y Juegos</li>
                <li class="ui-search-filter-container"  data-category="8">Alimentos y Bebidas</li>
                <li class="ui-search-filter-container"  data-category="9">Libros y Material Educativo</li>
                <li class="ui-search-filter-container"  data-category="10">Jardinería y Bricolaje</li>
            </ul>
        </div>
        <div class="ui-sort-filter">
        <h3>Ordenar por:</h3>
        <ul>
                <li class="ui-sort-filter-container" data-order="asc">Menor a Mayor</li>
                <li class="ui-sort-filter-container" data-order="desc">Mayor a Menor</li>
        </ul>
        </div>
    `;
    return filterDiv;
}
const contenedor = document.getElementById('filter-container');
const filternav = filter();
contenedor.appendChild(filternav);