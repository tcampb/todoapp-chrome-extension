$('.ui.dropdown')
  .dropdown();


$('.tag.example .ui.dropdown')
  .dropdown({
    allowAdditions: true
  })
;

$('#example1').calendar();

$('.contact')
  .popup({
    inline: true,
    hoverable:true,
    delay: {
      show:300,
      hide:500
    }
  })
;

$(document).ready(() => {
    $('#button_for_contact').on('click',(event)=>{
        event.preventDefault();
        console.log('button heard!');
        let data = {
            firstName :$('#contact_first_name').val(),
            lastName:$('#contact_last_name').val(),
            email:$('#contact_email').val()
        }
        $.ajax({
            url:`/dashboard/create-contact`,
            type:`POST`,
            data : data,
            success: console.log("success")
        })
    })
})