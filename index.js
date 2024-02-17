const express = require("express");
const Sequelize = require("sequelize");

const app = express();
const urlencodedParser = express.urlencoded({extended: false});
app.set("view engine", "ejs");

const sequelize = new Sequelize({
   dialect: "sqlite",
   storage: "requests.db",
   define: {
      timestamps: true,
   },
});

app.use(express.static("fonts"));
app.use(express.static("images"));
app.use(express.static("scripts"));
app.use(express.static("styles"));


const Request = sequelize.define("request", {
   name: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   phone: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   car: {
      type: Sequelize.STRING,
      allowNull: false,
   },
});

sequelize.sync().then(result => {
   // console.log(result);
}).catch(error => {
   console.log(error);
});

app.get("/", function (request, response) {
   response.sendFile(__dirname + "/index.html");
});

app.post("/", urlencodedParser, function(request, response) {
   if (!request.body) return response.sendStatus(400);
   Request.create({
      name: request.body.name,
      phone: request.body.phone,
      car: request.body.car,
   }).then(result => {
      console.log(result);
      response.sendFile(__dirname + "/responseSuccess.html");
   }).catch(error => {
      console.log(error);
      response.sendFile(__dirname + "/responseFail.html");
   });
   /* Request.findAll({ raw: true }).then(requests => {
      console.log(requests);
   }).catch(error => console.log(error)); */
});

let port = 3000;
let host = "127.0.0.1";

app.listen(port, host, () => { console.log(`Сервер начал прослушивание запросов\nПорт: ${port}\nХост: ${host}\nАдрес: http://${host}:${port}`)});