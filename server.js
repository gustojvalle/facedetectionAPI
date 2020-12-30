const { response } = require('express');
const express = require('express');
const bcrypt = require('bcrypt'); 
const cors = require('cors'); 

cors

const app = new express();
const port = 8560; 

app.use(express.json())
app.use(cors());

const database= {
    users: [
        {
            id : "123",
            name: "John",
            email: "john@gmail.com",
            password: "hello",
            entries: 0,
            joined: new Date(), 
        },
        {
            id : "435",
            name: "Laura",
            email: "laura@gmail.com",
            entries: 0,
            joined: new Date(), 
        }, 
    ], 
    login: [
        {
            id: '987', 
            hash: '',  
            email: 'john@gmail.com' 
        }
    ]
}
app.get('/', (req,res)=> {
    res.send(database.users);
})


app.post('/signin', (req, res) => {
    // const hash = "$2b$10$K/RYLTHJfXZ2wRQt/894Ru4CoAfkBVipsnoTIKe32KLXVWAEqq2Ri";
    // bcrypt.compare("helluo", hash , function(err, res){
    //     console.log(res);
    // });

    // bcrypt.compare("fuck", hash , function(err, res){
    //     console.log(res); 
    // });

    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.status(200).json("success"); 
    }else{
        res.status(404).json("Error loggingin");
    }
})

app.post('/register', (req, res)=>{
    const saltRounds = 10;
    const {email, name, password} = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash){
        console.log(hash)
    }); 
    database.users.push({
        id: '234',
        name: name,
        email: email, 
        password: password, 
        entries: 0, 
        joined: new Date() 
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res)=>{
    const {id} = req.params; 
    let found = false;
    database.users.forEach(user=> {
        if(user.id == id){
            found = true;
            res.json(user);
        }
    })
    if(!found){
        res.status(404).json("no Such user");
    }
})

app.post('/image', (req, res)=> {
    const {id} = req.body; 
    let found = false;
    database.users.forEach(user=> {
        if(user.id == id){
            found = true;
            user.entries++;
            console.log(user.entries)
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(404).json("no Such user");
    }
})







// bcrypt.compare("bacon", null, null, function(err, res){

// }); 



app.listen(port, ()=> {
    console.log("app is running on port: "+String(port));
})