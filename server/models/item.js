const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  price: Number,
  stock: Number,
  tags: [String]
}, {timestamps: true})

ItemSchema.statics.addTag = function (tag) {
  return this.tags.push(tag);
}


const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;