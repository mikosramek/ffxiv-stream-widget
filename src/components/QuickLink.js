import React from 'react';
import { Link } from 'react-router-dom';


const QuickLink = (props) => {
  const checkQuickLink = e => {
    if(props.id === undefined) { 
      e.preventDefault(); return true; 
    }
    return false;
  }
  return (
    <Link 
      className={`galleryButton${props.id === undefined ? ' disabled' : ''}`} 
      onClick={checkQuickLink} 
      to={ props.id === undefined ? `/${props.destination}/` : `/${props.destination}/${props.id.id}`}
    >
      Quick
    </Link>
  )
}

export default QuickLink;