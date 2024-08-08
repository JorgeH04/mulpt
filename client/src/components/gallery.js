import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function Gallery() {
  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/images');
      setImages(response.data);  
    } catch (error) {
      console.error('Error al cargar las imágenes:', error);
    }
  };

  const handleDeleteImage = async (_id, e) => {
    e.stopPropagation(); 

    try {
      await axios.delete(`http://localhost:4000/images/${_id}`);
      fetchImages();  
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
    }
  };
  

  useEffect(() => {
    fetchImages();
  }, []);

  return (

    <div className="gallery__page">
    <div className="gallery__warp">
      <div className="row">
        {images.map((post, postIndex) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={post._id}>

            <div className="gallery__item">
            <Carousel>

                {post.images.map((image, index) => (
                  <div
                    className="slide-item"
                    key={image.public_id}
                    onMouseEnter={() => setHoveredIndex(postIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <a className="fresco" href={image.url} data-fresco-group="projects">
                      <img src={image.url}  alt={`Image ${image.public_id}`} />
                      {hoveredIndex === index && (
                         <span
                         className="delete-image"
                         onClick={(e) => handleDeleteImage(image._id, e)}
                      
                       >
                         ×
                       </span>
                       
                      )}
                    </a>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  ); 
}

export default Gallery; 

