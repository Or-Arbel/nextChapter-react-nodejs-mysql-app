const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const fileupload = require('express-fileupload');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//express-fileupload
app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: '',
//     database: 'books_library'
// });

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'books_library',
});

app.post('/create', (req, res) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;
    const insertUser = 'INSERT INTO users (fullName, email, password, type) VALUES (?,?,?,?)';
    db.query(insertUser,[name,email,password,type], (err,result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send('Values Inserted');
            console.log(result);
        }
    });
});

app.post('/addBook', (req, res) =>{
    const title = req.body.title;
    const author = req.body.author;
    const image = req.body.image;
    const quantity = req.body.quantity;
    const status = 'Available';
    const insertBook = 'INSERT INTO books (image, title, author, status, quantity) VALUES (?,?,?,?,?)';
    db.query(insertBook,[image, title, author, status, quantity], (err,result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send('Values Inserted');
            console.log(result);
        }
    });
});

app.get('/api/getUsers', (req,res) =>{
    const sqlSelectUsers = "SELECT * FROM users";
    db.query(sqlSelectUsers, (err, result)=>{
        res.send(result);
    });
});

app.get('/api/getBooks', (req,res) =>{
    const sqlSelectBooks = "SELECT * FROM books";
    db.query(sqlSelectBooks, (err, result)=>{
        if(err){console.log(err.message);}
        res.send(result);
    });
});

//upload image files using express-fileupload
app.get('/uploadImage', function(req, res) {
    // console.log(req.files.bookImage); // the uploaded file object
    res.sendFile(__dirname)
  });

app.listen(3002, ()=>{
    console.log("Yay, your server is running on port 3002");
})
