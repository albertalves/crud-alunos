## Sobre
Esse projeto é uma aplicação SPA desenvolvida em Laravel e VueJs. 

## Recursos 
- Autenticação JWT
- Api Restful (laravel)
- Relacionamento entre tabelas (laravel)
- Vuex
- Vue-router

## Instalar dependências
- composer install
- npm install

## Executando o projeto
Gerar a chave de criptografia do laravel.
- php artisan key:generate

Gerar chave de autenticação jwt.
- php artisan jwt:secret

Rodar as migrations.
- php artisan migrate

Executar o projeto.
- php artisan serve
- npm run watch
