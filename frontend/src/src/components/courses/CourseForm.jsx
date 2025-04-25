import React, { useState } from 'react';

const CourseForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData ? initialData.title : '');
  const [description, setDescription] = useState(initialData ? initialData.description : '');
  const [image, setImage] = useState(initialData ? initialData.image : '');
  const [price, setPrice] = useState(initialData ? initialData.price : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = { title, description, image, price };
    onSubmit(courseData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input 
          type="text" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Price:</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CourseForm;