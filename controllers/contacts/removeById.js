const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove({ _id: contactId });

  if (!result) {
    throw createError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: { result },
  });
};

module.exports = removeById;