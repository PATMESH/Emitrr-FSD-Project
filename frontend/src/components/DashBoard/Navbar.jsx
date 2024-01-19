import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar({ menu, setMenu }) {
  return (
    <nav>
      <FontAwesomeIcon icon={faBars} onClick={() => setMenu(!menu)} style={{backgroundColor:'lightblue',borderRadius:'3px',padding:'6px'}}/>
      <h4>Menu</h4>
      <form action="#"></form>
    </nav>
  );
}

export default Navbar;
