const notifList = document.getElementById("notif-list");
const btnRead = document.getElementById("btn-read");
let counter = 0;
const unreadNumber = document.getElementById("unread-num");

function countUnread() {
  counter = [...notifList.children].reduce((acc, li) => {
    return li.classList.contains("unread") ? acc + 1 : acc;
  }, 0);
  unreadNumber.textContent = counter;
}

function readNotification(event) {
  let notification = event.target.closest("li");
   if (notification.classList.contains("unread")) {
    notification.classList.remove("unread");
    countUnread();
   }
}

function createNotificationElement(notificationData) {
  const li = document.createElement("li");
  li.dataset.author = notificationData.notification.author.name;
  li.addEventListener("click", readNotification);
  const notifAuthor = document.createElement("strong");
  notifAuthor.textContent = notificationData.notification.author.name;
  const link = document.createElement("a");
  const content = document.createElement("div");
  const message = document.createElement("p");
  const picture = document.createElement("img");

  if (!notificationData.notification.read) {
    li.classList.add("unread");
  }
  const photo = document.createElement("img");
  photo.src = notificationData.notification.author.photo;
  photo.classList.add("photo");
  photo.alt = "";
  li.appendChild(photo);

  const notificationElement = document.createElement("p");
  const notifText = document.createTextNode('\u00A0' + notificationData.notification.message + '\u00A0');
  notificationElement.appendChild(notifAuthor);
  notificationElement.appendChild(notifText);

  switch(notificationData.notification.type) {
  case "post":
    li.classList.add("post");
    link.textContent = notificationData.notification.target;
    link.href = "#";
    notificationElement.appendChild(link);
    break;
  case "follow":
    li.classList.add("follow");
    break;
  case "group":
    li.classList.add("group");
    link.textContent = notificationData.notification.target;
    link.href = "#";
    notificationElement.appendChild(link);
    break;
  case "message":
    li.classList.add("message");
    message.textContent = notificationData.notification.target;
    message.classList.add("msg")
    break;
  case "picture":
    li.classList.add("picture");
    picture.src = notificationData.notification.target.src;
    picture.alt = notificationData.notification.target.alt;
    break;
  }

  content.appendChild(notificationElement);
  const time = document.createElement("time");
  content.appendChild(time);

  time.textContent = notificationData.notification.time;
  if (notificationData.notification.type === "message")
    content.appendChild(message);
  else if (notificationData.notification.type === "picture")
    content.appendChild(picture);

  li.appendChild(content);
  notifList.appendChild(li);

}

function addNotifications(data) {
  data.forEach(notification => {
    createNotificationElement(notification);
  })
  countUnread();
}

fetch("../js/authors.json")
  .then(response => response.json())
  .then(data => {
    addNotifications(data);
  })
  .catch(error => {
    console.error("Wystąpił błąd podczas pobierania pliku JSON:", error);
  });



  btnRead.addEventListener("click", () => {
    [...notifList.children].forEach(li => {
      li.classList.remove("unread");
    })
    counter = 0;
    countUnread();
  })
