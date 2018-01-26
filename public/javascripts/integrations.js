$(document).ready(() => {
    
    $('[data-back]').on('click', (event) => {
        event.preventDefault();
        $('[data-container]').transition({
            animation: 'fly right',
            duration: 2000
        })
        setTimeout(() => {
            window.location.replace('/');
        }, 1000);
    });
})