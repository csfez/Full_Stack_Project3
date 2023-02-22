var users=[
  { "name":"chirly",
    "password":"qw",
    "tasks":["1","2"]
  },
  { "name":"yael",
    "password":"qw",
    "tasks":["3","4"]
  }
]

var tasks=[
  {
    "taskId":"1",
    "date":'22/02/2023',
    "title":"holidays",
    "content":""
  },
  {
    "taskId":"2",
    "date":'22/02/2023',
    "title":"menus",
    "content":""
  },
  {
    "taskId":3,
    "date":'22/02/2023',
    "title":"books",
    "content":""
  }
]

window.localStorage.setItem(users, JSON.stringify(users));
window.localStorage.setItem(tasks, JSON.stringify(tasks));


