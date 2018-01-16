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

const emailAuth = (email, username) => {
    $('[data-title]').text(`Welcome back, ${username}!`)
    $('[data-email]').addClass('hide');
    $('[data-password]').removeClass('hide');
    $('#email-form').text(email);
    $('form').attr('action', '/auth');
}

$(document).ready(() => {
    $('form').on('submit', (event) => {
        event.preventDefault();
        $.ajax({
            url: $('form').attr('action'),
            type: 'POST',
            dataType: 'json',
            data: $('form').serialize(),
            success: (data) => {
                if (data.url) {location.replace(data.url);}
                else {
                    data.auth === 'google' ? googleAuth(data.username) : emailAuth(data.email, data.username);
                }
            },
            error: (err) => {
                $('[data-user-not-found]').text(`No account exists for ${$('#email-form').val()}`).attr('style', 'display:inline');
            }
        })
    })
})