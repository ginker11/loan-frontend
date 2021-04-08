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
      const hash = window.location.hash;
      console.log(hash);
      console.log('login');
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
          login(token);
          // localStorage.setItem('token', token);
          // localStorage.setItem('permissions', decodedToken.permissions);
        })
        .catch(({error}) => {
          throw new Error(error)
        });
  },
  logout: () => {
    logout();
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
      const hash = window.location.hash;
    console.log(hash);
      console.log('auth');
    if (hash.includes('invite')){
        console.log('testa');
        return Promise.resolve();
    }
    return getToken() ? Promise.resolve() : Promise.reject();
  },
  getPermissions: () => {
      const hash = window.location.hash;
      console.log(hash);
      console.log('perm');
      if (hash.includes('invite')){
          console.log('testp');
          return Promise.resolve();
      }
    const token = getToken();
    const decodedToken = parseJwt(token);

    const role = decodedToken.roles;
    return role ? Promise.resolve(role) : Promise.reject();
  }
};

export function getEmail() {
  const token = getToken();
  if (token) {
    const decodedToken = parseJwt(token);
    return decodedToken.email;
  }
}

export function getUsername() {
    const token = getToken();
    if (token) {
        const decodedToken = decodeJwt(token);
        return decodedToken.username;
    }
}

export function getCurrentUserId() {
    const token = getToken();
    if (token) {
        const decodedToken = decodeJwt(token);
        return decodedToken.user_id;
    }
}


export function isTokenExpired(token) {
  try {
    const decoded = parseJwt(token);
    if (decoded.exp < Date.now() / 1000) {
      // Logging out
      logout();
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

export function isLoggedIn() {
  const token = getToken();
  return !!token && !isTokenExpired(token);
}

export function getToken() {
    loginFromPdfToken();
    return localStorage.getItem('token');
}

export function loginFromPdfToken() {
    let token = getPdfTokenFromUrl();
    if (token) {
        login(token);
    }
}

export function getPdfTokenFromUrl() {
    let pdfToken = null;
    let queryParams = window.location.search;
    if (queryParams.indexOf('pdf_token=') > -1) {
        let val = queryParams.match(/pdf_token=([^&]+)/);
        pdfToken = val[1];

        if (pdfToken) {
            document.body.className = 'pdf-layout';
            document.title = '';
        }
    }

    return pdfToken;
}

export function login(token) {
    localStorage.setItem('token', token);
}

export function logout() {
    localStorage.removeItem('token');
}

