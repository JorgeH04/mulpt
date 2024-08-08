import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Upload() {
    const [selectedFiles, setSelectedFiles] = useState(null);
    let navigate = useNavigate();
 

    // const handleFileChange = (e) => {
    //     setSelectedFiles(e.target.files[0]);
    // };
    const handleFileChange = (e) => {
      setSelectedFiles(Array.from(e.target.files));
  };  


      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (selectedFiles.length === 0) {
          alert('Debes seleccionar al menos un archivo.');
          return;
        }
      
        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        try {
           await axios.post('http://localhost:4000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          navigate('/');
    
         } catch (error) {
          console.error('Error al subir la imagen:', error);
        }
    };

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
      
    //     if (!selectedFiles || selectedFiles.length === 0) {
    //         alert('Debes seleccionar al menos un archivo.');
    //         return;
    //     }
      
    //     const formData = new FormData();
    //     for (let i = 0; i < selectedFiles.length; i++) {
    //         formData.append('files', selectedFiles[i]);
    //     }
      
    //     try {
    //         await axios.post('http://localhost:4000/upload', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         navigate('/');
    //     } catch (error) {
    //         console.error('Error al subir la imagen:', error);
    //     }
    // };
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
      
    //     if (!selectedFiles) {
    //       alert('Debes seleccionar un archivo.');
    //       return;
    //     }
      
    //     const formData = new FormData();
    //     formData.append('files', selectedFiles);
      
    //     try {
    //        await axios.post('http://localhost:4000/upload', formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       });

    //       navigate('/');

    
    //      } catch (error) {
    //       console.error('Error al subir la imagen:', error);
    //     }
    //   };
 
    
 

return (
  <>      

    <section class="contact__page">
        <div class="contact__warp">
          <div class="row">
            <div class="col-md-6">
              <h2>Upload an image</h2>
              <div class="contact__social">
  
              </div>
            </div>
            <div class="col-md-6">
              <div class="contact__text">
             
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} class="contact__form">
            <div className="Upload__image-section">
                  <input
                    type="file"
                    name="file"
                    id="fileInput"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFileChange}
                    multiple  
                  />
            </div>
 
            <button  class="site-btn">Upload</button>
          </form>
        </div>
      </section>
 
   
  </>
         );
        }