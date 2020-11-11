const app = express();
const express = require('express');
const path = require('path');

let db = require("./db/db.json");

const PORT = process.env.PORT || 7000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('/api/notes', function(req, res) {
    res.json(db);
});

app.post('/api/notes', function(req, res) {
    

    req.body.id = db.length + 1;

    console.log(req.body);

    db.push(req.body);
    res.json(db);

});

app.delete('/api/notes/:id', function(req, res) {
    console.log('parmassss',req.params);
    console.log('array to delete from', db)

    var newDb = []
    
    for(var i =0; i < db.length; i++ ){
        console.log('each dudes id' + db[i].id);

        if(parseInt(req.params.id) !== db[i].id){
            newDb.push(db[i]);
        };
    
    }

    console.log('new DB' , newDb);
    db = newDb
    res.json(db)
});


app.listen(PORT, function() {
    if (PORT) {
        console.log("Server listening on: http://localhost:" + PORT);
    } else {
        console.log(err);
    }
});