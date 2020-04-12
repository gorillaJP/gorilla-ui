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
