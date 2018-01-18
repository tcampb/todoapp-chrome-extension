$(document).ready(() => {
    $('[data-delete-task]').on('click', (event)=>{
        event.preventDefault();
        console.log(event.target);
        console.log(event.target.parentElement);
       $(event.target.parentElement.parentElement).transition({
          animation: 'fly left',
          duration:1000
          // interval:200
        });
      
      })
    })