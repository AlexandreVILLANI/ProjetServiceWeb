const express = require('express');
const keys = require('./config/keys');
const bodyParser= require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');


const app = express();
// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // cela permet d'envoyer des sessions & cookies 
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 jours
  keys: [keys.cookieKey]
}))

// TODO SWAGGER DOC

require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);


app.get('/', (req, res) => {
  res.send('Salut!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur ecoute sur le port: `, PORT);
});