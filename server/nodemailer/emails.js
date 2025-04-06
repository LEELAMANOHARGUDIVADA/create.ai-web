import transporter from "./nodemailer.config.js"

const sendVerificationOtp = ({ email, otp }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your account',
        html: `
            <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 500px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
         
        .otp-box {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            background: #f3f3f3;
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
            letter-spacing: 3px;
            margin: 20px 0;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
        .verify-button {
            display: inline-block;
            background: #4CAF50;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 5px;
            margin-top: 15px;
        }
        .verify-button:hover {
            background: #45a049;
        }
    </style>
</head>
<body>

    <div class="container">
        
        <h2>Verify Your Email</h2>
        <p>Use the OTP below to complete your verification process.</p>
        
        <div class="otp-box">${otp}</div>

        <p>If you didn't request this, please ignore this email.</p>


        <p class="footer">© 2025 Create.ai | All rights reserved.</p>
    </div>

</body>
</html>

        `
}
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log('Error sending Mail: ', error.message);
        } else {
            console.log('Email Sent: ', info.response);
        }
    });
};

export { sendVerificationOtp };