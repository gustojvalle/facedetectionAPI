const Clarifai = require('clarifai');



//Setting upp the API to call 
const app = new Clarifai.App({
    apiKey: '9a747812debe41e3afb5bbb14aed1936'
   });
  
const handleApiCall = (req, res) => {
    console.log(req.body.input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL,`${req.body.input}`,{maxConcepts:1})
    .then(data => {
        res.json(data); 
        console.log(data); 
    }).catch(err => res.status(400).json("Api is not available"))
}


handleImage = (req, res, db) => {
    const {id} = req.body; 
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    }).catch(err => res.status(400).json("not working"))
}
module.exports = {
    handleImage: handleImage, 
    handleApiCall: handleApiCall
}