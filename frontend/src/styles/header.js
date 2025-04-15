// src/styles/header.js

const headerStyles = {
  container: {
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2d3748',
  },
  logoLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  nav: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  navLink: {
    color: '#4a5568',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  navLinkHover: {
    color: '#3182ce',
    textDecoration: 'underline',
  },
};

export default headerStyles;
