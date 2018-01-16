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


//Login template

const googleAuth = (username) => {
    $('[data-title]').text(`Welcome back, ${username}!`)
    $('[data-continue]').addClass('hide');
    $('[data-email]').addClass('hide');
    $('[data-google]').removeClass('hide');
}

const emailAuth = (username) => {
    $('[data-title]').text(`Welcome back, ${username}!`)
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
                data.auth === 'google' ? googleAuth(data.username) : emailAuth(data.username);
            },
            error: (err) => {
                console.log(err);
            }
        })
    })
})
