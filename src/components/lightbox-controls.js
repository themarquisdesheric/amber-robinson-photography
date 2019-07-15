import React from 'react';
import { bool, func, arrayOf, object, string, node } from 'prop-types';

import CloseIcon from '../images/Xsnakes.svg';
import ArrowSnakeLeft from '../images/arrow-snake-left.svg';
import ArrowSnakeRight from '../images/arrow-snake-right.svg';

const LightBoxControl = ({ className = '', handleClick, handleMouseEnter, ariaText, Icon, children, styleProps = {} }) => (
  <button 
    className={className}
    onClick={handleClick} 
    onMouseEnter={handleMouseEnter}
    style={styleProps}
  >
    <span role="img" aria-label={ariaText}>
      {Icon ? <Icon /> : children}
    </span>
  </button>
);

LightBoxControl.propTypes = {
  className: string,
  handleClick: func.isRequired,
  handleMouseEnter: func.isRequired,
  ariaText: string.isRequired,
  Icon: node,
  children: node,
  styleProps: object
};

const LightBoxControls = ({ 
  controlsVisible, 
  closeLightBox, 
  handleMouseEnter, 
  setLightTheme,
  lightTheme,
  themes: [light, dark],
  updateImageIndex
}) => (
  <div className={`lightbox-controls ${controlsVisible ? 'visible' : ''}`}>
    <LightBoxControl 
      className="lightbox-close"
      handleClick={closeLightBox} 
      handleMouseEnter={handleMouseEnter}
      ariaText="close lightbox"
      Icon={CloseIcon}
    />
    <LightBoxControl 
      className="lightbox-theme-toggle"
      handleClick={() => setLightTheme(!lightTheme)}
      handleMouseEnter={handleMouseEnter}
      ariaText={`set lightbox theme ${lightTheme ? 'dark' : 'light'}`}
      children={lightTheme ? '☾' : '🌞'}
      styleProps={{ color: lightTheme ? light.color : dark.color }}
    />
    <LightBoxControl
      className="lightbox-left-arrow"
      handleClick={() => updateImageIndex('previous')}
      handleMouseEnter={handleMouseEnter}
      ariaText="previous image"
      Icon={ArrowSnakeLeft}
    />
    <LightBoxControl
      className="lightbox-right-arrow"
      handleClick={() => updateImageIndex('next')}
      handleMouseEnter={handleMouseEnter}
      ariaText="next image"
      Icon={ArrowSnakeRight}
    />
  </div>
);

LightBoxControls.propTypes = {
  controlsVisible: bool.isRequired,
  closeLightBox: func.isRequired,
  handleMouseEnter: func.isRequired,
  setLightTheme: func.isRequired,
  lightTheme: bool.isRequired,
  themes: arrayOf(object).isRequired,
  updateImageIndex: func.isRequired
};

export default LightBoxControls;
