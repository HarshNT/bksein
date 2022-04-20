var express = require('express');
var app = express();
var db = require('./db.js');
var path = require('path');
var admin = require('./admin');
var form = require('./registration.js');
var testform = require('./Test.js');

app.use(express.static(__dirname + '/public/'));

app.set('views', path.join(__dirname, '/views'));
app.set("view engine","jade")
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

    app.use('/home',form);
    app.use('/home',testform);
    app.use('/home/admin',admin);
 
    app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
    });
    app.get('/home/about-us', (req, res) => {
    res.sendFile(__dirname + '/views/about-us.html');
    });
    app.get('/home/contact', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
    });
    app.get('/home/registration', (req, res) => {
    res.sendFile(__dirname + '/views/registration.html');
    });
     app.get('/home/junior-registration', (req, res) => {
    res.sendFile(__dirname + '/views/juniorregistration.html');
    });
    app.get('/home/faqs', (req, res) => {
    res.sendFile(__dirname + '/views/faqs.html');
    });
     app.get('/home/gallery', (req, res) => {
      res.sendFile(__dirname + '/views/gallery.html');
    });
    app.get('/home/gallery/images', (req, res) => {
      const fs = require('fs')
      let filesarry = [];
      let itemsProcessed = 0;
      fs.readdirSync(__dirname + '/public/assets/gallery').forEach((file,index,array) => {
        filesarry.push(file);
        itemsProcessed++;
        if (itemsProcessed == array.length){
          res.send(filesarry);
        }
      });
    // const length = fs.readdirSync(__dirname + '/public/assets/gallery').length
    // console.log(length)
      
    });
    app.get('/home/terms&conditions', (req, res) => {
      res.sendFile(__dirname + '/views/terms-and-conditions.html');
      });
      app.get('/home/feepay', (req, res) => {
        res.sendFile(__dirname + '/views/FeePay.html');
        });
      app.get('/home/admin', (req, res) => {
        res.sendFile(__dirname + '/admin/admin.html');
        });
        app.get('/home/tag', (req, res) => {
        res.sendFile(__dirname + '/views/tag.html');
        });
//         app.get('/home/log', (req, res) => {
//   res.sendFile(path.join(__dirname + '/logs.log'));
// });
     

    // app.post('/home/registrationform', (req, res) => {
    //     console.log('my message:', req.body.title);
    //     console.log('body: ' + JSON.stringify(req.body));
    //     res.send("form madi gayu");
    //     });
    // app.get('*', (req, res) => {
    // res.send(" 404 error");
    // });

app.listen(3000);
