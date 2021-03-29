// const { json } = require('express')

const express = require('express');

const session = require('express-session');

const app = express();

const dataService = require('./services/data.service')

app.use(session({

    secret: 'randomsecurestring',
    resave: false,
    saveUninitialized: false

}))

// const app = express();
app.use((req,res,next)=>{
console.log("middleware")
next()
 
})
app.use(express.json());

app.get('/',(req,res)=>{

    res.status(401).send("GET METHOD")
})

app.post('/',(req,res)=>{

    res.send("POST METHOD")
})

app.post('/register',(req,res)=>{
    console.log(req.body);
    const result = dataService.register(req.body.accno,req.body.username,req.body.password)
    // console.log(res.send(result.message));
    // res.status(result.statusCode)
    console.log(res.status(result.statusCode).json(result));
})
app.post('/login',(req,res)=>{
    console.log(req.body);
    const result = dataService.login(req,req.body.accno,req.body.pswd)
    // console.log(res.send(result.message));
    console.log(res.status(result.statusCode).json(result));
})
app.post('/deposit',(req,res)=>{
    console.log(req.session.currentUser);
    const result = dataService.deposit(req,req.body.accno,req.body.amount,req.body.pswd)
    // console.log(res.send(result.message));
    console.log(res.status(result.statusCode).json(result));
})
app.post('/withdraw',(req,res)=>{
    console.log(req.session.currentUser);
    const result = dataService.withdraw(req,req.body.accno,req.body.amount,req.body.pswd)
    // console.log(res.send(result.message));
    console.log(res.status(result.statusCode).json(result));
})



app.put('/',(req,res)=>{

    res.send("PUT METHOD")
})

app.patch('/',(req,res)=>{

    res.send("PATCH METHOD")
})

app.delete('/',(req,res)=>{

    res.send("DELETE METHOD")
})

app.listen(3000,()=>{
console.log("server started at port 3000");
})

