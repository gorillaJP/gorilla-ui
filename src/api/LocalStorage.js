export const setLocalStorage = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    console.log(key);
    console.log(value);
    localStorage.setItem(key, value);
};

export const getLocalStorage = key => {
    localStorage.getItem(key);
};
