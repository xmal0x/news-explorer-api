# news-explorer-api

__Что это__   
Дипломная работа по курсу Web разработка от Yandex Практикум

__Цель проекта__   
Закрепление полученных знаний, защита диплома.

__Используемые технологии__   
Node.js, express, MongoDb, mongoose, eslint and etc

__Запуск__  
npm run start - запускает сервер  
npm run dev - запускает сервер с хот релоудом

__Установка__
Необходимо скачать репозиторий, в папке с проектом написать npm i, чтобы npm установил необходимые модули из package.json для работы 

__Адрес__  
https://api-news.ga/  
84.201.141.156  

__Справка по API__  
GET /users/me возвращает информацию о пользователе (email и имя);  
GET /articles все сохранённые пользователем статьи;  
POST /articles создаёт статью с переданными в теле данными;  
Пример запроса:  
{
	"keyword": "keyword",
    "title": "testArt",
    "text": "testArticleText",
    "date": "20/02/2020",
    "source": "testSource",
    "link": "http://www.test.ru",
    "image": "http://www.test.ru"
}
    
DELETE /articles/articleId удаляет сохранённую статью по _id;  
POST /signup создаёт пользователя с переданными в теле данными;  
Пример запроса:  
{
	"name": "Kirill2",
	"email": "kir2@mm.ru",
	"password": "2"
}
    
POST /signin логин пользователя, если в теле запроса переданы правильные почта и пароль.  
Пример запроса:  
{
	"email": "kir@mm.ru",
	"password": "123"
}
