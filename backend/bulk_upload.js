const mysql = require('mysql2');
const xlsx = require('xlsx');
const path = require('path');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'apnapandit'
});

// Path to the Excel file
const filePath = path.join(__dirname, 'cityFinal.xlsx');

// Read the Excel file
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);

// Insert data into MySQL
data.forEach((row) => {
  const query = 'INSERT INTO city SET ?';
  connection.query(query, row, (error, results) => {
    if (error) throw error;
    console.log('Row inserted:', results.insertId);
  });
});

// Close the connection
connection.end();
