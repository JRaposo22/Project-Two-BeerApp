const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const pageSchema = new Schema(
  {
    prev:Number,
    next:Number


  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Page = model("Page", pageSchema);

module.exports = Page;
