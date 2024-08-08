const express = require('express');
const uuid  = require('uuid/v4');
const cloudinary = require('cloudinary');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const { Post } = require('../models/posts');

const router = express.Router();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});



const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/uploads'),
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});   


const uploadImages = multer({ storage: storage }).array('files', 3);



router.get('/images', async (req, res) => {
  try {
      const posts = await Post.find();

      const images = posts.map(post => ({
          _id: post._id,
          images: post.images
      }));

      res.status(200).json(images);
  } catch (error) {
      console.error('Error al consultar las imágenes:', error);
      res.status(500).json({ error: 'Error al consultar las imágenes.' });
  }
});

// router.get('/images', async (req, res) => {
//   try {

//    const posts = await Post.find();

//    const images = posts.map(post => ({
//       _id: post._id, 
//       firstImage: post.firstImage,
//       secondImage: post.secondImage,
//       firstImagePublicId: post.firstImagePublicId
//     }));

//     res.status(200).json(images);
//   } catch (error) {
//     console.error('Error al consultar las imágenes:', error);
//     res.status(500).json({ error: 'Error al consultar las imágenes.' });
//   }
// });




router.post('/upload', uploadImages, async (req, res) => {
  try {
    const uploadedFiles = req.files;

    if (uploadedFiles.length === 0) {
      return res.status(400).json({ error: "Debe subir al menos una imagen." });
    }

    const images = [];

    for (const file of uploadedFiles) {
      const resp = await cloudinary.v2.uploader.upload(file.path);
      images.push({
        url: resp.url,
        public_id: resp.public_id
      });
    }

    const newPost = new Post({
      images
    });

    await newPost.save();

    res.status(200).json({ message: "Imágenes subidas exitosamente." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al subir las imágenes." });
  }
});


// router.post('/upload', uploadImages, async (req, res) => {
//   try {
//     const uploadedFiles = req.files;

//     if (uploadedFiles.length === 0) {
//       return res.status(400).json({ error: "Debe subir al menos una imagen." });
//     }
  
//     let firstImage = "";
//     let firstImagePublicId = "";
//     if (uploadedFiles[0]) {
//       const resp = await cloudinary.v2.uploader.upload(uploadedFiles[0].path);
//       firstImage = resp.url;
//       firstImagePublicId = resp.public_id; // Guardamos el public_id
//     }

//     let secondImage = "";
//     let secondImagePublicId = "";
//     if (uploadedFiles[1]) {
//       const respdos = await cloudinary.v2.uploader.upload(uploadedFiles[1].path);
//       secondImage = respdos.url;
//       secondImagePublicId = respdos.public_id;  
//     }

//     const newNote = new Post({
//       firstImage,
//       secondImage,
//       firstImagePublicId,  
//       secondImagePublicId
//     });

//     await newNote.save();

//     res.status(200).json({ message: "Imagen subida exitosamente." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error al subir la imagen." });
//   }
// });
 
 

// router.delete('/images/:id', async (req, res) => {
//   try {
//     const postId = req.params.id;
//     console.log('ID recibido:', postId); 


//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(404).json({ error: 'Publicación no encontrada.' });
//     }
    
//     await cloudinary.v2.uploader.destroy(post.firstImagePublicId);
//     await cloudinary.v2.uploader.destroy(post.secondImagePublicId);

//     await Post.findByIdAndDelete(postId);

//     res.status(200).json({ message: 'Imagen eliminada exitosamente.' });
//   } catch (error) {
//     console.error('Error al eliminar la imagen:', error);
//     res.status(500).json({ error: 'Error al eliminar la imagen.' });
//   }
// });


// router.delete('/images/:id', async (req, res) => {
//   try {
//     const postId = req.params.id;
//     console.log('ID recibido:', postId); 

//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(404).json({ error: 'Publicación no encontrada.' });
//     }
    
//     if (post.firstImagePublicId) {
//       await cloudinary.v2.uploader.destroy(post.firstImagePublicId);
//     }

//     if (post.secondImagePublicId) {
//       await cloudinary.v2.uploader.destroy(post.secondImagePublicId);
//     }

//     await Post.findByIdAndDelete(postId);

//     res.status(200).json({ message: 'Imagen eliminada exitosamente.' });
//   } catch (error) {
//     console.error('Error al eliminar la imagen:', error);
//     res.status(500).json({ error: 'Error al eliminar la imagen.' });
//   }
// });

router.delete('/images/:id', async (req, res) => {
  try {
      const postId = req.params.id;
      console.log('ID recibido:', postId);

      const post = await Post.findById(postId);

      if (!post) {
          return res.status(404).json({ error: 'Publicación no encontrada.' });
      }

      // Eliminar las imágenes de Cloudinary
      for (const image of post.images) {
          await cloudinary.v2.uploader.destroy(image.public_id);
      }

      // Eliminar el documento Post
      await Post.findByIdAndDelete(postId);

      res.status(200).json({ message: 'Publicación eliminada exitosamente.' });
  } catch (error) {
      console.error('Error al eliminar la publicación:', error);
      res.status(500).json({ error: 'Error al eliminar la publicación.' });
  }
});



module.exports = router;
