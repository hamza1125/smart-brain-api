const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_HOST,
    port : 5432,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PW,
    database : process.env.DATABASE_DB
  }
});



const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res)=> {
	res.send('SUCCESS')
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) } )

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)} )

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3001, () => {
	console.log('app is running')
})




/*

root route that responds with this is working
/ --> res = this is working

/signin --> POST  responds w// SUCCESS or FAIL

/register --> POST responds w/ user created

/profile/:userId --> GET = user

/image --> PUT --> updated user 

*/