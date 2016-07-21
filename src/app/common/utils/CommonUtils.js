"use strict";
function isFunction(fn) {
    return typeof fn === 'function';
}
exports.isFunction = isFunction;
function isUndefined(val) {
    return typeof val === "undefined";
}
exports.isUndefined = isUndefined;
function isPromiseFn(fn) {
    if (fn) {
        return typeof isFunction(fn.finally) && isFunction(fn.then) && isFunction(fn.catch);
    }
    return false;
}
exports.isPromiseFn = isPromiseFn;
function generateRouteKeyObj() {
    return { _key: times33Hash((+new Date()).toString()) };
}
exports.generateRouteKeyObj = generateRouteKeyObj;
function isPhoneValid(val) {
    var phoneRegex = /0?(13|14|15|17|18)[0-9]{9}$/;
    return phoneRegex.test(val);
}
exports.isPhoneValid = isPhoneValid;
function promiseRequestProxy(promise, beforeCb, successCb, errCb) {
    if (!isPromiseFn(promise)) {
        throw new Error('CommonUtils.ts: argument is not a valid promise');
    }
    beforeCb();
    promise.then(successCb, errCb);
}
exports.promiseRequestProxy = promiseRequestProxy;
function times33Hash(text) {
    var hash = 5381, index = text && text.length;
    while (index) {
        hash = (hash * 33) ^ text.charCodeAt(--index);
    }
    return hash >>> 0;
}
exports.times33Hash = times33Hash;
function initObjectDefaultVal(obj, value) {
    for (var o in obj) {
        obj[o] = value;
    }
}
exports.initObjectDefaultVal = initObjectDefaultVal;
function maskPhoneNo(val) {
    return val && val.replace(val.substring(3, 7), "****");
}
exports.maskPhoneNo = maskPhoneNo;
function formatDate(date, format) {
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
exports.formatDate = formatDate;
