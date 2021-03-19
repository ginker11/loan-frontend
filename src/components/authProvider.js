import decodeJwt from 'jwt-decode';

const entrypoint = process.env.REACT_APP_API_ENTRYPOINT
const authTokenUri = `${entrypoint}/authentication_token`;
const authenticationTokenUri = `${authTokenUri.replace('/api/','/')}`;

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login: ({ username, password }) => {

    const request = new Request(authenticationTokenUri, {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    return fetch ( request )
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(({token}) => {
          // const decodedToken = parseJwt(token);
          localStorage.setItem('token', token);
          // localStorage.setItem('permissions', decodedToken.permissions);
        })
        .catch(({error}) => {
          throw new Error(error)
        });
  },
  logout: () => {
    localStorage.removeItem('token');
    // localStorage.removeItem('raColumnsConfig');
    // window.location.reload();
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => {
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);

    const role = decodedToken.roles;
    return role ? Promise.resolve(role) : Promise.reject();
  }
};

export function getEmail() {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);
    return decodedToken.email;
  }
}

export function getUsername() {
    if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        const decodedToken = decodeJwt(token);
        return decodedToken.username;
    }
}

export function isTokenExpired(token) {
  try {
    const decoded = parseJwt(token);
    if (decoded.exp < Date.now() / 1000) {
      // Logging out
      localStorage.removeItem('token');
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

export function isLoggedIn() {
  const token = localStorage.getItem('token');
  return !!token && !isTokenExpired(token);
}


