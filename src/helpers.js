// Store Helpers
export function print (msg) {
    if (process.env.NODE_ENV === 'development') {
        console.log(arguments)
    }
}

export function errorToObj(errlist) {
    let fielddata = {};
    for (var i of errlist) {
        fielddata[i.field] = i.message;
    };

    return fielddata;
}

export const errorTypes = {
    verification: 'notverified'
}

export const errorMsgs = {
    verification: {
        wardrobes: 'Please update your profile to access your wardrobes',
        profile: 'Please update your profile to view your profile information'
    }
}

export const userTypes = {
    developer: {
        slug: 'Developer',
        id: 3,
    },
    projectManager: {
        slug: 'Project Manager',
        id: 2,
    },
    client: {
        slug: 'Client',
        id: 1,
    },
}

export const questionTypes = {
    noOptions: 0,
    hasOptions: 1,
}

// API Helpers
export function calcItemsWorth(wardrobes) {
    let totalWorth = 0;
    for (var w of wardrobes) {
        totalWorth += w.worth;
    };

    return totalWorth;
}

export function idNotFound(statusCode) {
    if (statusCode === 404) {
        return true;
    } else {
        return false;
    }
}

export function getErrMsg(statusCode) {
    let msg;
    if (!statusCode) {
        msg = 'There was a network error :( Try again later';
    } else {
        msg = 'Something went wrong loading content :( Try again later';
    }

    // if (statusCode === 401) {
    //     msg = 'Some fields might be incorrect.'
    // } else if (statusCode === 500) {
    //     msg = 'There was a problem processing your request.'
    // }http://127.0.0.1:3333/quiz/show/1

    return msg;
}

export function postErrMsg(statusCode, defaultMsg, isOffer) {
    let msg = defaultMsg;

    if (statusCode === 400) {
        msg = 'Some fields might be incorrect.';
    } else if (statusCode === 401) {
        msg = 'Please login to access this.';
    } else if (statusCode === 402) {
        msg = 'You don\'t have enough credits to place this offer.';
    } else if (statusCode === 403 && isOffer) {
        msg = 'You can\'t place the same offer twice';
    } else {
        msg = 'There was a problem processing your request.';
    }

    return msg;
}

export function deleteErrMsg(statusCode, defaultMsg) {
    let msg = defaultMsg;

    if (statusCode === 400) {
        msg = 'Some fields might be incorrect.';
    } else if (statusCode === 401) {
        msg = 'Please login to access this.';
    } else {
        msg = 'There was a problem processing your request.';
    }

    return msg;
}

export function authErrMsg(statusCode, defaultMsg) {
    let msg = defaultMsg;
    let fieldCode = 400;

    if (statusCode === fieldCode) {
        msg = 'Some fields might be incorrect.'
    } else if (statusCode === 403) {
        msg = 'Please verify your account to login.';
    } else {
        msg = 'There was a problem processing your request.'
    }

    return msg;
}

export function isAuthErr(statusCode) {
    if (statusCode === 401) {
        return true;
    } else {
        return false;
    }
}

export function isPaymentRequired(statusCode) {
    if (statusCode === 402) {
        return true;
    } else {
        return false;
    }
}

export function isBadReq(statusCode) {
    if (statusCode === 400) {
        return true;
    } else {
        return false;
    }
}

export function isVerificationErr(statusCode) {
    if (statusCode === 403) {
        return true;
    } else {
        return false;
    }
}


// string
// float
// function
// var
// const          
// var red = red;
// var dan = document.getElementById('daniel');

// dan.addEventListener('click', function(){
//     dan.value = "redd";
// });

// document.getElementByClassName('daniel');
// or
// document.querySelectorAll('daniel');
// document.getElementsByTagName('img');
// document.getElementById('daniel');
