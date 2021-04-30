require("dotenv").config();

const USER = process.env.DB_ADMIN;
const PASSWORD = process.env.DB_ADMIN_PASSWORD;
const DB_NAME = process.env.DB_NAME;

db.createUser({
  user: USER,
  pwd: PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: DB_NAME,
    },
  ],
});
