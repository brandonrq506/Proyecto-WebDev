const btn = document.querySelector('#previousPage');
console.log('Hello!')

btn.addEventListener('click', () => {
    window.history.back();
});