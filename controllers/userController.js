const bcrypt = require('bcrypt');
const User = require("../models/User.js");
const auth = require("../auth.js");
const { errorHandler } = auth;

module.exports.register = (req, res) => {
  const { email, username, password } = req.body;

  if (!email.includes("@")) {
    return res.status(400).send({ error: "Email invalid" });
  }

  if (password.length < 8) {
    return res.status(400).send({ error: "Password must be at least 8 characters" });
  }

  if (username.length < 3) { 
    return res.status(400).send({ error: "Username must be at least 3 characters" });
  }

  User.findOne({ $or: [{ email: email }, { username: username }] })
    .then(existingUser => {
      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).send({ error: "Email already in use" });
        }
        if (existingUser.username === username) {
          return res.status(400).send({ error: "Username already taken" });
        }
      }

      const newUser = new User({
        email: email,
        username: username,
        password: bcrypt.hashSync(password, 10)
      });

      return newUser.save();
    })
    .then(() => res.status(201).send({ message: "Registered Successfully" }))
    .catch(error => errorHandler(error, req, res));
};

module.exports.login = (req, res) => {
	return User.findOne({ email: req.body.email })
	.then(result => {
		if(result == null){
			return res.status(404).send({ success: false, message: 'No Email Found' });
		} else {
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
			
			if(isPasswordCorrect){
				 return res.status(200).send({ access: auth.createAccessToken(result) });
			} else {
				return res.status(401).send({ success: false, error: 'Email and password do not match' });
			}
		}
	})
	.catch(err => errorHandler(err, req, res))
}