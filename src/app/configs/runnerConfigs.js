"use strict";
/**
 * Created by xny on 2016/7/20.
 */
var configs_1 = require('./configs');
/** @ngInject */
configs_1.app.run(function ($rootScope, $location, $cookies, $window, $timeout) {
    var PASS_THROUGH = ["reject-login", "feedback"];
    var passThroughRegex = (function concatRegex() {
        var result = PASS_THROUGH.map(function (str) {
            return "(" + str + ")";
        });
        return "^/?" + result.join('|') + "$";
    }());
    $rootScope.$on('$routeChangeStart', function (event, next) {
        console.log('$routeChangeStart');
    });
    $rootScope.$on('$routeChangeError', function (event, current) {
        console.log('$routeChangeError');
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        console.log('$routeChangeSuccess');
    });
    $rootScope.showToast = function (message) {
        alert(message);
    };
    $rootScope.route = function (path, params, replace) {
        $location.path(path).search(params || "");
        replace && $location.replace();
    };
    $rootScope.routeBack = function () {
        $window.history.back();
    };
});
