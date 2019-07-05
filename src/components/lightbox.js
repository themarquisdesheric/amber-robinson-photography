import React, { useState, useCallback, useEffect } from 'react';
import { number, object, func, arrayOf } from 'prop-types';
import Img from 'gatsby-image';

import LightBoxControls from './lightbox-controls';

const light = {
  backgroundColor: '#fff',
  color: '#000'
};

const dark = {
  backgroundColor: '#000',
  color: '#fff'
};

let timeout;

const LightBox = ({ images, imageIndex, setImageIndex, closeLightBox }) => {
  const [controlsVisible, setControlsVisible] = useState(true);
  const [lightTheme, setLightTheme] = useState(true);

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
    let index = imageIndex;

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
  
  if (imageIndex === null) return null;

  return (
    <div className="relative">
      <article 
        className="lightbox"
        onMouseMove={handleMouseMove}
        style={lightTheme ? light : dark}
      >
        <Img fluid={images[imageIndex].node.childImageSharp.fluid} />
      </article>
      <LightBoxControls 
        controlsVisible={controlsVisible} 
        closeLightBox={closeLightBox} 
        handleMouseEnter={handleMouseEnter} 
        setLightTheme={setLightTheme} 
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
  setImageIndex: func.isRequired,
  closeLightBox: func.isRequired
};

export default LightBox;
