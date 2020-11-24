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

## Banco de Dados
- importar o banco localizado na pasta '01_banco_de_dados'
- ou rodar as migrations com um banco zerado

## Executando o projeto
Gerar a chave de criptografia do laravel.
- php artisan key:generate

Gerar chave de autenticação jwt.
- php artisan jwt:secret

Executar o projeto.
- php artisan serve
- npm run watch
