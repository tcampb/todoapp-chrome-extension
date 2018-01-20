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

    $('[data-update]').on('click', (event) => {
      event.preventDefault();
      $('[data-update]').empty();
      $.get('/task', (data) => {
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
        // console.log("wadwd")
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
              url:`/contact`,
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

        $('[data-submit]').on('click', (event) => {
          event.preventDefault();
          let taskId = window.location.pathname.lastIndexOf('/') + 1;
          taskId = window.location.pathname.substring(taskId);
          $.ajax({
            url:`/task/${taskId}`,
            type: 'PUT',
            data: $('form').serialize(),
            success: (response) => {
              console.log(response);
            },
            error: (err) => {
              console.log(err);
            }
          })
        })
      })
      

    });
});