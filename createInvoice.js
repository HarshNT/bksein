const fs = require("fs");
const PDFDocument = require("pdfkit");




async function createInvoice(invoice, path) {

  const pdfBuffer = await new Promise(resolve => {
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);

    doc.end();
    // doc.pipe(fs.createWriteStream(path));

    //Finalize document and convert to buffer array
    let buffers = []
    doc.on("data", buffers.push.bind(buffers))
    doc.on("end", () => {
      let pdfData = new Uint8Array(Buffer.concat(buffers))
      resolve(pdfData)
    })
  })

  return pdfBuffer;

}

function generateHeader(doc) {
  doc
    .image(__dirname + "/public/assets/BullBlack.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Bull Knight Sport Event", 110, 57)
    .fontSize(10)
    .text("Bull Knight Sport Event", 200, 50, { align: "right" })
    .text("Naroda Dehgam Road, OPP.Akash Grand City,", 200, 65, { align: "right" })
    .text("Enasan, Ahmedabad,Gujarat, India- 382330.", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Reciept", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Reciept Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)



    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.email, 300, customerInformationTop + 15)
    .text(invoice.shipping.phone,300,  customerInformationTop + 30)
    .text(invoice.shipping.district+", "+invoice.shipping.state,300,  customerInformationTop + 45)
    .moveDown();

  generateHr(doc, 268);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Description",
    "Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.description,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Thank you for registration",
      50,
      780,
      { align: "center", width: 500 }
    );

}

function generateTableRow(
  doc,
  y,
  description,
  amount
) {
  doc
    .fontSize(10)
    .text(description, 150, y)
    .text(amount, 0, y, { align: "right" });

}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(rs) {
  return "Rs. " + rs;
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
}

module.exports = {
  createInvoice
};
