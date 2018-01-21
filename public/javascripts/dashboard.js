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
        location.replace(`task/${taskId}`);
      }, 1000);
    })

  $('.green.button').on('click',(event)=>{
    event.preventDefault();
    let e = $(event.target).closest('.ui.card').find('[data-ribbon]');
    // Check to see if ribbon is hidden
    let display = e.attr('style');
    display.includes('display: none') ? status = false : status = true;
    let taskId = e.attr('data-ribbon');
    $.ajax({
      url: `/task/${taskId}`,
      type: 'PUT',
      dataType: 'JSON',
      data: {'status': status},
      success: (response) => {
        e.toggle();
      },
      error: (err) => {
        console.log("ERROR");
      }
    })
})

})