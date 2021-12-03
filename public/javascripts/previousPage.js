const btn = document.querySelector('#previousPage');

btn.addEventListener('click', () => {
    window.history.back();
});