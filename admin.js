
var express = require('express');

var router = express.Router();

var db = require('./db');
router.use(express.json());
router.use(express.urlencoded({
  extended: true
}));


router.post('/all', (req, res) => {

    getall().then(data =>{
        console.log(data);
        res.json(data);
    })
  

});

router.post('/search', (req, res) => {
  console.log("seaar h"+req.body.key);
  getsearch(req.body.key).then(data =>{
      console.log(data);
      res.json(data);
  });


});

async function getall() {
  
  // var username = form[orderid].name.substring(0, 3) + form[orderid].phone;

  try {
    let results = await db.alll();
    console.log(results);
   
      
     
       return results;
    
  } catch (error) {
    console.log("My Error =="+ JSON.stringify(error));
    return error;
  }

}

async function getsearch(phone) {
  
  // var username = form[orderid].name.substring(0, 3) + form[orderid].phone;

  try {
    let results = await db.search(phone);
    console.log(results);
   
      
     
       return results;
    
  } catch (error) {
    console.log("My Error =="+ JSON.stringify(error));
    return error;
  }

}




module.exports = router;