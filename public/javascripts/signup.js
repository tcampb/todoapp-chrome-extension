const googleAuth = (username, e) => {
    $('[data-title]').text(`Welcome back, ${username}!`)
    $('[data-continue]').addClass('hide');
    $('[data-email]').addClass('hide');
    $('[data-google]').removeClass('hide');
}

const emailAuth = (email, username, e) => {
    let header = $('[data-title]').text(`Welcome back, ${username}!`);
    e.insertAfter(header);
    $('[data-email]').addClass('hide');
    $('[data-password]').removeClass('hide');
    $('#email-form').text(email);
    $('form').attr('action', '/auth');
}


$(document).ready(() => {
    $('form').on('submit', (event) => {
        event.preventDefault();
        $.ajax({
            url: '/signup/email',
            type: 'POST',
            dataType: 'json',
            data: $('form').serialize(),
            success: (data) => {
                console.log(data);
                data.auth === 'google' ? googleAuth(data.username) : emailAuth(data.email, data.username);
            },
            error: (err) => {
                console.log(err);
            }
        })
    })
})
