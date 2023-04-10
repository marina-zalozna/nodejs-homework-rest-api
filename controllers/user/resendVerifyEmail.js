const { User } = require('../../models')
const { sendEmail } = require('../../helpers')

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    if (user.verify) {
        return res.status(404).json({ message: 'Verification has already been passed' })

    }

    const mail = {
        to: email,
        subject: 'verification sucsess',
        html: `<a href='http://localhost:3000/api/users/verify/${user.verificationToken}'>Press to confirm</a>`,
    }
    await sendEmail(mail)
    res.json({ message: 'Email verify resend' })
}

module.exports = resendVerifyEmail