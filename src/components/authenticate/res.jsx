import React, { useState, useEffect } from 'react';
import './res.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';


import Profile from '../interface/Profile';
import AboutGeminiAI from '../interface/project';
import Help from '../interface/Help';
import Hello from '../main/Hello';
import Home from "../interface/Home"


function App3() {
  const [isDarkMode, setIsDarkMode] = useState(false);


  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };


  // useEffect(() => {
  //   const token = localStorage.getItem('token'); 

  //   if (!token) {
  //     alert('Please log in first');
  //     navigate('/login');
  //   } else {
  //     const sanitizedToken = token.replace(/^"|"$/g, ''); 
  //     fetchProfile(sanitizedToken);
  //   }
  // }, []);


  // const fetchProfile = async (token) => {
  //   try {
  //     const response = await fetch('https://render-back-end-4.onrender.com/profile', {
  //       method: 'GET',
  //       headers: { 'Authorization': `Bearer ${token}` },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('Profile:', data.message);
  //       navigate('/auth'); 
  //     } else {
  //       const error = await response.text();
  //       alert(error);
  //       navigate('/login');
  //     }
  //   } catch (error) {
  //     alert('Something went wrong!');
  //     console.error('Error fetching profile:', error);
  //     navigate('/login');
  //   }
  // };

  return (
    <div style={isDarkMode ? styles.appContainerDark : styles.appContainerLight}>
      <AppNavbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Home  />
      <div style={styles.content}>
      <Routes>
          <Route path="/auth" element={<App3 />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/chat" element={<div style={styles.content}><Hello /></div>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutGeminiAI />} />
        </Routes> 
      </div>
    </div>
  );
}

function AppNavbar({ toggleTheme, isDarkMode }) {
  const [profile, setProfile] = useState(false); 
  const location = useLocation();
  const navigate = useNavigate();


  const hideNavbar =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/chat' ||
    location.pathname === '/Help';


  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };


  const handleProfile = () => {
    setProfile((prev) => !prev); 
  };

  return (
    <>
      {!hideNavbar && (
        <Navbar bg={isDarkMode ? 'dark' : 'light'} variant={isDarkMode ? 'dark' : 'light'} style={styles.navbar}>
          <Container style={styles.Container}>
            <Navbar.Brand as={Link}  className="gemini-name" style={styles.navBrand}>
              Gemini Ai
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={styles.hamburger}>
              <span className="custom-bar"></span>
              <span className="custom-bar"></span>
              <span className="custom-bar"></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav" className="hamburger" style={styles.navContainer}>
              <Nav className="ml-auto auto" style={styles.navItems}>
                <Nav.Item>
                  <Link to="/auth" className="nav-link" style={styles.navLink}>
                    Home
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link to="/chat" className="nav-link" style={styles.navLink}>
                    Chat
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to="/about" className="nav-link" style={styles.navLink}>
                    About
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Button variant="link" className="dropdown-menu" style={styles.navLink} onClick={handleProfile}>
                    <img src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png " width="60px" />
                  </Button>
                
                  {profile && (
                    <div className="dropdown-menu" style={styles.profileMenu}>
                      {/* <Button variant="link" className="dropdown-item" onClick={() => navigate('/profile')} style={styles.profileItem}>
                        View Profile
                      </Button> */}
                      <Button variant="link" className="dropdown-item" onClick={handleLogout} style={styles.profileItem}>
                        Logout
                      </Button>
                    </div>
                  )}
                </Nav.Item>
              </Nav>
              <Button variant={isDarkMode ? 'outline-light' : 'outline-dark'} title='Toggle button' onClick={toggleTheme} className="toggle" style={styles.toggleButton}>
              {isDarkMode ? '🌙' : '🌞'}
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

  
const styles = {
  appContainerLight: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    backgroundColor: '#000000',
    color: 'Gold',
  },

  appContainerDark: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',

    backgroundColor: '#333',
    color: '#000000',
  },
  navbar: {
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: "#000000",
    color: " white",
   
  },
  Container: {
    padding: '0px'
  },
  navContainer: {
    padding: '20px'
  },

  navBrand: {
    fontSize: '24px',
    fontWeight: 'bold',
    padding: '60px 0px',
    position : "relative",
    top : "20px",
    left:"40px"
  },
  navItems: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0px'

  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '10px 15px',
    margin: '0 10px',
    fontSize : "22px",
    fontWeight : 400,
  },
  navLinkHover: {
    color: 'red',
    textDecoration: 'underline',
  },
  content: {
    flex: 0,
    padding: '0px',
  },
  projectContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    width: '100%',
    color: "#fff"
  },
  imageContainer: {
    flex: 1,
    marginRight: '20px',
  },
  projectImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  projectInfo: {
    maxWidth: '600px',
    fontSize: '16px',
    lineHeight: '1.6',
    color: 'white'
  },
  toggleButton: {
    position: 'absolute',
    backgroundColor : "black",
    border : "none",
    top : "75px",
    left: '70%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1000',
    borderRadius: '50%',
    width: '50px',
    height: '45px',
    display: 'flex',
    fontSize : "30px",
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease',
  },


};

export default App3;