const express = require('express');
var bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
app.set("view engine","ejs")
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }))
var todo=[{
    "Todolist":"list",
    "status":"pending"
    
}];
app.use(session({
    secret: 'codeforgeek',
    saveUninitialized: true,
    resave: true
}));

app.get('/',function(req,res){
    res.render('index',{"name": todo, "msg":req.flash('message')})
})
app.post('/add',function(req,res){
    var a={
        "Todolist":req.body.Todolist,
        "status":"pending"
        
    }
    todo.push(a)
    req.flash('message',"details Added Successfully")
    res.redirect('back');
})
app.get('/delete/:id',function(req,res){
    const id=req.params.id
    todo.splice(id,1);
    req.flash('message',"details Deleted Successfully")
    res.redirect('back')
})
app.get('/update/:id',function(req,res){
    const idu=req.params.id
    res.render('update',{ "id":idu, "todo":todo[idu] })
})
app.post('/update/:id',function(req,res){
    const idu=req.params.id
    todo[idu].Todolist = req.body.Todolist
    todo[idu].status = req.body.status
    req.flash('message',"Updated Successfully")
    res.redirect('/')
})


app.listen(8080);