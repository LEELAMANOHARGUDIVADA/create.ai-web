import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./db/connectdb.js";
import Google from "passport-google-oauth20";
import Github from "passport-github2";
import Facebook from "passport-facebook"
import passport from "passport";
import session from "express-session";
import { GoogleSignIn } from "./controllers/AuthController.js";
import UserRoutes from './routes/UserRoutes.js';
import AiRoutes from './routes/AiRoutes.js'
import PaymentRoutes from './routes/PaymentRoutes.js'

const app = express();

var GoogleStrategy = Google.Strategy;
var GithubStartegy = Github.Strategy;
var FacebookStrategy = Facebook.Strategy;

app.use(express.json());
app.use(
  session({
    secret: 'sjkcbjkvdvbjkdc8393nsbsjb',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:8000/auth/google/callback`,
    },
    GoogleSignIn
  )
);

passport.use(
  new GithubStartegy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:8000/auth/facebook/callback",
},
function(accessToken, refreshToken, profile, cb) {
  // console.log(profile);
  return cb(null, profile);
}
));

//ROUTES
app.use('/api/user', UserRoutes);
app.use('/api/ai', AiRoutes);
app.use('/api/v1/payment', PaymentRoutes);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/sign-in` }),
  function (req, res) {
    const { token, firstName, lastName, email } = req.user._doc;

    res.send(`
      <script>
        window.opener.postMessage({
          token: "${token}",
          username: "${firstName} ${lastName}"
        }, "http://localhost:5173"); // Replace with your frontend origin
        window.close();
      </script>
    `);
    
  }
);

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: `${process.env.CLIENT_URL}/sign-in` }),
  function(req, res) {
    
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  });


app.get('/auth/github', 
  passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/failure' }),
  async function(req, res) {
    res.redirect(`${process.env.CLIENT_URL}`); 
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send("Hello, Welcome to create.ai");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB(process.env.MONGODB_URI);
  console.log("SERVER RUNNING ON PORT", PORT);
});
