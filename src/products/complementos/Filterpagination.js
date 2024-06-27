async function renderPagination(totalPages, currentPage, renderProductsCallback){
    const paginationContainer = document.getElementById('pagination-buttons');
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Anterior';
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            localStorage.setItem('currentPage', currentPage);
            renderProductsCallback(currentPage);
        }
    });
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i.toString();
        pageButton.addEventListener('click', () => {
            currentPage = i;
            localStorage.setItem('currentPage', currentPage);
            renderProductsCallback(i);
        });
        paginationContainer.appendChild(pageButton);
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Siguiente';
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            localStorage.setItem('currentPage', currentPage);
            renderProductsCallback(currentPage);
        }
    });
    paginationContainer.appendChild(nextButton);
}
const pagination = {
    Get : renderPagination
};
export default pagination;