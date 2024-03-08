const Razorpay = require("razorpay");


exports.instance = new Razorpay({
    key_id: process.env.YOUR_API_KEY,
    key_secret: process.env.YOUR_API_SECRET,
});