export default {
    saveAuth: (userName, token) => {
        sessionStorage.setItem(constants.tokenKey, JSON.stringify({ userName: userName, access_token: token }));
    },

    clearAuth: (userName, token) => {
        sessionStorage.removeItem(constants.tokenKey);
    },

    getLogin: () => {
        let item = sessionStorage.getItem(constants.tokenKey);
        let login = null;
        if (item) {
            login = JSON.parse(item).userName;
        }
        return login;
    },

    getToken: () => {
        let item = sessionStorage.getItem(constants.tokenKey);
        let token = null;
        if (item) {
            login = JSON.parse(item).access_token;
        }
        return token;
    }
}