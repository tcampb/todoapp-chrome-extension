$(document).ready(() => {
    let token = localStorage.getItem('x-auth');
    $.ajax({
        url: '/users/auth',
        type: 'POST',
        dataType: 'json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('x-auth', token)
        },
        success: (data) => {
            console.log(data);
        }
    })
})