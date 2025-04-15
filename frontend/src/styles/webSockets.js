// src/styles/webSockets.js

const webSockets = {
  container: {
    width: '400px',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    background: '#007bff',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
    fontSize: '18px',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '10px',
  },
  chatBox: {
    height: '300px',
    overflowY: 'scroll',
    padding: '10px',
    background: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  ownMessage: {
    alignSelf: 'flex-end',
    background: '#007bff',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '15px',
    maxWidth: '70%',
    wordWrap: 'break-word',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    background: '#e5e5e5',
    color: 'black',
    padding: '8px 12px',
    borderRadius: '15px',
    maxWidth: '70%',
    wordWrap: 'break-word',
  },
  inputContainer: {
    display: 'flex',
    borderTop: '1px solid #ddd',
    padding: '10px',
    background: 'white',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 15px',
    marginLeft: '10px',
    fontSize: '16px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default webSockets;
