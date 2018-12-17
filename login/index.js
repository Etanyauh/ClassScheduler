// Route handler init
const express = require("express");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const path = require("path");
const users = [{username: "test", password:"test"}];

// Start express
const app = express();
app.use(bodyParser.json());


/*
    Static Files
*/
app.get("/main", (req,res) => {
    console.log('hit main page');
    res.sendFile(path.resolve(__dirname, "client", "main.html"));
})

app.get('/', (req,res) => {
    console.log('hit login page');
    res.sendFile(path.resolve(__dirname, "client", "login.html"));
})

app.get("/mainjs", (req,res) => {
    res.sendFile(path.resolve(__dirname, "client", "main.js"));
})

app.get('/loginjs', (req,res) => {
    res.sendFile(path.resolve(__dirname, "client", "login.js"));
})

app.get('/styles', (req,res) => {
    res.sendFile(path.resolve(__dirname, "client", "styles.css"));
})

/*
    API Routes
*/

app.post('/login', (req,res) => {
    // User exists
    if(users.filter(e => e.username === req.body.username && e.password === req.body.password).length > 0){
        console.log('sending back OK login');
        res.send({status: "ok"})
    }
    // user doesn't exist
    else{
        console.log('sending back failed login');
        res.send({status: "failed", message: "Invalid username or password"});
    }
})

app.post('/register', (req,res) => {
    // user exists
    if(users.filter(e => e.username === req.body.username).length === 0){
        users.push({username: req.body.username, password: req.body.password});
        res.send({status:"ok", message: "User successfully created"});
    }
    // user doesn't exist
    else{
        res.send({status:"failed", message:"Username already taken"});
    }
})


// Listener
app.listen(PORT, () => {
    console.log("Server listening on port "+PORT)
});