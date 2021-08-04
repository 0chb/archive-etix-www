## BUILD
FROM node:10.15.1 as builder

RUN apt-get update && apt-get install -y ruby ruby-dev && \
	gem update --system && gem install compass

RUN	npm --version
COPY . .
RUN	npm install
RUN npm run prod

## RUN
FROM nginx:1.13.8-alpine

COPY --from=builder /dist /usr/share/nginx/html
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
