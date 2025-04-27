import React from "react";
import { FaUpload, FaTrash } from "react-icons/fa";

const GalleryContent = ({
  galleryImages,
  handleImageUpload,
  handleDeleteImage,
  isLoading,
}) => {
  return (
    <div className="gallery-content">
      <div className="gallery-header">
        <h2>Salon Gallery</h2>
        <div className="upload-container">
          <label htmlFor="image-upload" className="upload-btn">
            <FaUpload />
            <span>Upload Image</span>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="loading">Loading gallery...</div>
      ) : galleryImages.length > 0 ? (
        <div className="image-grid">
          {galleryImages.map((image) => (
            <div key={image.id} className="image-card">
              <img src={image.url} alt={`Salon work - ${image.name}`} />
              <button
                className="delete-btn"
                onClick={() => handleDeleteImage(image.id)}
                disabled={isLoading}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-images">
          <p>No images in gallery yet</p>
        </div>
      )}
    </div>
  );
};

export default GalleryContent;
