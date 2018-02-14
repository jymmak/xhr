const btnXhr = document.getElementById('btn-xhr');
const btnFetch = document.getElementById('btn-fetch');
const searchFile = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchForText;

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.onreadystatechange = function() {
    if (articleRequest.readyState === 4 && articleRequest.status === 200) {
      const data = JSON.parse(this.responseText);
      const response = data.response.docs;
      articleRequest.onload = addNews(response); 
      articleRequest.onerror = handleError; 
    }
  };
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=84a084e349a34fd2858790efd2fd41f7`);
  articleRequest.send();
}
function handleError(error) {
  console.log(error);
}
function addNews(array) {
  if (array.length > 0) {
    array.forEach(function(element, index) {
      if (element.document_type === 'article') {
        const template = `<div class="card  container justify-content-center ma-f">
      <div class="card-body row ">
      <div class = "col-12 col-lg-3">
      <img class="image" src="https://static01.nyt.com/${element.multimedia[0].url}">
      </div>
      <div class = "col-12 col-lg-9">
      <h3 class="title">${element.headline.main}</h3>
      <p class="card-text">${element.snippet}</p>
      <a  class="card-link btn btn-primary" href=${element.web_url}>View more</a>
      </div>
      </div>
      </div>`;
        responseContainer.innerHTML += template;
      }
    });
  } else {
    alert('No hay noticias sobre este tema');
    searchFile.value = '';
  }
}
btnXhr.addEventListener('click', function(event) {
  event.preventDefault();
  responseContainer.innerHTML = '';
  searchForText = searchFile.value;
  getNews();
});


btnFetch.addEventListener('click', function() {
  event.preventDefault();
  responseContainer.innerHTML = '';
  searchForText = searchFile.value;
  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=84a084e349a34fd2858790efd2fd41f7`;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      const response = data.response.docs;
      addNews(response);
    })
    .catch(function(error) {
      console.log(error);
    });
});
