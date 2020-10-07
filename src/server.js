var mysql = require("mysql");
var cors = require("cors");
var express = require("express");
var app = express();

app.use(cors());
app.listen(4000, () => console.log(`Listening at 4000`));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "names",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully connected");
  }
});
// const DELETE_QUERY = "delete from name limit 4";
const SELECT_QUERY = "select * from name";

connection.query(SELECT_QUERY, (err, res, fields) => {
  console.log(res);
});

app.get("/names/add", (req, res) => {
  const { id, name } = req.query;
  const INSERT_QUERY = `INSERT INTO name(id, name) values(${id}, '${name}')`;
  connection.query(INSERT_QUERY, (err, rows) => {
    if (err) {
      return res.send(err);
    } else {
      res.send("Successfully added");
    }
  });
});

app.get("/names", (req, res) => {
  const SELECT_QUERY = "select * from name";
  connection.query(SELECT_QUERY, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        data: rows,
      });
    }
  });
});
