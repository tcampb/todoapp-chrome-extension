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
    for (let i=0; i < contacts.length; i++) {
      contactArray.push({
                         contactId : contacts[i].getAttribute('data-contact'),
                         contactName : contacts[i].innerHTML})
      }
        
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

    $('[data-back]').on('click', (event) => {
      event.preventDefault();
      $('[data-container]').transition({
        animation: 'fly right',
        duration: 2000
      })
      setTimeout(() => {
        console.log(1);
        window.location.replace('/');
      }, 1000);
      });

    $('[data-update]').on('click', (event) => {
      event.preventDefault();
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
        contactArray.forEach((contact) => {
          $('.search').prepend(`<a class="ui label transition visible" data-value="${contact.contactId}" style="display: inline-block !important;">${contact.contactName}<i class="delete icon"></i></a>`)
        })
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
      })
      

    });
});


// $('[data-contact-label]').attr('data-contact-label')