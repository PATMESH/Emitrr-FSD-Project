import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar({ menu, setMenu }) {
  return (
    <nav>
      <FontAwesomeIcon icon={faBars} onClick={() => setMenu(!menu)} />
      <h4>Menu</h4>
      <form action="#"></form>
    </nav>
  );
}

export default Navbar;
