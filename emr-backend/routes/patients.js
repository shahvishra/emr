const express = require("express");
const connection = require("../db-connection/connection");
const router = express.Router();

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

router.get("", (req, res) => {
  connection.query(`SELECT * FROM PATIENTS`, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ message: "Error querying database" });
      return;
    }

    res.status(200).json({ patients: results });
  });
});

// router.get("", (req, res) => {
//   try {
//     connection.connect((err) => {
//       if (err) {
//         console.error("Error connecting to MySQL database:", err);
//         return;
//       }
//       console.log("Connected to MySQL database");
//     });
//     const data = connection.query(`SELECT * FROM PATIENTS`);
//     console.log(data);
//     res.status(200).json({
//       user: data[0][0],
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err,
//     });
//   } finally {
//     connection.end();
//   }
// });

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = connection
      .promise()
      .query(`SELECT *  from patients where INTERNALID = ?`, [id]);
    res.status(200).json({
      user: data[0][0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

module.exports = router;
