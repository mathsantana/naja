require("dotenv/config");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const OAuth2Data = require("../config/googleAuth.json");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

const defaultScope = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

module.exports = {
  async signUp(req, res) {
    const { email, name, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashPassword });

    return res.status(200).json(newUser);
  },

  async signIn(req, res) {
    const { email, password } = req.body;
    const user = await User.findByPk(email);

    if (!user) return res.status(400).json({ message: "User not found!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid password!" });

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.GOOGLE_CLIENT_SECRET,
      { expiresIn: 60 * 60 }
    );

    return res.status(200).json({ token });
  },
  async googleSignIn(req, res) {
    const url = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: defaultScope,
    });
    res.redirect(url);
  },
  async googleCallBack(req, res) {
    const code = req.query.code;
    if (code) {
      // Get an access token based on our OAuth code
      oAuth2Client.getToken(code, function (err, tokens) {
        if (err) {
          console.log("Error authenticating");
          console.log(err);
        } else {
          console.log("Successfully authenticated");
          oAuth2Client.setCredentials(tokens);
          authed = true;
          res.json({ token: tokens });
        }
      });
    }
  },

  async authMiddleware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

    oAuth2Client
      .verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      })
      .then((ticket) => {
        next();
      })
      .catch((googleErr) => {
        jwt.verify(token, process.env.GOOGLE_CLIENT_SECRET, function (
          jwtErr,
          payload
        ) {
          if (jwtErr)
            return res.status(401).json({ erro: { googleErr, jwtErr } });
          else next();
        });
      });
  },
};
