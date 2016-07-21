"use strict";
var angular = require('angular');
var configs_1 = require('../configs/configs');
exports.GET = 'get';
exports.POST = 'post';
(function (ResponseStateEnum) {
    ResponseStateEnum[ResponseStateEnum["Empty"] = 0] = "Empty";
    ResponseStateEnum[ResponseStateEnum["Error"] = -1] = "Error";
    ResponseStateEnum[ResponseStateEnum["Success"] = 1] = "Success";
})(exports.ResponseStateEnum || (exports.ResponseStateEnum = {}));
var ResponseStateEnum = exports.ResponseStateEnum;
exports.REQ_SERVICE = 'ReqService';
var ReqService = (function () {
    /** @ngInject */
    function ReqService($http, $q) {
        var _this = this;
        this.$http = $http;
        this.$q = $q;
        this.tokenExpiredCodeArr = [10203, 10304];
        this.httpGet = function (url, appData, options) {
            return _this.req(exports.GET, url, ReqService.getDataByOption(appData, options));
        };
        this.httpPost = function (url, appData, options) {
            return _this.req(exports.POST, url, ReqService.getDataByOption(appData, options));
        };
        this.httpPostUpload = function (url, appData, option) {
            return _this.req(_this.$http.post(url, appData, {
                transformRequest: angular.identity, headers: { 'Content-Type': undefined }
            }), option);
        };
    }
    ReqService.getDataByOption = function (appData, options) {
        return options && options.disableSysDataMerge ? appData : angular.extend(appData, {});
    };
    ReqService.prototype.req = function (methodOrPromise, urlOrOptions, data, options) {
        var _this = this;
        var requestPromise, reqParams;
        var deferred = this.$q.defer();
        if (arguments.length === 2) {
            requestPromise = methodOrPromise;
            options = urlOrOptions;
        }
        else {
            var method = methodOrPromise;
            var url = urlOrOptions;
            reqParams = { method: method, url: url, params: null, data: null };
            method == exports.GET ? reqParams.params = data : reqParams.data = data;
            requestPromise = this.$http(reqParams);
        }
        requestPromise.then(function (res) {
            var response = res.data;
            response.result = JSON.parse(response.Result);
            if (response.State == ResponseStateEnum.Error) {
                if (_this.tokenExpiredCodeArr.indexOf(response.result.Code) > -1) {
                }
                deferred.reject(response);
            }
            deferred.resolve(response);
        }, function (err) {
            var errResponse = null;
            if (err.status === -1) {
                errResponse = {
                    Result: "",
                    State: err.status,
                    result: {
                        Code: err.stack,
                        Message: "网络异常"
                    }
                };
            }
            return errResponse;
        });
        return deferred.promise;
    };
    ;
    return ReqService;
}());
configs_1.app.service(exports.REQ_SERVICE, ReqService);
