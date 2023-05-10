import { useNavigate } from 'react-router-dom'; 
import '../css/SubmitButton.css';
import React from 'react';

const Homepage = () => {
  const navigate = useNavigate(); 
  const handleClick = () => {
    navigate('/graph'); 
  };

  return (
    <div className="submit-button-container">
      <button className="submit-button" onClick={handleClick}>
        Submit
      </button>
      
    </div>
  );
};

export default Homepage;
