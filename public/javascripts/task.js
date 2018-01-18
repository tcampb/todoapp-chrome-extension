$('[data-contact-dropdown')
  .dropdown();


$('[data-calendar]').calendar();

$('[data-contact-hover]')
  .popup({
    inline: true,
    hoverable:true,
    delay: {
      show:300,
      hide:500
    }
  });

$(document).ready(() => {
    $('[data-create-contact]').on('click',(event)=>{
        event.preventDefault();
        let data = {
            firstName: $('[data-contact-firstname]').val(),
            lastName: $('[data-contact-lastname]').val(),
            email: $('[data-contact-email]').val()
        }
        $.ajax({
            url:`/dashboard/create-contact`,
            type:`POST`,
            data : data,
            success: (response) => {
                //add response
            },
            error: (err) => {
                //add error handler
            }
        })
    })

    $('[data-create-task]').on('submit', (event) => {
      event.preventDefault();
      let data = $('[data-create-task]').serialize();

      $.ajax({
        url:'/dashboard/create-task',
        type: 'POST',
        data: data,
        success: (response) => {
          //add response
        },
        error: (err) => {
          //add error handler
        }
      })
    })
});