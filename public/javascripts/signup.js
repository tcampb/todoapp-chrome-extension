const googleAuth = (email) => {
    $('[data-title]').text(`Hi ${email}!`)
    $('[data-continue]').attr({'style': 'display:none;'});
    $('[data-email]').addClass('hide');
    $('[data-google]').removeClass('hide');
    $('[data-sign-up]').html('Prefer to create an account with a password? <a href="#" data-switch-password>Click here</a>')
    $('[data-switch-password]').on('click', (event) => {
        console.log("wdawdaw");
        event.preventDefault();
        emailAuth(null);
    })
}

const emailAuth = (email) => {

    if (!email) {$('[data-google]').addClass('hide')}

    $('[data-firstName]').removeClass('hide').attr('required');
    $('[data-lastName]').removeClass('hide').attr('required');
    $('[data-password]').removeClass('hide').attr('required');
    $('[data-email]').removeClass('hide').attr('required');
    $('.sign-up').addClass('hide');
    $('button').attr({'style': 'margin-top: 0px'});
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
                console.log(data.auth);
                data.auth === 'google' ? googleAuth(data.address) : emailAuth(data.address);
            },
            error: (err) => {
                console.log(err);
            }
        })
    })

})
