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
    $('h3').text(`Welcome back, ${userName}`)
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
