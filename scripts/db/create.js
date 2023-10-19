const mysql = require('mysql2');

require('dotenv').config();

const {
  DDD_FORUM_DB_USER,
  DDD_FORUM_DB_PASS,
  DDD_FORUM_DB_HOST,
  DDD_FORUM_DB_DEV_DB_NAME,
  DDD_FORUM_DB_TEST_DB_NAME,
  NODE_ENV
} = process.env;

const dbName = NODE_ENV === "development"
  ? DDD_FORUM_DB_DEV_DB_NAME
  : DDD_FORUM_DB_TEST_DB_NAME

function connectToDb() {
  const connection = mysql.createConnection({
    host: DDD_FORUM_DB_HOST,
    user: DDD_FORUM_DB_USER,
    password: DDD_FORUM_DB_PASS
  });

  connection.connect((err) => {
    if (err) {
      console.log("Error trying to connect to DB: " + err)
      console.log("Retrying to connect...")
      setTimeout(connectToDb, 3000);
    }

    connection.query(`CREATE DATABASE ${dbName}`, (err, result) => {
      if (err && err.code === "ER_DB_CREATE_EXISTS") {
        console.log('Db already created');
        process.exit(0);
      }

      if (err) {
        console.log("Error trying to connect to DB: " + err)
        console.log("Retrying to connect...");
        setTimeout(connectToDb, 3000);
      }

      console.log('Deleted db');
      process.exit(0);
    })
  })
}

// Add 60 second timeout
setTimeout(() => {
  console.log("Timeout limit reached");
  process.exit(1);
}, 60000);

connectToDb();
