const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber:String,
  clientName:String,
  date:Date,
  amount:Number,
  status:String
});

const InvoiceModel = mongoose.model("invoices", InvoiceSchema);
module.exports = InvoiceModel;