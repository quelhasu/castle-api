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
  res.setHeader('Content-Type', 'application/json');
  // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  // res.setHeader("Access-Control-Allow-Credentials", true);
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
    return null;
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});

app.get("/hotel/:destination/:id", function(req, res){
  var id = req.params.id;
  var destination = req.params.destination;
  var ref = db.ref(`/hotels/${destination}`);

  ref.orderByChild('id').equalTo(id).on("value", function(snapshot){
    console.log(snapshot.val());
    res.json(snapshot.val());
  });
})

// Definition et mise en place du port d'écoute
var port = 4000;
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));
