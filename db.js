const { response } = require('express');
var mysql = require('mysql');

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
  host: "134.119.190.82",
  user: "bksein_admin",
  password: "96arsh@mysql",
  database: "bksein_User"
});

let harsh = {};
harsh.saveuserdata = (name, email, phone, age, speciality, district, uname,receipt) => {

  // console.log("MY Database" + name + ":" + email + ":" + phone + ":" + age + ":" + speciality + ":" + district + ":" + uname + ":" + payment_id + ":" + order_id + ":" + signature + ":" + time);


  return new Promise((resolve, reject) => {

    var sql = "INSERT INTO User (name,email,phone,age,speciality,district,uname,order_id) VALUES ('" + name + "','" + email + "', '" + phone + "', '" + age + "', '" + speciality + "', '" + district + "', '" + uname + "', '" + receipt + "')";
    pool.query(sql, (err, results) => {

      if (err) {
        console.log(err);
        reject(false);
      }
      console.log(results);
      resolve(true);

    })


  });

};

harsh.paymentdata = ( payment_id, order_id, signature, time) => {

  console.log("MY Database"  + payment_id + ":" + order_id + ":" + signature + ":" + time);


  return new Promise((resolve, reject) => {
    
    var sql = 'UPDATE User SET payment_id = "'+payment_id+'", signature = "'+signature+'", time = "'+time+'" WHERE order_id = "'+order_id+'"';
    // var sql = "INSERT INTO User (payment_id,order_id,signature,time) VALUES ('" + payment_id + "', '" + order_id + "', '" + signature + "', '" + time + "')";
    pool.query(sql, (err, results) => {

      if (err) {
        console.log("VIP ::"+err);
        reject(false);
      }
      console.log(results);
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
        console.log("merror" + err);
        return reject(err);
      }
      if (JSON.stringify(results) == "[]") {
        console.log("my harsh 2"+results);
        return resolve("no user");
      } else {
        console.log("my harsh 1"+results[0]);
        return resolve(["Already exist",results[0]]);
      }


    })


  });

  

};

harsh.getuserdata = (orderid) => {

  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM User WHERE order_id='" + orderid + "'";
    pool.query(sql, (err, results) => {

      if (err) {
        console.log("merror" + err);
        return reject(err);
      }
      if (JSON.stringify(results) == "[]") {
        console.log("MyFeeError"+JSON.stringify(results));
        return resolve("no user");
      } else {
        console.log("MyFee Result"+JSON.stringify(results));
        return resolve(["Already exist",results[0]]);
      }


    })


  });

  

};

harsh.all = () => {
  return new Promise((resolve, reject) => {
    
    var sql = "SELECT * FROM User";
    pool.query(sql, (err, results) => {

      if (err) {
        return reject(err);
      }
      // console.log("all"+results);
      // results.forEach((col) => {
      //   console.log(col.data);
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
      // console.log("all"+results);
      // results.forEach((col) => {
      //   console.log(col.data);
      //   fainaldata.push(col.data);
      // });
      return resolve(results);

    })

  });

};

harsh.delete = (key) => {
  var substring = key.substring(1, key.length - 1)
  return new Promise((resolve, reject) => {


    var fainaldata = substring.split(",");
    console.log("allkey" + fainaldata[0]);
    var sql = 'DELETE FROM chat WHERE msgkey IN (' + substring + ')';
    pool.query(sql, fainaldata, (err, results) => {

      if (err) {
        return reject(err);
      }
      console.log("alldeleted" + results);
      // results.forEach((col) => {
      //   console.log(col.data);
      //   fainaldata.push(col.data);
      // });

      return resolve(results);

    })

  });

};

harsh.update = (key, date) => {
  var substring = key.substring(1, key.length - 1)
  return new Promise((resolve, reject) => {

    var fainaldata = substring.split(",");
    console.log("allkey" + fainaldata[0]);
    var sql = 'UPDATE chat SET dtime=""' + date + '" WHERE msgkey IN (' + substring + ')';
    pool.query(sql, fainaldata, (err, results) => {

      if (err) {
        return reject(err);
      }
      console.log("alldeleted" + results);
      // results.forEach((col) => {
      //   console.log(col.data);
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
//   console.log('The solution is: ', results[0].solution);
// });


