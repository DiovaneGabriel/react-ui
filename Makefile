install:
	docker run -it -v ./:/app diovanegabriel/node:latest /bin/sh -c "npm init -y && npm i" && \
	docker run -it -v ./playground:/app diovanegabriel/node:latest /bin/sh -c "npm install vite react react-dom --save-dev" && \
	docker container prune -f

update:
	docker run -it -v ./:/app diovanegabriel/node:latest /bin/sh -c "npm i" && \
	docker run -it -v ./playground:/app diovanegabriel/node:latest /bin/sh -c "npm i" && \
	docker container prune -f

build:
	docker run -it -v ./:/app diovanegabriel/node:latest /bin/sh -c "npm run build" && \
	docker container prune -f

bash:
	docker exec -it react-ui-frontend sh

publish:
	make build && \
	make bash && \
	npm login && \
	npm version patch && \
	npm publish --access public

up:
	docker compose up -d