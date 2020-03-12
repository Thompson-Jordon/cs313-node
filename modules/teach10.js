const connectionString = process.env.LOCALDB_URL;

const { Pool } = require("pg");
const pool = new Pool({ connectionString: connectionString });

exports.getPersons = (req, response) => {
   personID = req.query.id;
   response.setHeader("Content-Type", "application/json");
   
   const sql =
     "SELECT first_name, last_name, date_of_birth FROM persons p WHERE id = $1";
   const values = [personID];
   pool.query(sql, values, function(err, res) {
     if (err) {
       console.log(`Error in query: ${err}`);
     }
     let person = res.rows[0];
     // let fname = person.first_name;
     // let lname = person.last_name;
     // let date = person.date_of_birth;
 
     // console.log(`${fname} ${lname} was born on ${date}`);
     let text = JSON.stringify(person);
    
     response.end(text);
   });
 }
 
exports.getChildren = (req, response) => {
   personID = req.query.id;
   response.setHeader("Content-Type", "application/json");
   
   const sql =
     "SELECT child_id FROM children WHERE parent_id = $1";
   const values = [personID];
   pool.query(sql, values, function(err, res) {
     if (err) {
       console.log(`Error in query: ${err}`);
     }
     let person = res.rows[0];
 
     let text = JSON.stringify(person);
    
     response.end(text);
   });}
 
 exports.getParents = (req, response) => {
   personID = req.query.id;
   response.setHeader("Content-Type", "application/json");
   
   const sql =
     "SELECT parent_id FROM children WHERE child_id = $1";
   const values = [personID];
   pool.query(sql, values, function(err, res) {
     if (err) {
       console.log(`Error in query: ${err}`);
     }
     let person = res.rows[0];
 
     let text = JSON.stringify(person);
    
     response.end(text);
   });
 }