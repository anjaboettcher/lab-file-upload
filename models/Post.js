const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = new Schema({
  picPath: String,
  content: String,
  date: { type: Date, default: Date.now},
  _creator: { 
  type: Schema.Types.ObjectId, 
  ref: 'User'
}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
