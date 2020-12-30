
    handleLogin = (req, resp, db, bcrypt) => {
    const {email, password} = req.body; 

    
    if (!email || !password){
        return res.status(400).json("Incorrect form submission");
       }
    db('login').select('email', 'hash').from("login").where("email", "=", email)
    .then(data => {
            if(data[0]){
            bcrypt.compare(password, data[0].hash , function(err, res){
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