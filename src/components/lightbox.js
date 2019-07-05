import React, { useState, useCallback, useEffect } from 'react';
import { number, object, func, arrayOf } from 'prop-types';
import Img from 'gatsby-image';

import LightboxControls from './lightbox-controls';

const light = {
  backgroundColor: '#fff',
  color: '#000'
};

const dark = {
  backgroundColor: '#000',
  color: '#fff'
};

let timeout;

const LightBox = ({ images, imageIndex: initialImageIndex, closeLightBox }) => {
  const [imageIndex, setImageIndex] = useState(initialImageIndex);
  const [lightTheme, toggleLightTheme] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(true);

  // keep controls visible if hovering over them
  const handleMouseEnter = () => {
    clearTimeout(timeout);
    setControlsVisible(true);
  };

  const handleMouseMove = () => {
    setControlsVisible(true);

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      setControlsVisible(false);
    }, 1500);
  };

  const updateImageIndex = (operation) => {
    let index = imageIndex || initialImageIndex;

    operation === 'next' ? index++ : index--;
    
    if (index === images.length) {
      index = 0;
    } else if (index === -1) {
      index = images.length - 1;
    } 

    setImageIndex(index);
  };

  const handleKeyDown = useCallback(
    ({ key }) => {
      if (key === 'ArrowRight') {        
        updateImageIndex('next');
      } else if (key === 'ArrowLeft') {
        updateImageIndex('previous');
      }
    },
    [imageIndex],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      if (timeout) clearTimeout(timeout);
    };
  }, [handleKeyDown]);
  
  if (initialImageIndex === null) return null;

  return (
    <div className="relative">
      <article 
        className="lightbox"
        onMouseMove={handleMouseMove}
        style={lightTheme ? light : dark}
      >
        <Img fluid={images[imageIndex || initialImageIndex].node.childImageSharp.fluid} />
      </article>
      <LightboxControls 
        controlsVisible={controlsVisible} 
        setImageIndex={setImageIndex} 
        closeLightBox={closeLightBox} 
        handleMouseEnter={handleMouseEnter} 
        toggleLightTheme={toggleLightTheme} 
        lightTheme={lightTheme}
        themes={[light, dark]}
        updateImageIndex={updateImageIndex}
      />
    </div>
  );
};

LightBox.propTypes = {
  images: arrayOf(object).isRequired,
  imageIndex: number,
  closeLightBox: func.isRequired
};

export default LightBox;
