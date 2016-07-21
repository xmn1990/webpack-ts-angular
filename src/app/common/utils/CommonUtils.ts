import IPromise = angular.IPromise;

export function isFunction(fn:any) {
    return typeof fn === 'function';
}

export function isUndefined(val) {
    return typeof val === "undefined";
}

export function isPromiseFn(fn:IPromise<any>) {
    if (fn) {
        return typeof isFunction(fn.finally) && isFunction(fn.then) && isFunction(fn.catch);
    }
    return false;
}

export function generateRouteKeyObj() {
    return {_key: times33Hash((+new Date()).toString())};
}

export function isPhoneValid(val) {
    const phoneRegex = /0?(13|14|15|17|18)[0-9]{9}$/;
    return phoneRegex.test(val);
}

export function promiseRequestProxy(promise:IPromise<any>, beforeCb:Function, successCb:any, errCb:any) {
    if (!isPromiseFn(promise)) {
        throw new Error('CommonUtils.ts: argument is not a valid promise');
    }
    beforeCb();
    promise.then(successCb, errCb);
}

export function times33Hash(text:string):number {
    let hash = 5381,
        index = text && text.length;
    while (index) {
        hash = (hash * 33) ^ text.charCodeAt(--index);
    }
    return hash >>> 0;
}

export function initObjectDefaultVal(obj:Object, value:any) {
    for (let o in obj) {
        obj[o] = value;
    }
}

export function maskPhoneNo(val:string) {
    return val && val.replace(val.substring(3, 7), "****");
}

export function formatDate(date:Date, format:string) {
    var o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(), //day
        "h+": date.getHours(), //hour
        "m+": date.getMinutes(), //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        "S": date.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}