
    handleLogin = (req, resp, db, bcrypt) => {
    const {email, password} = req.body; 

    
    if (!email || !password){
        return resp.status(400).json("Incorrect form submission");
       }
    db('login').select('email', 'hasg').from("login").where("email", "=", email)
    .then(data => {
            console.log(data[0])
            if(data[0]){
            bcrypt.compare(password, data[0].hasg , function(err, res){
                console.log(res);
                if(res){
                    db.select('*').from('users').where("email", "=", email)
                    .then(user => {
                        resp.json(user)
                    })
                }else{
                    resp.status(400).json("failed to login")
                }
            }); 
        }else{
            resp.status(400).json("login failed")
        }
    })
}

module.exports = {
    handleLogin:handleLogin
};