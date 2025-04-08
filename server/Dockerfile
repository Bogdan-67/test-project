FROM golang:1.24.1-alpine

WORKDIR /app

RUN apk add --no-cache dos2unix

COPY . .

ENTRYPOINT ["/bin/sh", "-c", "dos2unix /app/run.sh && ./run.sh"]
