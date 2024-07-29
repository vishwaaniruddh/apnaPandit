// create Pandit
url = 'localhost:3000/';

create / update 
Route  : url/api/admin/pandits
structure: 
{
    "fname": "John",
    "mname": "A.",
    "lname": "Doe",
    "gender": "Male",
    "primaryContact": "+1234567890",
    "alternateContact": "+0987654321",
    "email": "john.doe@example.com",
    "highestQualification": "Master's in Vedic Studies",
    "currentAddress": "123 Vedic Lane, Dharma City",
    "city": "Dharma City",
    "state": "Karma State",
    "pincode": "123456",
    "country": "India",
    "dob": "1980-01-01",
    "languages": ["Sanskrit", "Hindi", "English"],
    "services": ["Astrology", "Puja", "Spiritual Counseling"],
    "experience": 15,
    "bio": "Experienced Pandit with over 15 years of expertise in various Vedic rituals and spiritual guidance.",
    "availability": {
      "monday": "09:00-17:00",
      "tuesday": "09:00-17:00",
      "wednesday": "09:00-17:00",
      "thursday": "09:00-17:00",
      "friday": "09:00-17:00",
      "saturday": "10:00-14:00",
      "sunday": "Closed"
    },
    "socialMediaLinks": {
      "facebook": "https://facebook.com/johndoe",
      "instagram": "https://instagram.com/johndoe",
      "twitter": "https://twitter.com/johndoe"
    },
    "certifications": "Certified Vedic Astrologer, Spiritual Healer",
    "emergencyContact": "+1122334455",
    "bankAccountDetails": {
      "accountNumber": "1234567890",
      "ifscCode": "ABC1234",
      "bankName": "Dharma Bank"
    },
    "specialRequirements": "Requires specific rituals materials provided by the client."
  }
  Response : {"message":"Pandit added successfully","panditId":1}


  delete pandit :
  url/api/admin/pandits/2/status
  {
    "status": "Removed"
  }
  {"message":"Pandit status updated successfully"}