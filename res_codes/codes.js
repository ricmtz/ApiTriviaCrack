exports.resUnauthorized = function resUnauthorized(msg) {
    return {
        code: 401,
        message: msg,
    };
};

exports.resForbidden = function resForbidden(msg) {
    return {
        code: 403,
        message: msg,
    };
};

exports.resNotFound = function resNotFound(msg) {
    return {
        code: 404,
        message: msg,
    };
};

exports.resConflic = function resConflic(msg) {
    return {
        code: 409,
        message: msg,
    };
};
