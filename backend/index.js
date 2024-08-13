const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const data = require('./models/data');
const authMiddleware = require('./middleware');

app.use(cors());

dotenv.config();

const MONGODB_URI = 'mongodb+srv://oneshop982:oneshop982@cluster0.0pezb70.mongodb.net/oneshop?retryWrites=true&w=majority&appName=Cluster0';
const JWT_SECRET = "adfrar23r2tgargd";


mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let savedOtps = {};

app.listen(4000, () => {
  console.log("Server listening at port 4000");
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "oneshop982@gmail.com",
    pass: "rnxy lzbs wjmb iegx"
  }
});

app.post('/sendOtp', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send("Email is required");
  }

  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < 4; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  const options = {
    from: "oneshop982@gmail.com",
    to: email,
    subject: "Verification OTP",
    text: `OTP for the application is ${otp}`,
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      return res.status(500).send("Couldn't send OTP");
    }
    savedOtps[email] = otp;
    setTimeout(() => delete savedOtps[email], 50000);
    res.send('OTP sent');
    console.log(savedOtps);
  });
});

app.get('/', (req, res) => {
  res.send("hello");
});

app.post('/verify', (req, res) => {
  const { otp, email } = req.body;
  console.log(savedOtps);
  if (savedOtps[email] === otp) {
    res.send("Verified");
  } else {
    res.status(500).send('Invalid OTP');
  }
});

app.post('/register', async (req, res) => {
  try {
    const { email, firstName, lastName, phone, password, dob, gender, address,wishlist,carts } = req.body;
    const exist = await data.findOne({ email });
    if (exist) {
      return res.status(400).send("User already exists");
    }

    

    let newUser = new data({
      email, password, firstName, lastName, phone, dob:new Date(dob), gender, address,wishlist,carts
    });

    await newUser.save();
    res.status(200).send("User successfully registered");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await data.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(400).send("Password incorrect");
    }

    const payload = { user: { id: user.id } };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Login server error");
  }
});

app.get('/profile', authMiddleware, async (req, res) => {
  try {
    const profile = await data.findById(req.user.id);
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send("Profile data error");
  }
});

app.post('/update',async(req,res)=>{
  const {_id} = req.body;
  try{
const updatedUser = await data.findByIdAndUpdate(_id, {...req.body}, {
    new: true, 
    runValidators: true,
  });
  res.status(200).send("Sucessfully updated");
  console.log('Updated User:', updatedUser);
} catch (error) {
  console.error('Error updating user:', error);
  res.status(500).send('Error in updating')
}
})

app.get("/resetPass",async(req,res)=>{
  const email = req.header("email");
  try {
    const user = await data.findOne({email:email});
    res.json({uid:user._id});
  } catch (error) {
    console.log(error);
    res.status(500).send("Error geting id");
  }

})



module.exports = app;