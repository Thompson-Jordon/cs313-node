const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
let postal = require("./modules/postal");
const path = require("path");
const PORT = process.env.PORT || 5000;
let app = express();

// db var
const connetionString = (process.env.DATABASE_URL =
"postgres://fptlqtvhqpgabu:ef909df9489569745f9c38dc3d3ce4f6da78649ad4079d068f0355d2391e5086@ec2-18-235-20-228.compute-1.amazonaws.com:5432/d3agrdaabfcv81?ssl=true");
// const connetionString = "postgres://postgres:password@localhost:5432/workorder";
const { Pool } = require("pg");
const pool = new Pool({ connetionString: connetionString });
let sql = "SELECT * FROM device_type";
pool.query(sql, function(err, res) {
  if (err) {
    console.log(`Error in query: ${err}`);
  }

  console.log(`Back from DB with result: ${res}`);
});

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
