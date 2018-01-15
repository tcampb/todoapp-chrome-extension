// $(document).ready(() => {
//     $('form').on('submit', (event) => {
//         event.preventDefault();
//         $.ajax({
//             url: '/users',
//             type: 'POST',
//             dataType: 'json',
//             data: $('form').serialize(),
//             success: (data) => {
//                 localStorage.setItem('x-auth', data.token);
//                 location.replace('/dashboard');
//             },
//             error: (err) => {
//                 console.log(err);
//             }
//         })
//     })
// })

const googleAuth = () => {
    let userName = 'Tyler';
    $('[data-title]').text(`Welcome back, ${userName}!`)
    $('[data-continue]').addClass('hide');
    $('[data-email]').addClass('hide');
    $('[data-google]').removeClass('hide');
}

const emailAuth = () => {
    let userName = 'Tyler';
    $('[data-title]').text(`Welcome back, ${userName}!`)
    $('[data-email]').addClass('hide');
    $('[data-password]').removeClass('hide');
}








$(document).ready(() => {
    $('form').on('submit', (event) => {
        event.preventDefault();
        $.ajax({
            url: '/login',
            type: 'POST',
            dataType: 'json',
            data: $('form').serialize(),
            success: (data) => {
                data.auth === 'google' ? googleAuth() : emailAuth();
            },
            error: (err) => {
                console.log(err);
            }
        })
    })
})
