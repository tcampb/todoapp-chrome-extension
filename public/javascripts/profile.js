$(document).ready(() => {

    $('[data-logout]').on('click', (event) => {
        event.preventDefault();
        window.location.replace('/logout')
    });

    $('[data-update-profile]').on('click', (event) => {
        window.location.replace('/dashboard');
    })

})