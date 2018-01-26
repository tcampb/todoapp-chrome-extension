//Login template

const googleAuth = (username, e) => {
    $('[data-title]').text(`Welcome back, ${username}!`)
    $('[data-continue]').addClass('hide');
    $('[data-email]').addClass('hide');
    $('[data-google]').removeClass('hide');
    $('[data-continue]').remove();
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
    let e = $('<a href="/">(This is not me.)</a>').attr({'class': 'reset-user sign-up', 'style': 'color: #00a2ff;'});

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
                    data.auth === 'google' ? googleAuth(data.username, e) : emailAuth(data.email, data.username, e);
                }
            },
            error: (err) => {
                $('[data-user-not-found]').text(`No account exists for ${$('#email-form').val()}`).attr('style', 'display:inline');
            }
        })
    })
})