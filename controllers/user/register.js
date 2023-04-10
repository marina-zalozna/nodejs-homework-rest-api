const bcrypt = require('bcryptjs');
const { User } = require('../../models/user');
const { createError, sendEmail } = require('../../helpers');
const gravatar = require('gravatar');
const {nanoid} = require("nanoid")

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, 'Email in use');
  }
  const avatarURL = gravatar.url(email);

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();

  const result = await User.create({ 
    email,
    password: hashPassword,
    avatarURL,
    verificationToken
   });

   const mail = {
    to: email,
    subject: 'verification sucsess',
    html: `<a href='http://localhost:3000/api/users/verify/${verificationToken}'>Press to confirm</a>`,
}

await sendEmail(mail)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: { 
        email: result.email,
        subscription: result.subscription,
        avatarURL },
    },
  });
};

module.exports = register;