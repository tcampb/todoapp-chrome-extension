$(document).ready(() => {

    $('[data-logout]').on('click', (event) => {
        event.preventDefault();
        window.location.replace('/logout')
    });

    $('[data-update-profile]').on('click', (event) => {
        event.preventDefault();
        let form_data = new FormData($('#myForm')[0]);
        console.log(form_data)
        $.ajax({
        type:'POST',
        url:'/profile',
        processData: false,
        contentType: false,
        data : form_data,
      success: function(response){
        console.log(response);
      }
    })
})

})