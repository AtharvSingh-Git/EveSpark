const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt'); 
const Cookieparser =  require('cookie-parser');
const app = express();
const PORT = 7000;
const saltRounds = 10;
app.use(express.json());
app.use(Cookieparser());

const uploadDirectory = path.join(__dirname, 'uploads'); 
app.use('/uploads', express.static(uploadDirectory));


const database = 'eventdatabase';
const username = 'root';
const password = '1234';
const host = 'localhost';

// Connect to the database
const connection = mysql.createConnection({
  host: host,
  user: username,
  password: password,
  database: database
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit the process on connection error
  } else {
    console.log('Connected to database successfully');
    // Create the users table if it doesn't exist
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL
    )
`;
  connection.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating table:', err);
        return;
    }
    console.log('Users table created successfully');
});
    connection.query('ALTER TABLE club MODIFY COLUMN createdAt DATETIME DEFAULT CURRENT_TIMESTAMP', (err) => {
        if (err) {
          console.error('Error adding createdAt column:', err);
        } else {
          console.log('createdAt column added successfully');
        }
    });
    connection.query('ALTER TABLE club MODIFY COLUMN updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP', (err) => {
        if (err) {
          console.error('Error adding UpdatedAt column:', err);
        } else {
          console.log('createdAt column added successfully');
        }
    });
    connection.query('ALTER TABLE events MODIFY COLUMN createdAt DATETIME DEFAULT CURRENT_TIMESTAMP', (err) => {
      if (err) {
        console.error('Error adding createdAt column:', err);
      } else {
        console.log('createdAt column added successfully');
      }
  });
  connection.query('ALTER TABLE events MODIFY COLUMN updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP', (err) => {
      if (err) {
        console.error('Error adding UpdatedAt column:', err);
      } else {
        console.log('createdAt column added successfully');
      }
  });
  }
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/uploads')); // Change 'uploads/' to your desired upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Enable CORS (adjust origins as needed)
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000'], // Replace with your frontend's origin
  methods: ["POST","GET"],
  credentials: true, // Allow credentials
  optionsSuccessStatus: 200 // Indicates to the browser that the preflight OPTIONS request was successful
}));


//---------------------------------SIGNUP--------------------------------------------

app.post('/sign-up', (req, res) => {
  const { name, email, password,role } = req.body;

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
          console.error("Error while hashing password:", err);
          return res.status(500).json({ error: "Error while hashing password" });
      }

      // Use parameterized query to insert data into the database
      const sql = "INSERT INTO `users` (`name`, `email`, `password` ,`role`) VALUES (?, ?, ?, ?)";
      const values = [name, email, hashedPassword ,role];

      connection.query(sql, values, (err, result) => {
          if (err) {
              console.error("Error while inserting data into the database:", err);
              return res.status(500).json({ error: "Error while inserting data into the database" });
          }
          console.log("Data inserted successfully:", result);
          return res.json({ status: "Success" });
      });
  });
});

//---------------------------------LOGIN--------------------------------------------

app.post('/login',(req ,res) => {
  const sql = 'SELECT *  FROM users WHERE email = ?';
  connection.query(sql, [req.body.email], (err, data) => {
      if (err) {
          return res.status(500).json({ error: "Internal server error" });
      }
  
      if (data.length === 0) {
          return res.status(404).json({ error: "No user found with this email" });
      }
  
      const user = data[0];
      bcrypt.compare(req.body.password.toString(), user.password, (err, response) => {
          if (err) {
              return res.status(500).json({ error: "Internal server error" });
          }
  
          if (response) {
            return res.status(201).json({
                
                
                email: user.email,
                
            });
          } else {
            return res.status(401).json({ error: "Incorrect email or password" });
          }
      });
  });    
})


app.post('/event', upload.single('Image'), async (req, res) => {
  
  const { Title, Club, Starttime, Endtime, Date, Volunteersreq, fee, Description } = req.body;
  const Image = req.file ? req.file.path : null;
  const insertQuery = `INSERT INTO events (Title, Club, Starttime, Endtime, Date, Volunteersreq, fee, Description, Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values =  [Title, Club, Starttime, Endtime, Date, Volunteersreq, fee, Description, Image];
  connection.query(insertQuery, values, (error, result) => {
    if (error) {
      console.error('Error creating event:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json({ message: 'Registration successful!' });
  });
  
});
// GET request to fetch all clubs
app.get('/club', async (req, res) => {
  connection.query('SELECT * FROM club', (error, results) => {
    if (error) {
      console.error('Error fetching clubs:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(results);
  });
});




connection.query('CREATE DATABASE IF NOT EXISTS eventdatabase', (err) => {
    if (err) {
        console.error('Error creating database:', err);
        return;
    }

    // Connect to the eventdatabase database
    connection.query('USE eventdatabase', (err) => {
        if (err) {
            console.error('Error selecting database:', err);
            return;
        }
        connection.query(`
          CREATE TABLE IF NOT EXISTS attendancelist (
              id INT AUTO_INCREMENT PRIMARY KEY,
              regnum VARCHAR(255) NOT NULL,
              name VARCHAR(255) NOT NULL,
              event_name TEXT,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )`, 
          (err) => {
              if (err) {
                  console.error('Error creating table attendancelist:', err);
              }
          }
        );

        connection.query(`
          CREATE TABLE IF NOT EXISTS events (
              eventid INT AUTO_INCREMENT PRIMARY KEY,
              Title VARCHAR(255) NOT NULL,
              Club VARCHAR(255) NOT NULL,
              Starttime TIME,
              Endtime TIME,
              Date DATETIME,
              Volunteersreq INT,
              fee INT,
              Description TEXT,
              Image VARCHAR(255),
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )`, 
          (err) => {
              if (err) {
                  console.error('Error creating table events:', err);
              }
          }
        );
        connection.query(`
          CREATE TABLE IF NOT EXISTS club (
              id INT AUTO_INCREMENT PRIMARY KEY,
              ClubName VARCHAR(255) NOT NULL,
              quote VARCHAR(255),
              Description TEXT,
              ClubPresident VARCHAR(255),
              eventLead VARCHAR(255),
              clubEmail VARCHAR(255),
              photo VARCHAR(255),
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )`, 
          (err) => {
              if (err) {
                  console.error('Error creating table club:', err);
              }
          }
        );

        // Create the user_reg table if it doesn't exist
        connection.query(`CREATE TABLE IF NOT EXISTS user_reg(
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            regNum VARCHAR(255) NOT NULL ,
            registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            payment TEXT,
            reg_event TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table user_reg:', err);
            }
        });

        
        connection.query(`CREATE TABLE IF NOT EXISTS club_feeconnectionack(
            id INT AUTO_INCREMENT PRIMARY KEY,
            club_name VARCHAR(50) NOT NULL,
            rating TINYINT,
            feeconnectionack TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table club_feeconnectionack:', err);
            }
        });
        
        connection.query(`CREATE TABLE IF NOT EXISTS volunteer_reg(
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          regNum VARCHAR(255) NOT NULL ,
          club_name VARCHAR(50) NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating table volunteer_reg:', err);
            }
        });
    });
});
app.post('/register', upload.none(),(req, res) => {
  
  const { regnum,name,event_name } = req.body; // Destructure regnum from request body

  connection.query('INSERT INTO eventdatabase.attendancelist (regnum,name,event_name) VALUES (?,?,?)', [regnum,name,event_name], (error, result) => {
    if (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Data inserted successfully:', result);
      return res.json({ message: 'Registration successful!' });
    }
  });
});

app.get('/register', (req, res) => {
  const sql = 'SELECT * FROM attendancelist';
  connection.query(sql, (err, data) => {
      if (err) {
          return res.json(err);
      } else {
          return res.json(data);
      }
  });
});
app.get('/user2', (req, res) => {
    const sql = 'SELECT * FROM user_reg';
    connection.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
});

app.post('/user', upload.single('payment'), (req, res) => {
  // Check if req.body exists and contains the expected properties
  if (!req.body || !req.body.name || !req.body.regNum) {
      return res.status(400).json({ error: 'Missing required fields in request body' });
  }

  // Destructure properties from req.body
  const { name, regNum } = req.body;

  // Extract payment and reg_event from req.file
  const payment = req.file ? req.file.path : null;
  const reg_event = req.file ? req.file.path : null;

  const sqlInsert = "INSERT INTO user_reg (name, regNum, payment, reg_event) VALUES (?, ?, ?, ?)";
  const values = [name, regNum, payment, reg_event];

  connection.query(sqlInsert, values, (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ error: 'Error registering' });
      } else {
          console.log('Data inserted successfully:', result);
          return res.json({ message: 'Registration successful!' });
      }
  });
});



app.get('/feeconnectionack', (req, res) => {
    const sql = 'SELECT * FROM club_feeconnectionack';
    connection.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
});

app.post('/feeconnectionack', upload.none(), (req, res) => {
    const { club_name, rating, feeconnectionack } = req.body;
  
    connection.query('INSERT INTO club_feeconnectionack (club_name, rating, feeconnectionack) VALUES (?, ?, ?)', [club_name, rating, feeconnectionack], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Error saving feeconnectionack' }); // More descriptive error message
      } else {
        console.log('Feeconnectionack Recorded:', result);
        return res.json({ message: 'Feeconnectionack Received' });
      }
    });
  });

  function getUserData() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user_reg';
      connection.query(sql, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const user = data[0]; 
          if (user) {
            const userData = {
              name: user.name,
              registrationNumber: user.regNum,
              
              profilePicture: './user.jpg', 
              department: user.department, 
              registeredEvents: [], 
              pastEvents: [], 
              volunteerEvents: [], 
            };
  
            const registeredEventsSql = 'SELECT * FROM registered_events WHERE user_id = ?';
            connection.query(registeredEventsSql, [user.id], (err, events) => {
              if (err) {
                console.error('Error fetching registered events:', err);
              } else {
                userData.registeredEvents = events.map((event) => ({
                  name: event.event_name,
                  hosteconnectiony: event.hosted_by,
                }));
              }
              resolve(userData);
            });
          } else {
            resolve({ message: 'No user found' }); 
          }
        }
      });
    });
  }
  app.get('/volunteer', (req, res) => {
    const sql = 'SELECT * FROM volunteer_reg';
    connection.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
});
// DELETE request to delete an event
app.delete('/event/:eventId', (req, res) => {
  const eventId = req.params.eventId;

  const deleteQuery = 'DELETE FROM event WHERE id = ?';

  connection.query(deleteQuery, [eventId], (error, results) => {
    if (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Event deleted successfully');
      res.json({ message: 'Event deleted successfully' });
    }
  });
});
app.delete('/register/:registerId', (req, res) => {
  const registerId = req.params.registerId;

  const deleteQuery = 'DELETE FROM attendancelist WHERE id = ?';

  connection.query(deleteQuery, [registerId], (error, results) => {
    if (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Event deleted successfully');
      res.json({ message: 'Event deleted successfully' });
    }
  });
});

app.post('/volunteer', upload.none(), (req, res) => {
  const { name, regNum, clubName } = req.body;
  connection.query('INSERT INTO volunteer_reg (name, regNum, club_name) VALUES (?, ?, ?)', [name, regNum, clubName], (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ error: 'Error registering' });
      } else {
          console.log('Data inserted successfully:', result);
          return res.json({ message: 'Registration successful!' });
      }
  });
});

app.post('/club', upload.single('photo'), (req, res) => {
  const { ClubName, quote, Description, ClubPresident, eventLead, clubEmail } = req.body;
  const photo = req.file ? req.file.path : null; // Set photo to null if no file uploaded
  
  const sql = `INSERT INTO club (ClubName, quote, Description, ClubPresident, eventLead, clubEmail, photo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [ClubName, quote, Description, ClubPresident, eventLead, clubEmail, photo];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error('Error creating club:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json({ message: 'Registration successful!' });
  });
});


app.get('/events', async (req, res) => {
  connection.query('SELECT * FROM events', (error, results) => {
    if (error) {
      console.error('Error fetching event:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json(results);
  });
});



// Start the server
app.listen(7000, () => {
  console.log('Server is running on port 7000');
});