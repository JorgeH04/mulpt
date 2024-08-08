// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema(
//   {
//     firstImage: {
//       type: String,
//     },
    
//     secondImage: {
//       type: String,
//     },

//     firstImagePublicId: {  
//       type: String,
//     },
//     secondImagePublicId: { 
//       type: String,
//     }
//   }
// );

// const Post = mongoose.model('post', postSchema);

// module.exports = {
//   Post
// };



const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    images: [{
      url: {
        type: String
      },
      public_id: {
        type: String
      }
    }]
  }
);

const Post = mongoose.model('post', postSchema);

module.exports = {
  Post
};