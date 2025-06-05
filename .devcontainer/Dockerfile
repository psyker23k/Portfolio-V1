FROM node:20-slim

# Instalar dependências necessárias
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instalar pnpm
RUN npm install -g pnpm

# Configurar o diretório de trabalho
WORKDIR /workspace

# Configurar o usuário não-root
USER node 