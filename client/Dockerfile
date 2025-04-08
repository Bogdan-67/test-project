FROM node:12-alpine
WORKDIR /app

RUN apk add --no-cache dos2unix inotify-tools

COPY . .

ENTRYPOINT ["/bin/sh", "-c", "dos2unix /app/run.sh && ./run.sh"]