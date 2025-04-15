// src/styles/footer.js

const footerStyles = {
  container: {
    backgroundColor: '#f7fafc',  // light gray
    color: '#4a5568',            // dark gray
    fontSize: '0.875rem',
    padding: '2rem 1rem',
    marginTop: '2rem',
    textAlign: 'center',
  },
  inner: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  text: {
    marginBottom: '0.5rem',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  link: {
    color: '#4a5568',
    textDecoration: 'none',
    fontSize: '0.875rem',
  },
  linkHover: {
    textDecoration: 'underline',
  },
};

export default footerStyles;
