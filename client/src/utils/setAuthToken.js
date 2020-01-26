import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

const checkAndSetAuthToken = () => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }
};

export default checkAndSetAuthToken;
