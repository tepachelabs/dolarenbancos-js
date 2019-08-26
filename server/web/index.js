const express = require('express');
const path = require('path');
const data = require('../data');

const app = express();
const port = 80;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.get('/', (req, res) =>
  res.render('index', { data })
);

app.listen(port, () => console.log(`* Web server [ONLINE]`));
