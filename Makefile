# Подключаемся к PHP контейнеру
shell:
	docker exec -it zakupator_frontend bash

# Старт всех контейнеров
start:
	docker compose up -d --build

# Перезапуск всех контейнеров
restart:
	docker compose restart

# Остановка всех контейнеров
stop:
	docker compose stop

install:
	docker exec -it zakupator_frontend npm install -g @vue/cli
	docker exec -it zakupator_frontend npm i -g @quasar/cli