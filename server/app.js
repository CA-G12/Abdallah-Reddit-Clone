const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const {join} = require('path');
const router = require('./router/router');

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(compression()); 
app.use(cookieParser());
app.use(express.static(join(__dirname, '..', 'public')));

app.use(router);


app.set('port', process.env.PORT || 3000);

module.exports = app;
