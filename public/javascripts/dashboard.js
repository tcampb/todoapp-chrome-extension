$(document).ready(() => {

    $('[data-delete-task]').on('click', (event)=>{
        let taskCard = $(event.target.parentElement.parentElement.parentElement);
        event.preventDefault();
        taskCard.transition({
          animation: 'fly left',
          duration:1000
          // interval:200
        })
        setTimeout(() => {
          taskCard.addClass('hide')
        }, 1000);
        $.ajax({
          url:`/task`,
          method:`DELETE`,
          data:event.target.dataset.deleteTask 
        })
      })

    $('[data-info]').on('click', (event) => {
      event.preventDefault();
      $('[data-container]').transition({
        animation: 'fly left',
        duration: 2000
      })
      setTimeout(() => {
        let taskId = event.currentTarget.attributes['data-info'].value;
        location.replace(`${location.origin}/task/${taskId}`);
      }, 1000);
    })

  $('.green.button').on('click',(event)=>{
    event.preventDefault();
    let isSFtask;
    let e = $(event.target).closest('.ui.card').find('[data-ribbon]');
    // Check to see if ribbon is hidden
    let display = e.attr('style');
    display.includes('none') ? status = true : status = false;
    let taskId = e.attr('data-ribbon');
    //Check to see if task is from SF
    try {
      isSFtask = e.attr('data-salesforce');
    } catch (e) {
      console.log(e);
    }
    $.ajax({
      url: `/task/${taskId}`,
      type: 'PUT',
      dataType: 'JSON',
      data: {'status': status, "isSFTask": isSFtask},
      success: (response) => {
        e.toggle();
      },
      error: (err) => {
        console.log("ERROR");
      }
    })
})
// Drop down js for filter 
    $('.dropdown')
    .dropdown({
      transition: 'fade up'
    })
    ;

    // Filter buttons redirect js
    $('[data-completed-task]').on('click',(event)=>{
      $.ajax({
        url:`/dashboard/done`,
        type:`GET`,
        sucess:location.replace(`/dashboard/done`)
      })
    })
    $('[data-overdue-task]').on('click',(event)=>{
      $.ajax({
        url:`/dashboard/due`,
        type:`GET`,
        sucess:location.replace(`/dashboard/due`)
      })
    })
    $('[data-filter-date]').on('click',(event)=>{
      $.ajax({
        url:`/dashboard/date`,
        type:`GET`,
        sucess:location.replace(`/dashboard/date`)
      })
    })
    $('[data-all-task]').on('click',()=>{
      location.replace(`/dashboard`)
    });



})