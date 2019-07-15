import React, { useState, useRef, useCallback, useEffect } from 'react';
import { number, object, func, arrayOf } from 'prop-types';
import { useSpring, animated } from 'react-spring';
import Img from 'gatsby-image';

import LightBoxControls from './lightbox-controls';
import lightBoxSwipe from './lightbox-swipe';
import { preventRightClick } from '../utils';

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

  const props = useSpring({ 
    from: { opacity: 0 },
    opacity: 1, 
    config: { duration: 100 }
  });

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
    }, 1000);
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
      switch(key) {
        case 'ArrowRight':
          updateImageIndex('next');
          break;
        case 'ArrowLeft':
          updateImageIndex('previous');
          break;
        case 'Escape':
          closeLightBox();
          break;
        default:
          return;
      }
    },
    [imageIndex],
  );

  const lightBoxRef = useRef(null);

  useEffect(
    () => {
      if (window.outerWidth < 768) {
        const removeHandlers = lightBoxSwipe(lightBoxRef.current, updateImageIndex, closeLightBox);

        return removeHandlers;
      } else {
        window.addEventListener('keydown', handleKeyDown, false);
        
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
    
          if (timeout) clearTimeout(timeout);
        };
      }
    }, 
    [handleKeyDown]
  );
  
  if (imageIndex === null) return null;

  return (
    <animated.div className="relative" style={props}>
      <article 
        className="lightbox"
        ref={lightBoxRef}
        onMouseMove={handleMouseMove}
        onContextMenu={preventRightClick}
        style={lightTheme ? light : dark}
      >
        <Img fluid={images[imageIndex].node.childImageSharp.fluid} imgStyle={{ objectFit: 'contain' }} />
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
    </animated.div>
  );
};

LightBox.propTypes = {
  images: arrayOf(object).isRequired,
  imageIndex: number,
  setImageIndex: func.isRequired,
  closeLightBox: func.isRequired
};

export default LightBox;
