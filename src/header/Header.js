import React, { useEffect, useState } from 'react';
import './Header.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom';
import { useAppContext } from '../lib/contextLib';

function Header({ location }) {

  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  const [navBackgroundTransparent, setNavBackgroundTransparent] = useState(true);
  useEffect(() => {
    setNavBackgroundTransparent(location === '/users' && window.scrollY === 0);
    const handleScroll = () => {
      setNavBackgroundTransparent(location === '/users' && window.scrollY === 0);
    }
    document.addEventListener('scroll', handleScroll);
    return() => {
      document.removeEventListener('scroll', handleScroll);
    }
  }, [location]);

  function handleLogout() {
    userHasAuthenticated(false);
  }

  return (
    <Navbar className={'nabvar-principal' + (navBackgroundTransparent ? ' transparent' : '')} collapseOnSelect expand="lg" variant="dark" fixed="top">
      
      <Navbar.Brand className="brand" href="/users">
        HCE Historia Clinica Electrónica</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        
        <Nav>
          { isAuthenticated ? (
            <>
            <OverlayTrigger         
              placement="bottom"
              overlay={
                <Tooltip>
                  Cerrar sesión
                </Tooltip>
              }
            >
              <Link className="d-none d-lg-block nav-link" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /></Link>
            </OverlayTrigger>
            <Link className="d-lg-none nav-link" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión</Link>
            </>
          ) : (
            <>
            <OverlayTrigger         
              placement="bottom"
              overlay={
                <Tooltip>
                  Iniciar sesión
                </Tooltip>
              }
            >
              <Link className="d-none d-lg-block nav-link" to="/login"><FontAwesomeIcon icon={faUser} /></Link>
            </OverlayTrigger>
            <Link className="d-lg-none nav-link" to="/login"><FontAwesomeIcon icon={faUser} /> Iniciar sesión</Link>
            </>
          ) }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;