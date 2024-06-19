# Building manager

Projeto que auxilia nas notificações sobre problemas no prédio.

## Backend

O Backend foi desenvolvido com o NestJS, TypeORM, ZOD, Open API e uma conexão com postgress.

### Start

Para iniciar o projeto é necessário atualizar o arquivo [database.module.ts](backend/src/database/database.module.ts) e atualizar o host e senha para o postgress.

No terminal de comandos digite `npm run start`

Para visualizar os endpoints disponíveis basta acessar [http://localhost:3000/api](http://localhost:3000/api)

## Frontend

O Frontend foi desenvolvido com Remix.run no modo Single Page Application, Tailwind CSS e axios.

No terminal de comandos digite `npm run dev`
