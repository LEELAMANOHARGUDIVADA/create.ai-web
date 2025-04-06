import User from "../models/UserSchema.js";
import { sendVerificationOtp } from "../nodemailer/emails.js";
import generateToken from "../utils/jwt.js";
import bcrypt from "bcryptjs"

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !password)
      throw new Error("All Fields Are Required");

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists!" });

    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationCode: otp
    });
    await user.save();


    sendVerificationOtp({ email: user.email, otp: otp });

    return res
      .status(201)
      .json({
        success: true,
        message: "Registration Successful",
        token: generateToken(user._id),
      });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const login = async(req,res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) throw new Error('All Fields Are Required');

    const user = await User.findOne({ email });

    if(!user) return res.status(400).json({ success: false, message: "Invalid Email Id" })

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if(!isValidPassword) return res.status(400).json({ success: false, message: 'Invalid Password' });

    return res.status(200).json({ success: true, message: 'Login Successful', token: generateToken(user._id) });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
}

const verifyOtp = async(req,res) => {
  try {
    const { otp, email } = req.body;
    if(!otp || !email) throw new Error('All Fields Are Required');

    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ success: false, message: 'Invalid Credentials' });

    if(otp != user.verificationCode) return res.status(400).json({ success: false, message: "Invalid OTP" });

    user.isVerified = true;
    user.save();
    return res.status(200).json({ success: true, message: 'Otp Verification Successful' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

export { register, login, verifyOtp }