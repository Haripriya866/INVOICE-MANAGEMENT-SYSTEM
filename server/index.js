const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const RegisterModel = require("./models/Register");
const InvoiceModel = require("./models/Invoices");
const jwt = require("jsonwebtoken");

const app = express();
app.use(
  cors({
    origin: "https://invoice-management-system-frontend.vercel.app",
    method: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

mongoose.connect(
  "mongodb+srv://haripriyakanike:Haripriya@cluster0.6sq0s.mongodb.net/test",
)
.then(() => console.log("MongoDB Connected Successfully"))
 .catch((err) => console.error("MongoDB Connection Error:", err));

app.listen(3001, () => {
  console.log("Server is Running on 3001");
});

//REGISTERATION API
app.post("/", async (request, response) => {
  const { name, email, password } = request.body;
  try {
    const existingUser = await RegisterModel.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ error: "Already have an account" });
    }
    const newUser = await RegisterModel.create({ name, email, password });
    response.json({ message: "Account created" });
  } catch (err) {
    console.log("Error during registration:", err);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

//LOGIN API
app.post("/login/", async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await RegisterModel.findOne({ email });
    if (user) {
      if (user.password === password) {
        const payload = { email };
        const jwtToken = jwt.sign(payload, "MY_SECRET_KEY");
        response.json({ jwtToken });
      } else {
        response.status(401).json({ error: "Password is Incorrect" });
      }
    } else {
      response.status(404).json({ error: "No user found" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

//GET INVOICES API
app.get("/invoices", async (request, response) => {
  try {
    const invoices = await InvoiceModel.find({});
    response.json(invoices);
  } catch (err) {
    console.error("Error fetching invoices:", err);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// CREATE INVOICE API
app.post("/createinvoice", async (request, response) => {
  const { invoiceNumber, clientName, date, amount, status } = request.body;
  try {
    const existingInvoice = await InvoiceModel.findOne({ invoiceNumber });
    if (existingInvoice) {
      return response
        .status(400)
        .json({ error: "Invoice with this number already exists" });
    }
    const newInvoice = await InvoiceModel.create({
      invoiceNumber,
      clientName,
      date,
      amount,
      status,
    });
    response.json({ message: "Invoice created successfully" });
  } catch (err) {
    console.log("Error creating invoice: ", err);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

//DELETE INVOICE API
app.delete("/deleteinvoice/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const deletedInvoice = await InvoiceModel.findByIdAndDelete({ _id: id });
    if (deletedInvoice) {
      response.json({
        message: "Invoice deleted successfully",
        deletedInvoice,
      });
    } else {
      return response.status(404).json({ error: "Invoice not found" });
    }
  } catch (err) {
    console.error("Error deleting invoice:", err);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

//GET INVOICE API
app.get("/getupdate/:id", async (request, response) => {
  const { id } = request.params;

  try {
    const invoice = await InvoiceModel.findById({ _id: id });
    if (invoice) {
      response.json(invoice);
    } else {
      return response.status(404).json({ error: "Invoice not found" });
    }
  } catch (err) {
    console.error("Error fetching invoice:", err);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

//UPDATE INVOICE API
app.put("/updateinvoice/:id", async (request, response) => {
  const { id } = request.params;
  const { invoiceNumber, clientName, date, amount, status } = request.body;

  try {
    const updatedInvoice = await InvoiceModel.findByIdAndUpdate(
      { _id: id },
      {
        invoiceNumber: invoiceNumber,
        clientName: clientName,
        date: date,
        amount: amount,
        status: status,
      }
    );
    if (updatedInvoice) {
      response.json(updatedInvoice);
    } else {
      return response.status(404).json({ error: "Invoice not found" });
    }
  } catch (err) {
    console.error("Error updating invoice:", err);
    response.status(500).json({ error: "Internal Server Error" });
  }
});
