export const setLocalStorage = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }

    localStorage.setItem(key, value);
};

export const getLocalStorage = key => {
    return localStorage.getItem(key);
};

export const clearLocalStorage = key => {
    return localStorage.removeItem(key);
};
