require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
let postal = require("./modules/postal");
const path = require("path");
const PORT = process.env.PORT || 5000;
let app = express();

const connectionString = process.env.DATABASE_URL || process.env.LOCALDB_URL;

const { Pool } = require("pg");
const pool = new Pool({ connectionString: connectionString });

let teach10 = require('./modules/teach10');
app.get("/getPerson", teach10.getPersons);
app.get("/getParents", teach10.getParents);
app.get("/getChildren", teach10.getChildren);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => res.render("pages/postal"));
app.post("/rates", postal.displayRates);
app.get("/cool", (req, res) => res.send(cool()));
app.get("/times", (req, res) => res.send(showTimes()));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

showTimes = () => {
  let result = "";
  const times = process.env.TIMES || 5;
  for (i = 0; i < times; i++) {
    result += i + " ";
  }
  return result;
};
