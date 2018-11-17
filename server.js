const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //registering partial templates used through out the work

hbs.registerHelper('getCurrentYear',()=> new Date().getFullYear()) //registering a handlebar helps which is used to run js code everywhere needed

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ,${req.path}`;
    console.log(log)

    fs.appendFile('server.log',log +'\n',(err)=>{
        if(err){
            console.log('unable to log data');
        }
    }) ;
    next();
});

// app.use((req, res, next) => {
    // res.render('maintainance.hbs')
    // next();
// });
app.set('view engine','hbs');
// app.set('view engine','html')//using .html instead of .hbs
// app.engine('html', hbs.__express);//this will set an engine to use .html as a template file
app.use(express.static(__dirname + "/public")); 

app.get('/', (req, res) => {
    res.render('index.hbs',{
        pageTitle : 'index page',
        name: 'David Okonji',
        // currentYear : new Date().getFullYear(),
    })
});
app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle : 'Templating example',
        // currentYear : new Date().getFullYear(),
    });
})

app.get('/bad',(req,res) => {
    res.send({
        errorMessage : `Unable to handle Request 404 No Response`
    });
})
app.listen(3000,()=>{
    console.log('server is up on port localhost 3000');
})
