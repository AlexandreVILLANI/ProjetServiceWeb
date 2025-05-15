const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();
const app = express();

// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'SAETourismeAPI',
            version: '1.0.0',
            description: 'API Informations',
        },
        servers: [{ url: "http://localhost:3000" }]
    },
    apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// CORS
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Sessions / Cookies
app.use(cookieParser());
app.use(session({
    secret: 'SuperMegaUltraSecretDeLaSaeDeDingos',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    },
}));

// Body parser
app.use(express.json());

// Routes
const usersRoutes = require('./routes/users.router');
const concertRoutes = require('./routes/concert.router');
const avisRoutes = require('./routes/avis.router');
const activiteRoutes = require('./routes/activite.router');
const boutiqueRoutes = require('./routes/boutique.router');
const panierRoutes = require('./routes/panier.router');
const loginRoutes = require('./routes/authentification.router');
const activiteCtrl = require('./controllers/activite.controller');

app.use('/users', usersRoutes);
app.use('/concert', concertRoutes);
app.use('/avis', avisRoutes);
app.use('/activite', activiteRoutes);
app.use('/boutique', boutiqueRoutes);
app.use('/login', loginRoutes);
app.use('/panier', panierRoutes);

// Routes spécifiques API
app.get('/api/activites/:id/creneaux', activiteCtrl.getCreneauxByActiviteId);
app.post('/api/activites/:id/creneaux/sync', activiteCtrl.syncCreneauxForActivite);

// Démarrage serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
