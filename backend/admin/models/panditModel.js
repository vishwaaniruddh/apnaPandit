const db = require('../../config/db');

const Pandit = {
  // create: (panditData, callback) => {
  //   const query = 'INSERT INTO pandits (name, email, qualifications, experience) VALUES (?, ?, ?, ?)';
  //   db.execute(query, [panditData.name, panditData.email, panditData.qualifications, panditData.experience], callback);
  // },

  create: (data, callback) => {
    // Use parameterized query to insert data
    const sql = `INSERT INTO pandits (fname, mname, lname, gender, primaryContact, alternateContact, email, highestQualification, currentAddress, 
    city, state, pincode, country, dob, languages, services, experience, bio, availability, socialMediaLinks,
     certifications, emergencyContact, bankAccountDetails, specialRequirements)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      data.fname, data.mname, data.lname, data.gender, data.primaryContact, data.alternateContact, data.email, data.highestQualification, data.currentAddress,
      data.city, data.state, data.pincode, data.country, data.dob, data.languages, data.services, data.experience, data.bio, data.availability, data.socialMediaLinks,
      data.certifications, data.emergencyContact, data.bankAccountDetails, data.specialRequirements
    ];

    db.query(sql, values, callback);
  },


  getAll: (callback) => {
    const query = 'SELECT * FROM pandits';
    db.execute(query, callback);
  },

  getById: (id, callback) => {
    // Construct the SQL query
    const sql = `SELECT * FROM pandits WHERE panditId = ?`;

    // Execute the query with the provided id
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      // Ensure the result is not empty
      if (results.length === 0) return callback(new Error('Pandit not found'));
      callback(null, results[0]);
    });
  },

  updateById: (id, data, callback) => {
    // Construct the SQL query
    const sql = `UPDATE pandits SET
      fname = ?, mname = ?, lname = ?, gender = ?, primaryContact = ?, alternateContact = ?, email = ?,
      highestQualification = ?, currentAddress = ?, city = ?, state = ?, pincode = ?, country = ?,
      dob = ?, languages = ?, services = ?, experience = ?, bio = ?, availability = ?,
      socialMediaLinks = ?, certifications = ?, emergencyContact = ?, bankAccountDetails = ?, specialRequirements = ?
      WHERE panditId = ?`;

    // Prepare the values array
    const values = [
      data.fname, data.mname, data.lname, data.gender, data.primaryContact, data.alternateContact, data.email,
      data.highestQualification, data.currentAddress, data.city, data.state, data.pincode, data.country,
      data.dob, JSON.stringify(data.languages), JSON.stringify(data.services), data.experience, data.bio, JSON.stringify(data.availability),
      JSON.stringify(data.socialMediaLinks), data.certifications, data.emergencyContact, JSON.stringify(data.bankAccountDetails), data.specialRequirements,
      id
    ];

    // Execute the query with the provided id and data
    db.query(sql, values, (err, results) => {
      if (err) return callback(err);
      if (results.affectedRows === 0) return callback(new Error('Pandit not found or no changes made'));
      callback(null, { message: 'Pandit updated successfully' });
    });
  },

  updateStatus: (panditId, status, callback) => {
    const query = 'UPDATE pandits SET status = ? WHERE panditId = ?';
    const values = [status, panditId];

    db.query(query, values, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },



  // Additional methods like update, delete, etc., can be added here
};

module.exports = Pandit;
