window._ = require('lodash');

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const tokenLaravel = document.head.querySelector('meta[name="csrf-token"]');
if (tokenLaravel) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = tokenLaravel.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

const tokenJwt = localStorage.getItem('TOKEN_AUTH');
if(tokenJwt){
    window.axios.defaults.headers.common['Authorization'] = `Bearer ${tokenJwt}`;
}
