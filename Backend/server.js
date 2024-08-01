
const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt'); 
const Cookieparser =  require('cookie-parser');

const app = express();
const saltRounds = 10;
const port = 8000;

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
  }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Cookieparser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
app.use(express.json());

// Create the connection to the database
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '1234',
});

// Create the eventdatabase database if it doesn't exist
db.query('CREATE DATABASE IF NOT EXISTS eventdatabase', (err) => {
    if (err) {
        console.error('Error creating database:', err);
        return;
    }

    // Connect to the eventdatabase database
    db.query('USE eventdatabase', (err) => {
        if (err) {
            console.error('Error selecting database:', err);
            return;
        }

        // Create the user_reg table if it doesn't exist
        db.query(`CREATE TABLE IF NOT EXISTS user_reg(
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

        
        db.query(`CREATE TABLE IF NOT EXISTS club_feedback(
            id INT AUTO_INCREMENT PRIMARY KEY,
            regNum VARCHAR(50) NOT NULL,
            club_name VARCHAR(50) NOT NULL,
            rating TINYINT,
            feedback TEXT,
            image TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating table club_feedback:', err);
            }
        });
        
        db.query(`CREATE TABLE IF NOT EXISTS volunteer_reg(
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          regNum VARCHAR(255) NOT NULL ,
          club_name VARCHAR(50) NOT NULL
      )`, (err) => {
          if (err) {
              console.error('Error creating table volunteer_reg:', err);
          }
      });

      const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users3 (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          reg_num VARCHAR(15) NOT NULL UNIQUE, 
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(255) NOT NULL
      )`;
        db.query(createTableQuery, (err, result) => {
            if (err) {
                console.error('Error creating table:', err);
                return;
            }
            console.log('Users table created successfully');
        });
    });
});


app.get('/user2', (req, res) => {
    const sql = 'SELECT * FROM user_reg';
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
});

app.post('/user2', upload.single('payment'), (req, res) => {
    const { name, regNum} = req.body;
    const payment = req.file.path;
    const reg_event = req.file.path;
    const sqlInsert = "INSERT INTO user_reg (name, regNum, payment, reg_event) VALUES (?, ?, ?,?)";
    const values = [name, regNum, payment,reg_event];

    db.query(sqlInsert, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Error registering' });
        } else {
            console.log('Data inserted successfully:', result);
            return res.json({ message: 'Registration successful!' });
        }
    });
});

app.get('/userEvents', (req, res) => {
    const { username, regNum } = req.query;
    const sql = 'SELECT * FROM event_registration WHERE username = ? AND regNum = ?';
    db.query(sql, [username, regNum], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        } else {
            return res.json(data);
        }
    });
});

app.get('/feedback', (req, res) => {
    const sql = 'SELECT * FROM club_feedback';
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
});
function getUserData() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user_reg';
      db.query(sql, (err, data) => {
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
            db.query(registeredEventsSql, [user.id], (err, events) => {
              if (err) {
                console.error('Error fetching registered events:', err);
              } else {
                userData.registeredEvents = events.map((event) => ({
                  name: event.event_name,
                  hostedBy: event.hosted_by,
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
app.post('/feedback', upload.none(), (req, res) => {
    const { regNum, club_name, rating, feedback } = req.body;
  
    db.query('INSERT INTO club_feedback (regNum, club_name, rating, feedback) VALUES (?, ?, ?, ?)', [regNum, club_name, rating, feedback], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Error saving feedback' }); // More descriptive error message
      } else {
        console.log('Feedback Recorded:', result);
        return res.json({ message: 'Feedback Received' });
      }
    });
  });

 
  app.get('/volunteer', (req, res) => {
    const sql = 'SELECT * FROM volunteer_reg';
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
});
app.post('/volunteer', upload.none(), (req, res) => {
  const { name, regNum, clubName } = req.body;
  db.query('INSERT INTO volunteer_reg (name, regNum, club_name) VALUES (?, ?, ?)', [name, regNum, clubName], (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ error: 'Error registering' });
      } else {
          console.log('Data inserted successfully:', result);
          return res.json({ message: 'Registration successful!' });
      }
  });
});

app.get('/volunteerEvents', (req, res) => {
    const { username, regNum } = req.query;
    const sql = 'SELECT * FROM volunteer_reg WHERE name = ? AND regNum = ?';
    db.query(sql, [username, regNum], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        } else {
            return res.json(data);
        }
    });
});


app.use(cors({
    origin: ['http://localhost:3001','http://localhost:3000'],
    methods: ["POST","GET"],
    credentials: true
}));

//---------------------------------SIGNUP--------------------------------------------

app.post('/sign-up',upload.none(), (req, res) => {
    const { name, reg_num, email, password, role} = req.body;

    // Hash the password
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error("Error while hashing password:", err);
            return res.status(500).json({ error: "Error while hashing password" });
        }

        // Use parameterized query to insert data into the database
        const sql = "INSERT INTO `users3` (`name`, `reg_num`, `email`, `password` ,`role`) VALUES (?, ? ,?, ?, ?)";
        const values = [name, reg_num, email, hashedPassword ,role];

        db.query(sql, values, (err, result) => {
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
    const sql = 'SELECT * FROM users3 WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
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
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    regNum: user.reg_num
                });
            } else {
                return res.status(401).json({ error: "Incorrect email or password" });
            }
        });
    });    
})

app.get('/', (req, res) => {
    res.json("From backend side");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
