const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId });

  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }

  res.json({ status: "success", code: 200, data: { result } });
};

module.exports = getById;