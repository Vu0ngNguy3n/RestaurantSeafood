const { Seafood, TypeSeafood } = require("../model/model");

const typeSeafoodController = {
  addTypeSeafood: async (req, res) => {
    try {
      const newType = new TypeSeafood(req.body);
      const saveType = await newType.save();
      res.status(200).json(saveType);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllTypeSeafood: async (req, res) => {
    try {
      const types = await TypeSeafood.find();
      res.status(200).json(types);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getListType: async (req, res) => {
    try{
        const types = await TypeSeafood.find({ seafoodType : req.params.id});
        res.status(200).json(types)
    }catch(err){
        res.status(500).json(err)
    }
  }
};

module.exports = typeSeafoodController;
