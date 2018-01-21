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
            url:`/contacts`,
            type:`POST`,
            data : data,
            success: (response) => {
              $('[data-contact]').append(`<div class="item" data-value="${data.email}">${data.firstName}  ${data.lastName}</div>`);
            },
            error: (err) => {
                //add error handler
            }
        })
    })

    $('[data-create-task]').on('submit', (event) => {
      $('.ui.container.error.message').remove();
      $('.ui.container.success.message').remove();
      event.preventDefault();
      let data = $('[data-create-task]').serialize();
      $.ajax({
        url:'/task',
        method: 'POST',
        data: data,
        success:(response) => {
         $(`<div class="ui success container message">
          <div class="header">Form Completed</div>
          <p>Task Created</p>
        </div>`).appendTo($('body'));
        $('.ui.container.error.message').remove();
        },
        error: (error) => {
          let $error_div =$(`<div class="ui error container message"><i id="close-error" class="close icon"></i></div>`);
          let $error_header =$(`<h4>${error.statusText}</h4>`);
          $error_header.appendTo($error_div);
          let list = error.responseText.split('\n');
          list.map(text => $(`<p>${text}</p>`).appendTo($error_div));
          $error_div.appendTo($('#error-box'));
          // // close icon for error messages!
          // $('.close.icon').on('click', function() {
          //   console.log('clicked!!')
          //   $(this)
          //     .closest('#error-box')
          //     .transition('fade');
          // });
        }
      })

      });
      
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


