const { Seafood, TypeSeafood } = require("../model/model");

const seafoodController = {
  addSeafood: async (req, res) => {
    try {
      const newSeafood = new Seafood(req.body);
      const savedSeafood = await newSeafood.save();
      res.status(200).json(savedSeafood);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllSeafood: async (req, res) => {
    try {
      const seafoods = await Seafood.find({});
      res.status(200).json(seafoods);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getASeafood: async (req, res) => {
    try {
      const seafood = await Seafood.findById(req.params.slug);
      res.status(200).json(seafood);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getSeafoods: async (req, res) => {
    try {
      const seafoods = await Seafood.find({ seafoodType: req.params.slug });
      res.status(200).json(seafoods);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateSeafood: async (req, res) => {
    try {
      const seafood = await Seafood.findById(req.body._id);
      const newSeafood = await Seafood(req.body);
      await seafood.updateOne(newSeafood);
      res.status(200).json(newSeafood);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteSeafood: async(req, res) =>{
    try{
      await Seafood.findByIdAndDelete(req.params.slug)
      res.status(200).json("Delete Successfully")
    }catch(err){
      res.status(500).json(err)
    }
  }
};

module.exports = seafoodController;
