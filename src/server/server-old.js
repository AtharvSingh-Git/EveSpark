/* import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // Importing bcrypt without alias
import Cookieparser from 'cookie-parser';

const saltRounds = 10;
const app = express();
app.use(express.json());
app.use(cors());
app.use(Cookieparser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "awbi@2004",
    database: 'signup'
})

app.post('/Signup', (req,res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
        if(err) return res.json({Error: "Error while hashing password"});
        
        const sql = "INSERT INTO login(`name`, `email`, `password`) VALUES (?)";
        const signupInfo = [
            req.body.name,
            req.body.email,
            hashedPassword // Insert the hashed password
        ];

        db.query(sql, [signupInfo], (err, result) => {
            if(err) return res.json({Error: "Error while inserting data in server"});
            return res.json({Status: "Success"})
        });
    });
});

app.listen(8080, () => {
    console.log("Running...");
});
 */