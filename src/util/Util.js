export const createMarkUp = htmlString => {
    return { __html: htmlString };
};

export const debounce = (func, wait, immediate) => {
    let timeout;

    return function executedFunction() {
        let context = this;
        let args = arguments;

        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        let callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};

export const isValidEmail = email => {
    if (/^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(email)) {
        return true;
    }
    return false;
};

export const isValidContactNumber = contactnumber => {
    if (/^[0-9]{3}[\s-]?[0-9]{3}[\s-]?[0-9]{4}$/.test(contactnumber)) {
        return true;
    }
    return false;
};

export const getInitials = name => {
    if (!name) {
        return '';
    }

    const nameArray = name.split(' ');
    const initialsArray = nameArray.map(namePart => {
        return namePart[0] ? namePart[0] : '';
    });

    const initials = initialsArray.join(initialsArray);
    const returnString = initials.length >= 2 ? initials.substring(0, 2) : initials[0];
    return returnString.toUpperCase();
};

export const hasValuesInObject = obj => {
    let hasValues = false;
    const values = Object.values(obj);

    for (const value of values) {
        if (value) {
            hasValues = true;
            break;
        }
    }
    return hasValues;
};

export const convertStringToUrlFriendly = strValue => {
    let convertedStr = strValue.toLowerCase();
    convertedStr = convertedStr.replace(' ', '-');

    return convertedStr;
};

export const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const areEqualArrays = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

export const validatePassword = password => {
    let validationMessage = [];
    if (/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.{6,})/.test(password)) {
        return [];
    } else {
        if (!/(?=.*[a-z])/.test(password)) {
            validationMessage.push('Password must lowercase letter');
        }

        if (!/(?=.*[A-Z])/.test(password)) {
            validationMessage.push('Password must uppercase letter');
        }

        if (!/(?=.*[0-9])/.test(password)) {
            validationMessage.push('Password must contain a number');
        }

        if (!/(?=.*[!@#$%^&*])/.test(password)) {
            validationMessage.push('Password must contain a symbol');
        }

        if (!/(?=.{6,})/.test(password)) {
            validationMessage.push('Password should contain atleast 6 character');
        }
    }

    return validationMessage;
};

export const currencyFormatter = (amount, currency) => {
    return new Intl.NumberFormat({ style: 'currency', currency }).format(amount);
};
