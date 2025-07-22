const express = require('express');
const path = require('path');

const app = express();
const Port = 3000;

app.use(express.static('public'));

app.listen(Port, () => {
    console.log(`Servidor rodando em http://localhost:${Port}`);
});