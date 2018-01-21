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
    let title = $('[data-title]').text();
    let description = $('[data-description]').text();
    description = description.substring(description.indexOf(':') + 2);
    let location = $('[data-location]').text();
    let contacts = $('[data-contact]');
    let contactArray = [];
    let contactIds = [];
    for (let i=0; i < contacts.length; i++) {
      contactArray.push({
                         contactId : contacts[i].getAttribute('data-contact'),
                         contactName : contacts[i].innerHTML})
      }
    contactArray.find((object) => {
      contactIds.push(object.contactId);
      });
    let dueDate = $('[data-due-date]').text();
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
        url:'/dashboard/create-task',
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
      console.log(event);
      setTimeout(() => {
        window.location.replace('/');
      }, 1000);

    
    
    });

    $('[data-update]').on('click', (event) => {
      event.preventDefault();
      $('[data-update]').empty();
      $.get('/dashboard/tasks', (data) => {
        let formStart = data.indexOf('<form');
        let formEnd = data.indexOf('</form>') + 7;
        let form = data.substring(formStart, formEnd);
        $('[data-content]').replaceWith(form);
      })
      .then(() => {
        $('form').attr({'style':'margin-top: 20px'});
        $('[name="title"]').val(title);
        $('[name="content"]').val(description);
        $('[name="enddate"]').val(dueDate);
        $('[name="title"]').val(title);
        $('[data-label]').addClass('hide');
        $('[data-submit]').val('Save');
        //Add selected contacts
        contactArray.forEach((contact) => {
          $('.search').prepend(`<a class="ui label transition visible" data-value="${contact.contactId}" style="display: inline-block !important;">${contact.contactName}<i class="delete icon"></i></a>`);
        })
        //Filter selected items
        for (let i=0; i < $('.item').length; i++) {
          if (contactIds.includes($('.item')[i].getAttribute('data-value'))) {
            $('.item')[i].classList.add('filtered');
          }
        }


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
        })

        $('[data-create-contact]').on('click',(event)=>{
          event.preventDefault();
          let data = {
              firstName: $('[data-contact-firstname]').val(),
              lastName: $('[data-contact-lastname]').val(),
              email: $('[data-contact-email]').val()
          }
          $.ajax({
              url:`../create-contact`,
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


      
      
    })
    
    
  });


