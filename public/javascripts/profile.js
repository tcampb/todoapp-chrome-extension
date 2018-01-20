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
      success: (response) => {
        window.location.replace('/profile');
      },
      error: (err) => {
        console.log("An unexpected error occurred");
      }
    })
})

$('[data-back]').on('click', (event) => {
  event.preventDefault();
  $('[data-container]').transition({
    animation: 'fly right',
    duration: 2000
  })
  setTimeout(() => {
    window.location.replace('/');
  }, 1000);
  });

})