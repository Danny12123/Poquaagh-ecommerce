const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true,
      max: 50,
    },
    quantity: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    productImage: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", UserSchema);
