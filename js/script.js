const notifList = document.getElementById("notif-list");

function addNotifications(data) {
  const notifications = [...data];
  notifications.forEach(notification => {
    console.log(notification.notification.author);
  });



  notifications.forEach(e => {
    const li = document.createElement("li");
    li.dataset.author = e.notification.author.name;
    if (!e.notification.read) {
      li.classList.add("unread");
    }

    const notificationElement = document.createElement("p");
    const notifAuthor = document.createElement("strong");
    notifAuthor.textContent = e.notification.author.name;
    const notifText = document.createTextNode(e.notification.message);

    notificationElement.appendChild(notifAuthor);
    notificationElement.appendChild(notifText);

    li.appendChild(notificationElement);
    notifList.appendChild(li);
  })
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



//let notifications = [... notifList.children];


/* notifications.forEach(notif => {
    let authorName = notif.dataset.author;
    let author = notifications.find(a => a.name === authorName);
    author.style.

    console.log(notif.dataset.author);
}); */

/* notifsArrays.forEach(element => {
  console.log(element);

}); */