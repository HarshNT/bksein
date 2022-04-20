const { response } = require('express');
var mysql = require('mysql');
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "debug";

// var config = {
//   host: "sql458.main-hosting.eu",
//   user: "u614172624_96arsh",
//   password: "Harsh@2710",
//   database: "u614172624_messages"
// };


const pool = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: "localhost",
  user: "bksein_admin",
  password: "96arsh@mysql",
  database: "bksein_User"
});

let harsh = {};
harsh.saveuserdata = (name, email, phone, age, speciality, district, uname,receipt,state) => {

  // logger.debug("MY Database" + name + ":" + email + ":" + phone + ":" + age + ":" + speciality + ":" + district + ":" + uname + ":" + payment_id + ":" + order_id + ":" + signature + ":" + time);


  return new Promise((resolve, reject) => {

    var sql = "INSERT INTO User (name,email,phone,age,speciality,district,uname,order_id,state) VALUES ('" + name + "','" + email + "', '" + phone + "', '" + age + "', '" + speciality + "', '" + district + "', '" + uname + "', '" + receipt + "', '" + state + "')";
    pool.query(sql, (err, results) => {

      if (err) {
        logger.debug(err);
        reject(false);
      }
      logger.debug(results);
      resolve(true);

    })


  });

};

harsh.paymentdata = ( payment_id, orderid, signature, time,mphone) => {




  return new Promise((resolve, reject) => {
    
    var sql = 'UPDATE User SET payment_id = "'+payment_id+'", signature = "'+signature+'", time = "'+time+'", order_id = "'+orderid+'" WHERE phone = "'+mphone+'"';
    // var sql = "INSERT INTO User (payment_id,order_id,signature,time) VALUES ('" + payment_id + "', '" + order_id + "', '" + signature + "', '" + time + "')";
    pool.query(sql, (err, results) => {

      if (err) {
        logger.debug("VIP ::"+err);
        reject(false);
      }
      logger.debug(results);
      resolve(true);

    })


  });

};

harsh.saveemail = (isemailsent,mphone) => {




  return new Promise((resolve, reject) => {
    
    var sql = 'UPDATE User SET isemailsent = "'+isemailsent+'" WHERE phone = "'+mphone+'"';
    // var sql = "INSERT INTO User (payment_id,order_id,signature,time) VALUES ('" + payment_id + "', '" + order_id + "', '" + signature + "', '" + time + "')";
    pool.query(sql, (err, results) => {

      if (err) {
        logger.debug("VIP ::"+err);
        reject(false);
      }
      logger.debug(results);
      resolve(true);

    })


  });

};


harsh.checkuser = (phone) => {

  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM User WHERE phone='" + phone + "'";
    pool.query(sql, (err, results) => {

      if (err) {
        logger.debug("merror" + err);
        return reject(err);
      }
      if (JSON.stringify(results) == "[]") {
        logger.debug("my harsh 2"+results);
        return resolve("no user");
      } else {
        logger.debug("my harsh 1"+results[0]);
        return resolve(["Already exist",results[0]]);
      }


    })


  });

  

};

harsh.getuserdata = (orderid) => {

  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM User WHERE phone='" + orderid + "'";
    pool.query(sql, (err, results) => {

      if (err) {
        logger.debug("merror" + err);
        return reject(err);
      }
      if (JSON.stringify(results) == "[]") {
        logger.debug("MyFeeError"+JSON.stringify(results));
        return resolve("no user");
      } else {
          
        logger.debug("MyFee Result"+JSON.stringify(results));
        return resolve(["Already exist",results[0]]);
      }


    })


  });

  

};

harsh.alll = () => {
  return new Promise((resolve, reject) => {
    
    var sql = "SELECT * FROM User";
    pool.query(sql, (err, results) => {

      if (err) {
        return reject(err);
      }
      // logger.debug("all"+results);
      // results.forEach((col) => {
      //   logger.debug(col.data);
      //   fainaldata.push(col.data);
      // });
      return resolve(results);

    })

  });

};

harsh.search = (phone) => {
  return new Promise((resolve, reject) => {
    
    var sql = "SELECT * FROM User where phone='"+phone+"'";
    pool.query(sql, (err, results) => {

      if (err) {
        return reject(err);
      }
      // logger.debug("all"+results);
      // results.forEach((col) => {
      //   logger.debug(col.data);
      //   fainaldata.push(col.data);
      // });
      return resolve(results);

    })

  });

};


module.exports = harsh;



// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   logger.debug('The solution is: ', results[0].solution);
// });


