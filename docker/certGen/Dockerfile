FROM alpine

RUN apk add --no-cache openssl

WORKDIR /app/certs

CMD sh -c '\
  # delete symlink
  [ -L cert.pem ] && rm -f cert.pem; \
  if [ ! -f cert.pem ] || [ ! -f key.pem ]; then \
    echo "Generating TLS certificate..." && \
    openssl req -x509 -newkey rsa:2048 \
      -keyout private.key \
      -out public.crt \
      -sha256 -days 3650 -nodes \
      -subj "/C=FR/ST=Local/L=Local/O=Dev/OU=FullStack/CN=localhost" \
      -addext "subjectAltName=DNS:localhost,IP:127.0.0.1,IP:::1" && \
    chmod 600 private.key && \
    chmod 644 public.crt ; \
  else \
    echo "TLS certificate already exists, skipping."; \
  fi'