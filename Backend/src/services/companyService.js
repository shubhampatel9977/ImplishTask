const db = require('../config/mySqlDB');

const getAllCompany = async() => {
  try {
    const query = 'SELECT * FROM company';
    const result = await new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return result ? result : false;
  } catch (error) {
    console.error("Someting wrong in getAllCompanys", error.message);
  }
}

const getCompanyById = async(id) => {
  try {
    const query = 'SELECT * FROM company WHERE code = ?';
    const values = [id];
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
    console.error("Someting wrong in getComapnyById", error.message);
  }
}

const createCompany = async(payload) => {
  try{
    const { name, machines, area, link, frequency, c_number, remark } = payload;
    const query = 'INSERT INTO company (name, machines, area, link, frequency, c_number, remark) VALUES (?,?,?,?,?,?,?)';
    const values = [name, machines, area, link, frequency, c_number, remark];

    await new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const insertedRecord = await new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM company WHERE code = LAST_INSERT_ID()';
      db.query(selectQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      });
    });

    const updatedPayload = { ...payload, ...insertedRecord };
    return updatedPayload;
  } catch (error) {
    console.error("Someting wrong in createCompany", error.message);
  }
}

const updateCompanyById = async(id, payload) => {
  try{
    const { name, machines, area, link, frequency, c_number, remark } = payload;
    const query = 'UPDATE company SET name = ?, machines = ?, area = ?, link = ?, frequency = ?, c_number = ?, remark = ? WHERE code = ?';
    const values = [name, machines, area, link, frequency, c_number, remark, id];
    await new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log('result-123-->', result);
          resolve(result);
        }
      });
    });

    const updatedRecord = await new Promise((resolve, reject) => {
      const selectQuery = 'SELECT * FROM company WHERE code = ?';
      db.query(selectQuery, [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      });
    });
    return updatedRecord;
  } catch (error) {
    console.error("Someting wrong in updateCompanyById", error.message);
  }
}

const deleteCompanyById = async(id) => {
  try {
    const query = 'DELETE FROM company WHERE code = ?';
    const values = [id];
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
    console.error("Someting wrong in deleteCompanyById", error.message);
  }
}

module.exports = {
  getAllCompany,
  getCompanyById,
  createCompany,
  updateCompanyById,
  deleteCompanyById
};