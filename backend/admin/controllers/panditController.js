const Pandit = require('../models/panditModel');

const panditController = {
 
  addPandit: (req, res) => {
    const {
      fname, mname, lname, gender, primaryContact, alternateContact, email,
      highestQualification, currentAddress, city, state, pincode, country,
      dob, languages, services, experience, bio, availability,
      socialMediaLinks, certifications, emergencyContact,
      bankAccountDetails, specialRequirements
    } = req.body;

    // Replace undefined values with null and serialize arrays/objects
    const panditData = {
      fname: fname ?? null,
      mname: mname ?? null,
      lname: lname ?? null,
      gender: gender ?? null,
      primaryContact: primaryContact ?? null,
      alternateContact: alternateContact ?? null,
      email: email ?? null,
      highestQualification: highestQualification ?? null,
      currentAddress: currentAddress ?? null,
      city: city ?? null,
      state: state ?? null,
      pincode: pincode ?? null,
      country: country ?? null,
      dob: dob ?? null,
      languages: languages ? JSON.stringify(languages) : null,
      services: services ? JSON.stringify(services) : null,
      experience: experience ?? null,
      bio: bio ?? null,
      availability: availability ? JSON.stringify(availability) : null,
      socialMediaLinks: socialMediaLinks ? JSON.stringify(socialMediaLinks) : null,
      certifications: certifications ?? null,
      emergencyContact: emergencyContact ?? null,
      bankAccountDetails: bankAccountDetails ? JSON.stringify(bankAccountDetails) : null,
      specialRequirements: specialRequirements ?? null
    };

    Pandit.create(panditData, (err, result) => {
      if (err) {
        console.error('Error adding Pandit:', err);
        return res.status(500).json({ error: 'Failed to add Pandit' });
      }
      res.status(201).json({ message: 'Pandit added successfully', panditId: result.insertId });
    });
  },


  // Retrieving all Pandits from the database
  getAllPandits: (req, res) => {
    Pandit.getAll((err, results) => {
      if (err) {
        console.error('Error retrieving Pandits:', err);
        return res.status(500).json({ error: 'Failed to retrieve Pandits' });
      }
      res.status(200).json(results);
    });
  },

  getPanditById: (req, res) => {
    const panditId = parseInt(req.params.id, 10); // Extract and convert the ID from the URL parameters

    if (isNaN(panditId)) {
      return res.status(400).json({ error: 'Invalid Pandit ID' });
    }

    Pandit.getById(panditId, (err, result) => {
      if (err) {
        console.error('Error retrieving Pandit:', err);
        if (err.message === 'Pandit not found') {
          return res.status(404).json({ error: 'Pandit not found' });
        }
        return res.status(500).json({ error: 'Failed to retrieve Pandit' });
      }
      res.status(200).json(result);
    });
  },

  
  updatePandit: (req, res) => {
    const panditId = parseInt(req.params.id, 10); // Extract and convert the ID from the URL parameters
    const updateData = req.body; // Get the updated data from the request body

    if (isNaN(panditId)) {
      return res.status(400).json({ error: 'Invalid Pandit ID' });
    }

    Pandit.updateById(panditId, updateData, (err, result) => {
      if (err) {
        console.error('Error updating Pandit:', err);
        if (err.message === 'Pandit not found or no changes made') {
          return res.status(404).json({ error: 'Pandit not found or no changes made' });
        }
        return res.status(500).json({ error: 'Failed to update Pandit' });
      }
      res.status(200).json(result);
    });
  },

  updatePanditStatus: (req, res) => {
    const { panditId } = req.params; // Get panditId from URL parameters
    const { status } = req.body; // Get status from request body

    // Validate status value
    const validStatuses = ['Visible', 'Flagged', 'Removed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    // Update Pandit status in the database
    Pandit.updateStatus(panditId, status, (err, result) => {
      if (err) {
        console.error('Error updating Pandit status:', err);
        return res.status(500).json({ error: 'Failed to update Pandit status' });
      }
      res.status(200).json({ message: 'Pandit status updated successfully' });
    });
  },




  // Additional actions like update, delete, etc., can be added here
};

module.exports = panditController;
