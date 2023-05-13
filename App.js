require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes/Routes');
const mgrSwagger = require('mgr-swagger-express')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router)

mgrSwagger.SET_EXPRESS_APP(app)

module.exports = app;
