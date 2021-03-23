import decode from 'jwt-decode';

export function getToken() {
    loginFromPdfToken();

    return localStorage.getItem('token');
}

export function getProfile() {
    return decode(getToken());
}

export function isTokenExpired(token) {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
            logout();
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

export function login(token) {
    localStorage.setItem('token', token);
}

export function isLoggedIn() {
    const token = getToken();

    return !!token && !isTokenExpired(token);
}

export function logout() {
    localStorage.removeItem('token');
    removeCookie('token');

}

export function logoutIfUnauthorized(response, json, error) {
    if (
        (response.status === 401 || error === 'Unauthorized') &&
        json.message &&
        (json.message.indexOf('JWT') !== -1 ||
            json.message.indexOf('Expired') !== -1 ||
            json.message.indexOf('Unable') !== -1 ||
            json.message.indexOf('renew') !== -1 ||
            json.message.indexOf('verify') !== -1)
    ) {
        logout();

        localStorage.setItem('login_redirect_path', window.location.pathname);

        // redirect
        window.location.pathname = '/login';
    }
}

export function reloadIfDifferentVersion(response) {
    let apiRevision = response.headers.get('x-api-version-revision');
    let revision = document
        .querySelector('meta[name="revision"]')
        .getAttribute('content');

    if (apiRevision && revision && apiRevision !== revision) {
        console.log(
            'Different version detected: ' + apiRevision + ' vs. ' + revision
        );

        // @see src/components/VersionLink.js
        window.appVersionUpdateRequired = true;

        let notification = document.getElementById('new-version-notification');

        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'new-version-notification';
            notification.innerHTML =
                'A new version has been detected.  Please refresh the page.  <u>Refresh</u>';
            notification.onclick = event => {
                window.location.reload(true);
            };
            notification.style =
                'position:fixed;bottom:20px;right:20px;width:200px;background:#ffffff;border:1px solid #eeeeee;padding:1em;font-size:0.8em;cursor:pointer;z-index:1000000;';
            document.body.appendChild(notification);
        }
    }
}

export function getLoginRedirectPath() {
    let path = localStorage.getItem('login_redirect_path');
    localStorage.removeItem('login_redirect_path');

    if (path) {
        return path;
    }

    return '/procedures/';
}

export function applyAuthHeader(headers) {
    let token = getToken();
    if (token) {
        headers.set('Authorization', 'Bearer ' + token);
    }
}

export function loginFromCookie() {
    let token = getCookie('token');
    if (token) {
        login(token);
        removeCookie('token');
    }
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

// https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function removeCookie(cname) {
    var hostname = window.location.hostname;
    if (hostname.indexOf('stage') !== -1) {
        // remove subdomain so that cookie matches
        hostname = hostname
            .replace('ashbury-admin', '')
            .replace('ashbury-api', '')
            .replace('ashbury-client', '');
    }
    document.cookie =
        cname +
        '= ; path=/; domain=' +
        hostname +
        '; expires = Thu, 01 Jan 1970 00:00:00 GMT';
}

export function getCurrentUserId() {
    if (!isLoggedIn()) {
        return false;
    }

    const profile = getProfile();
    if (profile.user_id) {
        return '/users/' + profile.user_id;
    }

    return false;
}

export function isAdmin() {
    if (!isLoggedIn()) {
        return false;
    }

    const profile = getProfile();
    if (
        profile.roles &&
        profile.roles.length > 0 &&
        (profile.roles.indexOf('ROLE_ADMIN') !== -1 ||
            profile.roles.indexOf('ROLE_SUPER_ADMIN') !== -1)
    ) {
        return true;
    }

    return false;
}

