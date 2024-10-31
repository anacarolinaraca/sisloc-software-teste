# Projeto - Loja de ingressos
Este projeto é um teste técnico que implementa uma solução de vendas de ingressos com faixas de desconto progressivo, conforme a quantidade de ingressos adquiridos. Esta aplicação foi desenvolvida utilizando Node.js e TypeScript, com um banco de dados MySQL. Além disso, foi preparada para ser executada em um ambiente Docker.

## Tecnologias Utilizadas
- Node.js e TypeScript para a lógica de back-end.
- Docker e Docker Compose para contêineres.
- MySQL para o banco de dados, rodando em um contêiner.
- Postman para testes e validação das APIs.

## Como Usar
Verifique se o [Docker](https://www.docker.com/products/docker-desktop/) e o [Docker Compose](https://docs.docker.com/compose/install/) estão instalados em sua máquina.

1. Clone o repositório:
```
git clone git@github.com:anacarolinaraca/sisloc-software-teste.git
```
2. Acesse o diretório do projeto:
```
cd /sisloc-software-teste
```
3. Instale as dependências do projeto:
```
npm install
```
4. Inicie o container Docker
- Lembre-se de parar o mysql se estiver usando localmente na porta padrão (3306)
```
docker-compose up -d
```
5. Rode a aplicação utilizando:
```
npm run dev
```
## Postman
Carregue o arquivo prova-sisloc.json no Postman para ter acesso aos endpoints já configurados.
