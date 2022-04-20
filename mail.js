
const nodemailer = require("nodemailer");
const jadeCompiler = require('./jadeCompiler');
const { createInvoice } = require("./createInvoice");

let harsh = {};
harsh.sendemail = (name, email, phone, age, speciality, district, uname, time, amount, refid) => {

  console.log("make email"+name+email);
  return new Promise((resolve, reject) => {

    const invoice = {
      shipping: {
        name: name,
        email: email,
        phone: phone
      },
      items: [
        {
          description: "Registration Fees for GSPL",
          amount: amount
        }
      ],
      subtotal: amount,
      invoice_nr: refid
    };

    createInvoice(invoice, "Reciept.pdf").then((doc) => {

      let transporter = nodemailer.createTransport({
        host: "mail.bkse.in",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "registration@bkse.in", // generated ethereal user
          pass: "Bullknight@spell", // generated ethereal password
        },
      });
      var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "age": age,
        "speciality": speciality,
        "district": district,
        "uname": uname,
        "date": time,
        "amount": amount
      };
      jadeCompiler.compile("/email", data, function (err, content) {
        if (err) {
          reject(false);
          // throw new Error('Problem compiling template(double check relative path): ' + RELATIVE_TEMPLATE_PATH);
          
        }
        // console.log("My Template="+html);
        var mailoption = {
          from: '"Bull Knight Sprot Event" <registration@bkse.in>', // sender address
          to: email,
          bcc: "bullknightsportevent@gmail.com", // list of receivers
          subject: "congratulations your registration was successful", // Subject line
          html: content,
          attachments: [{
            filename: 'Reciept.pdf',
            content: doc,
          }] // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailoption, function (error, info) {
          if (error) {
            console.log(error);
            reject(false);
          }
          console.log(info);
          resolve(true);
        });
      });
    })
  }
  )
};



module.exports = harsh;