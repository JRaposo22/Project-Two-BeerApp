const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const reviewSchema = new Schema(
  {
    content: String,

    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
