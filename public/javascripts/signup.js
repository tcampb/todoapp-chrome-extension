$(document).ready(() => {
    $('form').on('submit', (event) => {
        $('.ui.container.error.message').remove();
        event.preventDefault();
        $.ajax({
            url: '/signup',
            type: 'POST',
            dataType: 'json',
            data: $('form').serialize(),
            success: (data) => {
                console.log('success');
                // location.replace('/');
            },
            error: (error) => {
                let $error_div =$(`<div class="ui error container message"><i id="close-error" class="close icon"></i></div>`);
                let $error_header =$(`<h4>${error.statusText}</h4>`);
                $error_header.appendTo($error_div);
                let list = error.responseText.split('\n');
                list.map(text => $(`<p>${text}</p>`).appendTo($error_div));
                $error_div.appendTo($('#error-box'));
            }
        })
    })
})