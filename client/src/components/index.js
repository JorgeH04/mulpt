import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Gallery() {
  const [images, setImages] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);


      
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/images');
      console.log(response);

      setImages(response.data);  
    } catch (error) {
      console.error('Error al cargar las imágenes:', error);
    }
  };

  const handleDeleteImage = async (_id) => {
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
        {images.map((image, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={image._id}>
            <div
              className="gallery__item fresco"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a className="fresco" href={image.firstImage} data-fresco-group="gallery">
                <img src={image.firstImage} style={{ width: '100%', height: 'auto' }} alt={`Image ${image._id}`} />
              </a>
              {hoveredIndex === index && (
                <span
                  className="delete-image"
                  onClick={(e) => handleDeleteImage(image._id, e)}
                >
                  ×
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>


  //   <section className="hero__section">
  //   <div className="hero-slider">
  //     {images.map((image, index) => (
  //       <div
  //         className="slide-item"
  //         key={index}
  //         onMouseEnter={() => setHoveredIndex(index)}
  //         onMouseLeave={() => setHoveredIndex(null)}
  //       >
  //         <a className="fresco" href={image.firstImage} data-fresco-group="projects">
  //           <img src={image.firstImage} alt={`Image ${image._id}`} />
  //           {hoveredIndex === index && (
  //             <button onClick={() => handleDeleteImage(image._id)}>Eliminar</button>
  //           )}
  //         </a>
  //       </div>
  //     ))}
  //   </div>
  //   <div className="hero-text-slider">
  //     {images.map((image, index) => (
  //       <div className="text-item" key={index}>
  //         <h2>{image.title}</h2>
  //         <p>{image.description}</p>
  //       </div>
  //     ))}
  //   </div>
  // </section>



  ); 
}

export default Gallery;
