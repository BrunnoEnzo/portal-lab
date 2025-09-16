# nginx/Dockerfile

# Use a imagem oficial e leve do Nginx
FROM nginx:stable-alpine

# Remova a configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copie a sua configuração customizada para dentro do container
COPY default.conf /etc/nginx/conf.d/