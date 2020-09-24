const contactsModel = require("../models/contactModel");

async function getContacts(req, res, next) {
  throw new error();
  const result = await contactsModel.find();
  res.status(200).json(result);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await contactsModel.findById(contactId);
  if (!contact) {
    return res.status(404).send({ message: "contact not found" });
  }
  res.status(200).send(contact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await contactsModel.findById(contactId);
  if (!contact) {
    return res.status(404).send({ message: "contact not found" });
  }
  const removed = await contactsModel.findByIdAndDelete(contactId);
  if (removed) {
    return res.status(200).send({ message: "contact deleted" });
  }
}

async function addNewContact(req, res, next) {
  const existingContact = await contactsModel.findOne({
    email: req.body.email,
  });
  if (existingContact) {
    return res.status(409).send("Contact with such email already exists");
  }
  const newContact = await contactsModel.create(req.body);
  res.status(201).send(newContact);
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await contactsModel.findById(contactId);
  if (!contact) {
    return res.status(404).send({ message: "contact not found!" });
  }
  const updatedContact = await contactsModel.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).send(updatedContact);
}

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  addNewContact,
  updateContact,
};
