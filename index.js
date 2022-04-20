var express = require('express');
var app = express();
var db = require('./db.js');
var path = require('path');
var form = require('./registration.js');
var admin = require('./admin');
// var whatsapp = require('./WhatsappSend');
const { json } = require('express');
var bodyParser = require('body-parser'); 

app.use(express.static(__dirname + '/public/'));


app.use('/home',form);
app.use('/home/admin',admin);
// app.use('/home/whatsapp',whatsapp);
// app.use('/database',db);

app.set('views', path.join(__dirname, '/views'));
app.set("view engine","jade");

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
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
    app.get('/home/faqs', (req, res) => {
    res.sendFile(__dirname + '/views/faqs.html');
    });
     app.get('/home/gallery', (req, res) => {
      res.sendFile(__dirname + '/views/gallery.html');
    });
    app.get('/home/terms&conditions', (req, res) => {
      res.sendFile(__dirname + '/views/terms&conditions.html');
      });
      app.get('/home/feepay', (req, res) => {
        res.sendFile(__dirname + '/views/FeePay.html');
        });
      app.get('/home/admin', (req, res) => {
        res.sendFile(__dirname + '/admin/admin.html');
        });
        app.get('/home/test', (req, res) => {
          // console.log('done2-body: ' + JSON.parse(req.body.customerPhone));
          console.log('done1-header: ' + JSON.stringify(req.get('Content-Type')));
          console.log(req.headers);
          console.log(req.body.orderId);
          console.log(JSON.stringify(req.body.orderId));
          console.log(JSON.parse(req.body.orderId));
          console.log(JSON.parse(JSON.stringify(req.body.orderId)));
          console.log(JSON.stringify(req.body));
          console.log(JSON.parse(req.body));
          console.log(JSON.parse(JSON.stringify(req.body)));
          res.json(req.body);
          });
          app.get('/home/test2', (req, res) => {
            // console.log('done2-body: ' + JSON.parse(req.body.customerPhone));
            console.log('done2-header: ' + JSON.stringify(req.get('Content-Type')));
            console.log(req.headers);
          
            res.json(req.body);
            });

    // app.post('/home/registrationform', (req, res) => {
    //     console.log('my message:', req.body.title);
    //     console.log('body: ' + JSON.stringify(req.body));
    //     res.send("form madi gayu");
    //     });
    // app.get('*', (req, res) => {
    // res.send(" 404 error");
    // });

app.listen(3000,  () => {
  console.log('Server running on port 3000')
});
