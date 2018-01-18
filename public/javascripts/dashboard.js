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
      })
      
    $('[data-info]').on('click', (event) => {
      event.preventDefault();
      let taskId = event.currentTarget.attributes['data-info'].value;
      location.replace(`/dashboard/${taskId}`);
    })
  })