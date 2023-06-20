const { Account } = require("../model/account");

const accountController = {
  login: async (req, res) => {
    try {
      const account = await Account.find();
      res.status(200).json(account);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createAccount: async (req, res) => {
    try {
      const newAccount = new Account(req.body);
      const saveAccount = await newAccount.save();
      res.status(200).json("Create Account Successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  isExistAccount: async (req, res) => {
    try {
      const newAccount = await Account.find({ username: req.params.slug });
      res.status(200).json(!(newAccount.length === 0));
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = accountController;
