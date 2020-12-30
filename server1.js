const { response } = require('express');
const express = require('express');
const cors = require('cors'); 
const knex = require('knex');
const bcrypt = require('bcrypt'); 
const register = require('./controllers/register');
const { handleLogin } = require('./controllers/signin');
const image = require('./controllers/image');
const {handleProfile} = require('./controllers/profile')
const db = knex({
    client: 'pg', 
    connection: {
        host: 'postgresql-tapered-25698', 
        port: '5433',
        user: 'postgres', 
        password: '42isholistic', 
        database: 'smartbrain'
    }
});


const app = new express();
const port = 8560; 



app.use(express.json());
app.use(cors());


app.post('/signin', (req, res) =>{handleLogin(req,res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res)=>{handleProfile(req, res, db)})

app.put('/image', (req, res)=>{image.handleImage(req, res, db)})

app.post('/imageurl',(req, res) => {image.handleApiCall(req, res)} )

app.listen(process.env.PORT || port, ()=> {
    console.log("app is running on port: "+String(process.env.PORT));
})