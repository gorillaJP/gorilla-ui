export const setSessionStorage = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }

    sessionStorage.setItem(key, value);
};

export const getSessionStorage = key => {
    return sessionStorage.getItem(key);
};

export const clearSessionStorage = key => {
    return sessionStorage.removeItem(key);
};
