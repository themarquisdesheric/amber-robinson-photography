import React from 'react';
import { bool, func, arrayOf, object } from 'prop-types';

const LightboxControls = ({ 
  controlsVisible, 
  setImageIndex, 
  closeLightBox, 
  handleMouseEnter, 
  toggleLightTheme,
  lightTheme,
  themes: [light, dark],
  updateImageIndex
}) => (
  <div className={`lightbox-controls ${controlsVisible ? 'visible' : ''}`}>
    <button 
      className="lightbox-close"
      onClick={() => {
        setImageIndex(null);
        closeLightBox();
      }} 
      onMouseEnter={handleMouseEnter}
    >
      x
    </button>
    <button 
      className="lightbox-theme-toggle"
      onClick={() => toggleLightTheme(!lightTheme)}
      onMouseEnter={handleMouseEnter}
      style={{ color: lightTheme ? light.color : dark.color }}
    >
      <span role="img" aria-label="previous image">
        {lightTheme ? '☾' : '🌞'}
      </span>
    </button>
    <button 
      className="lightbox-left-arrow"
      onClick={() => updateImageIndex('previous')}
      onMouseEnter={handleMouseEnter}
    >
      <span role="img" aria-label="previous image">⬅️</span>
    </button>
    <button 
      className="lightbox-right-arrow"
      onClick={() => updateImageIndex('next')}
      onMouseEnter={handleMouseEnter}
      role="img"
      aria-label="next image"
    >
      <span role="img" aria-label="previous image">➡️</span>
    </button>
  </div>
);

LightboxControls.propTypes = {
  controlsVisible: bool.isRequired,
  setImageIndex: func.isRequired,
  closeLightBox: func.isRequired,
  handleMouseEnter: func.isRequired,
  toggleLightTheme: func.isRequired,
  lightTheme: bool.isRequired,
  themes: arrayOf(object).isRequired,
  updateImageIndex: func.isRequired
};

export default LightboxControls;
