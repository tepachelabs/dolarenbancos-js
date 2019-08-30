const path = require('path');
const express = require('express');
const sass = require('node-sass-middleware');
const logger = require('../logger');
const data = require('../data');

const app = express();
const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.use(
  sass({
    src: path.join(__dirname, 'scss'), //where the sass files are
    dest: path.join(__dirname, 'public'), //where the sass files are
    prefix: '/public',
    outputStyle: isDev ? 'nested' : 'compressed',
    force: isDev,
    debug: isDev
  })
);

app.get('/', (req, res) =>
  res.render('index', { data })
);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/sitemap.xml'));
});

app.listen(port, () => logger.info(`* Web server [ONLINE]`));
