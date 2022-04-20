const puppeteer = require("puppeteer");
var express = require('express');
var router = express.Router();
const { Client } = require('whatsapp-web.js');
// async function scrape(url) {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto(url);
//   await page.waitForSelector("span [title='Ek Villian']");
//   const target = await page.$("span [title='Ek Villian']");
//   await target.click();
//   const inp = await page.$(
//     "#main > footer > div._3ee1T._1LkpH.copyable-area > div._3uMse > div > div._3FRCZ.copyable-text.selectable-text"
//   );

//   for (let i = 0; i < 100; i++) {
//     await inp.type("ok this is magic");
//     await page.keyboard.press("Enter");
//   }
// }

// scrape("https://web.whatsapp.com");



const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == 'hi') {
        msg.reply('hi kem cho');
    }
});

client.initialize();


module.exports = router;