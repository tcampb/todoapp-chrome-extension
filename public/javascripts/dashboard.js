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
    })