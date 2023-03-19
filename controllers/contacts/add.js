const { Contact } = require('../../models/contact');

const add = async (req, res) => {
    const data = await Contact.create(req.body);
    res.status(201).json({ 
        status: "success", 
        code: 201,
        data: { data } });
}

module.exports = add;