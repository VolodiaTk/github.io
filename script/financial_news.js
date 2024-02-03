// Ваш ключ API от News API
var apiKey = '670cd2cc3f9a43939a618053d80fe4c4';

// URL для запроса новостей
var apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + apiKey;

// Получаем данные с API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Обработка данных
        displayNews(data.articles);
    })
    .catch(error => console.error('Ошибка при получении новостей:', error));

// Функция отображения новостей на странице
function displayNews(articles) {
    var newsList = document.getElementById('news-list');

    articles.forEach(function (article) {
        var listItem = document.createElement('li');
        var link = document.createElement('a');

        link.textContent = article.title;
        link.href = article.url;
        link.target = '_blank';

        listItem.appendChild(link);
        newsList.appendChild(listItem);
    });
}
