$(document).ready(() => {
    $('form').on('submit', (event) => {
        event.preventDefault();
        $.ajax({
            url: '/signup',
            type: 'POST',
            dataType: 'json',
            data: $('form').serialize(),
            success: (data) => {
                location.replace('/');
            },
            error: (err) => {
                console.log(err);
            }
        })
    })
})