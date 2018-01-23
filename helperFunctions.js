const hbs = require('hbs');

//Limits dashboard task description to 140 characters
hbs.registerHelper('partialContent', (content) => {
    if (content.length > 140) {
      return content.substring(0, 140) + '...';
    } else {
      return content
    }
  });
//Limits stylesheets based upon current document
hbs.registerHelper('styleSheets', (document) => {
    switch (document) {
      case 'createTask':
      return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui-calendar/0.0.8/calendar.css">\n
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.2.10/dist/semantic.min.css">\n
              <link rel="stylesheet" href="../stylesheets/task.css">`
      case 'dashboard':
      return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui-calendar/0.0.8/calendar.css">\n
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.2.10/dist/semantic.min.css">\n
              <link rel="stylesheet" href="../stylesheets/task.css">`
      case 'task':
      return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui-calendar/0.0.8/calendar.css">\n
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.2.10/dist/semantic.min.css">\n
              <link rel="stylesheet" href="../../stylesheets/task.css">`
      case 'profile':
      return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui-calendar/0.0.8/calendar.css">\n
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.2.10/dist/semantic.min.css">\n
              <link rel="stylesheet" href="../stylesheets/task.css">`
      case 'contact':
      return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui-calendar/0.0.8/calendar.css">\n
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.2.10/dist/semantic.min.css">\n
              <link rel="stylesheet" href="../../stylesheets/task.css">`
      case 'integrations':
      return `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.2.10/dist/semantic.min.css">\n
              <link rel="stylesheet" href="stylesheets/task.css">`
      default:
      return `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.2.10/dist/semantic.min.css">\n
              <link rel="stylesheet" href="stylesheets/style.css">`
    }
  })

  