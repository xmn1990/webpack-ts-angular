"use strict";
var configs_1 = require('../configs/configs');
require('./btnDirective');
require('./css/btn-loader.less');
var CommonUtils_1 = require('../common/utils/CommonUtils');
exports.BTN_LOADER = 'btnLoader';
configs_1.app.directive(exports.BTN_LOADER, function () {
    return {
        restrict: 'E',
        template: require('./tpl/button.html'),
        scope: {
            text: "=",
            btnClick: "&"
        },
        replace: true,
        link: function (scope, el) {
            el.bind("click", function () {
                if (scope.btnClick) {
                    var result = scope.btnClick();
                    if (CommonUtils_1.isPromiseFn(result)) {
                        scope.isLoadingOn = true;
                        result.finally(function () {
                            scope.isLoadingOn = false;
                        });
                    }
                }
            });
        }
    };
});
