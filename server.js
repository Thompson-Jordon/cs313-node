require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
let postal = require("./modules/postal");
const path = require("path");
const PORT = process.env.PORT || 5000;
let app = express();

// const connectionString = process.env.DATABASE_URL || process.env.LOCALDB_URL;
// const { Pool } = require("pg");
// const pool = new Pool({ connectionString: connectionString });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => res.render("pages/index"));
app.get("/testAjax", (req, res) => res.render("pages/testAjax"));
app.get("/test", (req, res) => {
  const wo = require("./modules/getWorkorders");
  wo.getWoJSON(result => {
    res.json(result);
  });
});
app.get("/workorders", (req, res) => {
  const wo = require("./modules/getWorkorders");
  wo.getWorkorders(function(error, result) {
    if (error || result == null) {
      res.status(500).json({ success: false, data: error });
    } else {
      const params = result;
      res.render("pages/workorders", params);
    }
  });
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
