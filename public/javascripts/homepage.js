$(document).ready(function(){
    $('form').on('submit', (event) => {
        event.preventDefault()
        let email;
        $('[data-email-header]').val() ? email = $('[data-email-header]').val() : email = $('[data-email-footer]').val();
        console.log(email);
        location.replace(`/signup?email=${email}`)
    })
})