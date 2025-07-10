install:
	docker run -it -v ./:/app diovanegabriel/node:latest /bin/sh -c "npm init -y && npm i" && \
	docker container prune -f

update:
	docker run -it -v ./:/app diovanegabriel/node:latest /bin/sh -c "npm i" && \
	docker container prune -f

build:
	sudo rm -rf ./dist && \
	docker run -it -v ./:/app diovanegabriel/node:latest /bin/sh -c "npm run build" && \
	docker container prune -f

bash:
	docker exec -it react-ui-frontend sh

publish:
	make build && \
	docker run -it -v ./:/app diovanegabriel/node:latest /bin/sh -c "npm login && npm publish --access public" && \
	docker container prune -f

do:
	docker run -it -v ./:/app diovanegabriel/node:latest /bin/sh -c "npm i --save-dev @types/markdown-it"