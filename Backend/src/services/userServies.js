const db = require('../config/mySqlDB');

const signIn = async ({ name, email, password}) => {
  try {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const values = [name, email, password];
    const result = await new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return result ? true : false;
  } catch (error) {
    console.error("Someting wrong in signIn", error.message);
  }
};

const logIn = async ({ email, password }) => {
  try {
    const query = 'SELECT email FROM users WHERE email = ? AND password = ?';
    const values = [email, password];
    const result = await new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return result ? result : false;
  } catch (error) {
    console.error("Someting wrong in logIn", error.message);
  }
};

module.exports = {
  signIn,
  logIn,
};