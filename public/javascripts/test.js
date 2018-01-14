$(document).ready(() => {
    $('form').on('submit', (event) => {
        event.preventDefault();
        $.ajax({
            url: '/users',
            type: 'POST',
            dataType: 'json',
            data: $('form').serialize(),
            success: (data) => {
                localStorage.setItem('x-auth', data.token);
                location.replace('/dashboard');
            },
            error: (err) => {
                console.log(err);
            }
        })
    })
})