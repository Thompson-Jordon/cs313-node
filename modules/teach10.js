const connectionString = process.env.DATABASE_URL || process.env.LOCALDB_URL;

const { Pool } = require("pg");
const pool = new Pool({ connectionString: connectionString });

exports.getPersons = (req, res) => {
  console.log("getting person info.");

  let id = req.query.id;
  console.log("Looking for id:", id);

  getPersonFromDb(id, function(error, result) {
    if (error || result == null || result.length != 1) {
      res.status(500).json({ success: false, data: error });
    } else {
      console.log("Back from the database with result:", result);
      res.json(result);
    }
  });
};

exports.getChildren = (req, response) => {
  let personID = req.query.id;
  response.setHeader("Content-Type", "application/json");

  const sql = "SELECT child_id FROM children WHERE parent_id = $1";
  const values = [personID];
  pool.query(sql, values, function(err, res) {
    if (err) {
      console.log(`Error in query: ${err}`);
    }
    let person = res.rows[0];

    let text = JSON.stringify(person);

    response.end(text);
  });
};

exports.getParents = (req, response) => {
  let personID = req.query.id;
  response.setHeader("Content-Type", "application/json");

  const sql = "SELECT parent_id FROM children WHERE child_id = $1";
  const values = [personID];
  pool.query(sql, values, function(err, res) {
    if (err) {
      console.log(`Error in query: ${err}`);
    }
    let person = res.rows[0];

    let text = JSON.stringify(person);

    response.end(text);
  });
};

function getPersonFromDb(id, callback) {
  console.log("getPersonFromDB called with id:", id);

  let sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";
  let params = [id];

  pool.query(sql, params, function(err, result) {
    if (err) {
      console.log("error:", err);
      callback(err, null);
    }

    console.log("Found DB result: " + JSON.stringify(result.rows));
    callback(null, result.rows);
  });
}
