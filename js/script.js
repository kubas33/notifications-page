fetch('../js/authors.json')
  .then(response => response.json())
  .then(data => {
    const authors = data;
    console.log(authors);
  })
  .catch(error => {
    console.error('Wystąpił błąd podczas pobierania pliku JSON:', error);
  });
  
const notifList = document.getElementById("notif-list");
let notifications = [... notifList.children];


notifications.forEach(notif => {
    let authorName = notif.dataset.author;
    let author = notifications.find(a => a.name === authorName);
    author.style.
    
    console.log(notif.dataset.author);
});