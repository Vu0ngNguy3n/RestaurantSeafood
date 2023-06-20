const mongoose = require("mongoose");

const seafoodSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  seafoodType: {
    type: Number,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  img: {
    type: String,
  },
});

const typeSeafood = new mongoose.Schema({
  seafoodType: {
    type: Number,
  },
  seafoodName: {
    type: String,
  },
});

let Seafood = mongoose.model("Seafood", seafoodSchema);
let TypeSeafood = mongoose.model("TypeSeafood", typeSeafood);

module.exports = { Seafood, TypeSeafood };
