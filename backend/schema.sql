CREATE TABLE pandits (
    panditId INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(50),
    mname VARCHAR(50),
    lname VARCHAR(50),
    gender ENUM('Male', 'Female', 'Other'),
    primaryContact VARCHAR(15) NOT NULL,
    alternateContact VARCHAR(15),
    email VARCHAR(100) NOT NULL,
    highestQualification VARCHAR(100),
    currentAddress TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10),
    country VARCHAR(50),
    avgRating DECIMAL(3, 2),
    profilePicUrl VARCHAR(255),
    referelCode VARCHAR(50),
    deviceID VARCHAR(100),
    dob DATE,
    languages VARCHAR(255),
    services VARCHAR(255),
    experience INT,
    bio TEXT,
    availability JSON,
    socialMediaLinks JSON,
    certifications TEXT,
    emergencyContact VARCHAR(15),
    bankAccountDetails JSON,
    verificationStatus ENUM('Pending', 'Verified', 'Rejected'),
    subscriptionStatus ENUM('Active', 'Expired'),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    specialRequirements TEXT,
    reviewsCount INT,
    totalBookings INT,
    status ENUM('Visible', 'Flagged', 'Removed') DEFAULT 'Visible'
);


CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(50),
    lname VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    primaryContact VARCHAR(15) NOT NULL,
    currentAddress TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    profilePicUrl VARCHAR(255),
    accountStatus ENUM('Active', 'Inactive', 'Banned'),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE auth (
    authId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('User', 'Pandit') NOT NULL,
    lastLogin TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE reviews (
    reviewId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    panditId INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    reviewText TEXT,
    reviewDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bookingId INT,
    status ENUM('Visible', 'Flagged', 'Removed') DEFAULT 'Visible',
    lastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (panditId) REFERENCES pandits(panditId)
);

CREATE TABLE bookings (
    bookingId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    panditId INT NOT NULL,
    serviceType VARCHAR(100),
    bookingDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    serviceDate DATETIME NOT NULL,
    location TEXT,
    status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') NOT NULL,
    specialRequests TEXT,
    totalCost DECIMAL(10, 2),
    paymentStatus ENUM('Paid', 'Unpaid', 'Partially Paid'),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (panditId) REFERENCES pandits(panditId)
);

CREATE TABLE posts (
    postId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    contentType ENUM('Text', 'Image', 'Video', 'ImageWithText', 'VideoWithText'),
    textContent TEXT,
    mediaUrl VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    visibility ENUM('Public', 'Friends', 'Private') DEFAULT 'Public',
    FOREIGN KEY (userId) REFERENCES auth(authId)
);

CREATE TABLE likes (
    likeId INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    userId INT NOT NULL,
    likedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (postId) REFERENCES posts(postId),
    FOREIGN KEY (userId) REFERENCES auth(authId)
);

CREATE TABLE comments (
    commentId INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    userId INT NOT NULL,
    commentText TEXT,
    commentedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    parentCommentId INT DEFAULT NULL,
    FOREIGN KEY (postId) REFERENCES posts(postId),
    FOREIGN KEY (userId) REFERENCES auth(authId)
);

CREATE TABLE shares (
    shareId INT AUTO_INCREMENT PRIMARY KEY,
    postId INT NOT NULL,
    userId INT NOT NULL,
    sharedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (postId) REFERENCES posts(postId),
    FOREIGN KEY (userId) REFERENCES auth(authId)
);

CREATE TABLE subscriptions (
    subscriptionId INT AUTO_INCREMENT PRIMARY KEY,
    panditId INT NOT NULL,
    subscriptionType VARCHAR(50),
    startDate DATE,
    endDate DATE,
    amountPaid DECIMAL(10, 2),
    paymentStatus ENUM('Paid', 'Unpaid', 'Pending'),
    paymentDate DATE,
    subscriptionStatus ENUM('Active', 'Expired', 'Cancelled'),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (panditId) REFERENCES pandits(panditId)
);

CREATE TABLE state(
    stateId INT(6) AUTO_INCREMENT PRIMARY KEY,
    stateName VARCHAR(50),
    status ENUM('Visible', 'Flagged', 'Removed') DEFAULT 'Visible'
)

CREATE TABLE city(
    cityId INT(6) AUTO_INCREMENT PRIMARY KEY,
    cityName VARCHAR(50),
    latitude VARCHAR(50) DEFAULT NULL,
    longitude VARCHAR(50) DEFAULT NULL,
    stateId INT(6),
    status ENUM('Visible', 'Flagged', 'Removed') DEFAULT 'Visible',
    FOREIGN KEY (stateId) REFERENCES state(stateId)
);
 