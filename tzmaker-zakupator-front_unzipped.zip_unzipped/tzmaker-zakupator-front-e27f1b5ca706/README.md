# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

### Нюансы начальной установки:

При выполнении команды `npm init quasar` внутри докер контейнера может выдавать ошибку:

```
root@90b293d7d519:/var/www# npm init quasar
sh: 1: create-quasar: Permission denied
npm ERR! code 127
npm ERR! path /var/www
npm ERR! command failed
npm ERR! command sh -c -- create-quasar

npm ERR! A complete log of this run can be found in:
npm ERR!     /root/.npm/_logs/2022-08-29T21_30_09_082Z-debug-0.log
```

Варианты борьбы:

```
npm config set user 0
npm config set unsafe-perm true
```
```
chown -R root:root /var/www
chmod -R 755 /var/www
```
после выполнения последней команды стоит из операционной системы обратно вернуть права, 
иначе не получится редактировать файлы.

Еще ссылки по теме:
https://medium.com/@jwdobken/develop-quasar-applications-with-docker-a19c38d4a6ac

## Обычный запуск для разработки

`make start` - для запуска контейнера. Если контейнер давно мертв, можно провести повторную
установку: `make install`

Далее внутри контейнера `zakupator_frontend` выполнить `quasar dev` для запуска
сервера фронтенд разработки.

перейти на `http://zakupator-front.loc:8080/`