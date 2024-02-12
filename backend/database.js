const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "sidhpg",
    database: "login_data"


})

module.exports = client;