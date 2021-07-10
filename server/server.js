const express = require('express');
const app = express();
const path = require('path');
const config = require('./config');
const routes = require('./routes');
const session = require('express-session');
const { sessionSecret, database } = require('./config');
//const mongoStore = require('connect-mongo');
const mongoStore = require('connect-mongodb-session')(session);

const { port } = config;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  next();
});

app.use(session({
  key: 'userId',
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  // store: mongoStore.create({
  //   mongoUrl: database,
  //   autoRemove: 'native',
  //   ttl: 60 * 15
  // }),
  store: new mongoStore({
    uri: 'mongodb+srv://PRTI3UggBoots:Codesmith3@cluster0.1qtmd.mongodb.net',
    collection: 'sessions'
  }),
  cookie: {
    maxAge: 900000
  }
}))

app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html')));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.use('/api', routes);

// Error Handlers
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  console.log(err.message)
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = {
  app,
};
