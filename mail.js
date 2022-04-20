
const nodemailer = require("nodemailer");
const jadeCompiler = require('./jadeCompiler');
const { createInvoice } = require("./createInvoice");
var log4js = require("log4js");
log4js.configure({
    appenders: {
        cheese: {
            type: "file",
            filename: "cheese.log"
        }
    },
    categories: {
        default: {
            appenders: ["cheese"],
            level: "debug"
        }
    }
});

const logger = log4js.getLogger("cheessse");

let harsh = {};
harsh.sendemail = (name, email, phone, age, speciality, district,state, uname, time, amount, refid) => {


  return new Promise((resolve, reject) => {

    const invoice = {
      shipping: {
        name: name,
        email: email,
        phone: phone,
        district: district,
        state: state
      },
      items: [
        {
          description: "Registration Fee for "+getTournamentName(state),
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
        "state": state,
        "uname": uname,
        "date": time,
        "amount": amount
      };
      jadeCompiler.compile("/email", data, function (err, content) {
        if (err) {
            logger.debug(" email"+err);
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
                logger.debug(" email"+error);
            console.log(error);
            reject(false);
          }
          logger.debug(" email info"+info);
          console.log(info);
          resolve(true);
        });
      });
    })
  }
  )
};
    function getTournamentName(state){
        
        switch(state){
            case "Gujarat":
                return "GSPL"
                break;
                case "MadhyaPradesh":
                return "MPSPL"
                break;
                case "Maharashtra":
                return "MSPL"
                break;
                case "Punjab":
                return "PSPL"
                break;
                case "Rajasthan":
                return "RSPL"
                break;
                case "UttarPradesh":
                return "UPSPL"
                break;
        }
        
    }


module.exports = harsh;