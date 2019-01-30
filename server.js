// Modules
const express = require("express");
const bodyParser = require("body-parser");
const firebase = require("firebase");
const serviceAccount = require("./serviceAccountKey.json");

// Connexion à la base de donnée
if (!firebase.apps.length) {
  let config = serviceAccount;
  firebase.initializeApp(config);
}

const db = firebase.database();


// Definition de l'objet express
const app = express();

// Body Parser
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

// Definition des CORS
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Definition du routeur
// var router = express.Router();
// app.use("/hotel", router);
// require(__dirname + "/controllers/hotelController")(router);

// Definition route Hello
app.get("/hello", function(req, res) {
  res.json("Hello World");
});

app.get("/hotel/:destination", function(req, res){
  var destination = req.params.destination;
  var ref = db.ref("/hotels/"+destination);

  ref.on("value", function (snapshot) {
    var map =[];
    snapshot.forEach(element => {
      map.push(element);
    });
    res.json(map);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});

// Definition et mise en place du port d'écoute
var port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));
