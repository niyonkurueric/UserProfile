import express from 'express';
const session = require('express-session');
const passport = require('passport');
import userController from "./controllers/User"
require('./middlewares/auth');
import islogedin from './middlewares/userauth';


const app = express();

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/signin',
        failureRedirect: '/auth/google/failure'
    })
);

app.get('/signin', userController.findOrCreate);
app.patch('/profile', islogedin, userController.updateProfile)
app.get('/profile/:id', userController.getProfile)
app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('listening on port: ' + port));