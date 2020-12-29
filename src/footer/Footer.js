import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>&copy; Historia clínica electrónica - {new Date().getFullYear()}</p>
    </footer>
  ); 
}

export default Footer;