import React from 'react';
import { Link } from 'react-router-dom';

const ConditionalLink = props => {
  const isDisabled = (e) => {
    if (props.disabled) { e.preventDefault() }
  }
  return(
    <Link to={props.destination} onClick={isDisabled} className={`galleryButton${props.disabled ? ' disabled' : ''}`} >
      { props.children }
    </Link>
  );
}

export default ConditionalLink;