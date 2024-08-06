FROM golang:alpine AS builder

WORKDIR /app

COPY . .
 
RUN go build -ldflags '-s -w' main.go

FROM scratch AS final

COPY --from=builder /app/main /

ENTRYPOINT ["/main"]