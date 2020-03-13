const connectionString = process.env.DATABASE_URL || process.env.LOCALDB_URL;

const { Pool } = require("pg");
const pool = new Pool({ connectionString: connectionString });

exports.getPersons = (req, res) => {
  let personID = req.query.id;
  console.log("Looking for id:", personID);

  const sql =
    'SELECT first_name, last_name, date_of_birth FROM persons WHERE id=$1::int';
  const values = [personID];
  pool.query(sql, values, function(err, result) {
    if (err || result == null || result.length != 1) {
        res.status(500).json({ success: false, data: err });
    }
    //  let person = result.rows;

    console.log("Found DB result: " + JSON.stringify(result.rows));

    res.json(result.rows);
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
