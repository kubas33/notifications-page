const notifList = document.getElementById("notif-list");
const btnRead = document.getElementById("btn-read");
let counter = 0;
const unreadNumber = document.getElementById("unread-num");

function countUnread() {
  [...notifList.children].forEach(li => {
    if (li.classList.contains("unread"))
      counter++;
  })
  unreadNumber.textContent = counter;
}

function readNotification(event) {
  let notification = event.target.closest("li");
  console.log("click");
   if (notification.classList.contains("unread")) {
    notification.classList.remove("unread");
    counter--;
    countUnread();
   }
}

function addNotifications(data) {
  const notifications = [...data];

  notifications.forEach(e => {
    const li = document.createElement("li");
    const space = document.createTextNode(" ");
    li.dataset.author = e.notification.author.name;
    if (!e.notification.read) {
      li.classList.add("unread");
    }

    const notificationElement = document.createElement("p");
    const notifAuthor = document.createElement("strong");
    const link = document.createElement("a");
    const picture = document.createElement("img");
    const message = document.createElement("p");
    const photo = document.createElement("img");
    const content = document.createElement("div");
    const time = document.createElement("time");

    notifAuthor.textContent = e.notification.author.name;
    const notifText = document.createTextNode('\u00A0' + e.notification.message + '\u00A0');
    photo.src = e.notification.author.photo;
    photo.classList.add("photo");
    photo.alt = "";
    li.appendChild(photo);

    notificationElement.appendChild(notifAuthor);
    notificationElement.appendChild(notifText);




    switch(e.notification.type) {
      case "post":
        li.classList.add("post");
        link.textContent = e.notification.target;
        link.href = "#";
        notificationElement.appendChild(link);
        break;
      case "follow":
        li.classList.add("follow");
        break;
      case "group":
        li.classList.add("group");
        link.textContent = e.notification.target;
        link.href = "#";
        notificationElement.appendChild(link);
        break;
      case "message":
        li.classList.add("message");
        message.textContent = e.notification.target;
        message.classList.add("msg")
        break;
      case "picture":
        li.classList.add("picture");
        picture.src = e.notification.target.src;
        picture.alt = e.notification.target.alt;
        break;
    }


    time.textContent = e.notification.time;
    content.appendChild(notificationElement);
    content.appendChild(time);

    if (e.notification.type === "message")
      content.appendChild(message);
    else if (e.notification.type === "picture")
      content.appendChild(picture);

      li.appendChild(content);
      notifList.appendChild(li);
  })

  countUnread();

  
}

fetch('../js/authors.json')
  .then(response => response.json())
  .then(data => {
    addNotifications(data);
    //console.log(authors);
  })
  .catch(error => {
    console.error('Wystąpił błąd podczas pobierania pliku JSON:', error);
  });



  btnRead.addEventListener("click", e => {
    [...notifList.children].forEach(li => {
      li.classList.remove("unread");
    })
    counter = 0;
    countUnread();
  })

  Array.from(notifList.children).forEach(el => {
    console.log(el);
    el.addEventListener("click", readNotification);
  })
