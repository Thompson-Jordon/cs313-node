const connectionString = process.env.DATABASE_URL || process.env.LOCALDB_URL;
const { Pool } = require("pg");
const pool = new Pool({ connectionString: connectionString });

exports.getWorkorders = callback => {
  let sql =
    "SELECT w.id As id, l.name AS location, d.name AS device, to_char(w.start_date, 'mm/dd/yyyy') AS start_date, to_char(w.end_date, 'mm/dd/yyyy') AS end_date, w.priority AS priority, a.first_name as first_name, a.last_name as last_name, w.description AS description FROM ( ( ( workorder w INNER JOIN device d ON w.device_id = d.id ) INNER JOIN location l ON d.location_id = l.id) INNER JOIN account a ON w.user_id = a.id )";
  pool.query(sql, function(err, result) {
    if (err) {
      console.log("Error in query", err);
      callback(err, null);
    } else {
      // console.log("Found result:", JSON.stringify(result.rows));
      callback(null, result);
    }
  });
};

exports.getWoJSON = callback => {
  let text = `<div class="jumbotron jumbotron-fluid bg-secondary">
  <div class="container-fluid form-group border-info rounded bg-light py-3">
    <div class="form-inline">
      <a
        class="btn btn-info mb-3 form-control"
        href="create_wo.php"
        role="button"
        >Create Workorder</a
      >
      <input
        class="form-control mb-2 ml-auto"
        id="myInput"
        type="text"
        placeholder="Search.."
      />
    </div>
    <div class="bg-light">
      <table id="myTable" class="table table-striped table-hover table-sm">
        <thead>
          <tr>
            <th onclick="sortTable(0)">ID</th>
            <th onclick="sortTable(1)">Location</th>
            <th onclick="sortTable(2)">Device</th>
            <th onclick="sortTable(3)">Created</th>
            <th onclick="sortTable(4)">Completed</th>
            <th onclick="sortTable(5)">Priority</th>
            <th onclick="sortTable(6)">Assigned To</th>
            <th onclick="sortTable(7)">Description</th>
          </tr>
        </thead>
        <tbody id="tableBody">`;
  let rows = {};
  this.getWorkorders((error, result) => {
    if (error || result == null) {
      res.status(500).json({ success: false, data: error });
    } else {
      result.rows.forEach(wo => {
        text += `<tr class="clickable-row" data-href="/wo_details?id=${wo.id}">
           <td>${wo.id}</td>
           <td>${wo.location}</td>
           <td>${wo.device}</td>
           <td>${wo.start_date}</td>
           <td>${wo.end_date}</td>
           <td>${wo.priority}</td>
           <td>${wo.first_name} ${wo.last_name}</td>
           <td>${wo.description}</td>
           </tr>`;
      });
      text += `</tbody></table></div></div></div>`;
    }
    callback(text);
  });
};
