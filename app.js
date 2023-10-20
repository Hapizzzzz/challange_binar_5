const express = require ('express');
const path = require ('path');
const cookieParser = require ('cookie-parser');
const logger = require ('morgan');
const fs = require('fs');
const yaml = require('yaml');
const swaggerUI = require('swagger-ui-express');
const port = 3000;

const app = express ();

const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = yaml.parse(file);

const indexRouter = require ('./routes/');

const v1 = '/api/v1';

app.use (logger ('dev'));
app.use (express.json ());
app.use (express.urlencoded ({extended: false}));
app.use (cookieParser ());
app.use (express.static (path.join (__dirname, 'public')));

app.get(v1, (req, res) => {
    res.status(200).json({
        message: 'Welcome to api bank sistem',
    });
});

app.use(v1, indexRouter);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen (port, () => {
  console.log (`Bank System app listening on port ${port}`);
});

module.exports = app;
