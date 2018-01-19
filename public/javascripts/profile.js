$(document).ready(() => {

    $('[data-logout]').on('click', (event) => {
        event.preventDefault();
        window.location.replace('/logout')
    });

})