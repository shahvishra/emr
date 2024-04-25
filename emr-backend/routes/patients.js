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
    connection.connect();
  connection.query(`SELECT * FROM PATIENTS`, (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ message: "Error querying database" });
      return;
    }

    res.status(200).json({ patients: results });
  });
});

router.post("/save", (req, res) => {
  try {
    const {
      title,
      firstName,
      middleName,
      lastName,
      gender,
      dob,
      phoneNumber,
      address1,
      address2,
      city,
      state,
      zip,
      referredBy
    } = req.body;
    const [{ insertId }] = connection.query(
      `INSERT INTO PATIENTS (INTERNALID, TITLECODE, FIRSTNAME, MIDDLENAME, SURNAME, DOB, SEXCODE, ADDRESS1, ADDRESS2, CITY, POSTCODE, HOMEPHONE, PLACEOFBIRTH, COUNTRYOFBIRTH, REFERRINGDOCTOR) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        4,
        title,
        firstName,
        middleName,
        lastName,
        dob,
        gender,
        address1,
        address2,
        city,
        zip,
        phoneNumber,
        city,
        state,
        referredBy
      ],
      (err, results) => {
        if (err) {
          console.error("Error inserting into database:", err);
          res.status(500).json({ message: "Error inserting into database" });
          return;
        } else {
            console.log(results);
            res.status(200);
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

module.exports = router;
