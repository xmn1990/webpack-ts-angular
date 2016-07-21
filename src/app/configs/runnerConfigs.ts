/**
 * Created by xny on 2016/7/20.
 */
import {app} from './configs';
// import {LOADING_TYPE} from '../directives/loadingToastDirective';
import {IRouteCombination} from './routeConfigs';
// import {generateRouteKeyObj} from '../common/utils/CommonUtils';
import IScope = angular.IScope;
import ILocationService = angular.ILocationService;
import ICookiesService = angular.cookies.ICookiesService;
import IWindowService = angular.IWindowService;
import ITimeoutService = angular.ITimeoutService;
import IPromise = angular.IPromise;
import IRoute = angular.route.IRoute;
import IAngularEvent = angular.IAngularEvent;

export interface IRootScope extends IScope {
    showToast?:(message:string)=>void;
    route:(path:string, params?:{}, replace?:boolean)=>void;
    routeBack:()=>void;
}

/** @ngInject */
app.run(($rootScope:IRootScope, $location:ILocationService, $cookies:ICookiesService, $window:IWindowService, $timeout:ITimeoutService)=> {

    const PASS_THROUGH = ["reject-login", "feedback"];

    const passThroughRegex = (function concatRegex() {
        const result = PASS_THROUGH.map((str:string)=> {
            return `(${str})`;
        });
        return `^/?${result.join('|')}$`
    }());

    $rootScope.$on('$routeChangeStart', function (event:IAngularEvent, next:IRouteCombination<any>) {

        console.log('$routeChangeStart');
    });

    $rootScope.$on('$routeChangeError', function (event:IAngularEvent, current:IRouteCombination<any>) {
        console.log('$routeChangeError');
    });

    $rootScope.$on('$routeChangeSuccess',()=>{
        console.log('$routeChangeSuccess');
    });

    $rootScope.showToast = function (message:string) {
        alert(message);
    };


    $rootScope.route = function (path:string, params?:{}, replace?:boolean) {
        $location.path(path).search(params || "");
        replace && $location.replace();
    };

    $rootScope.routeBack = function () {
        $window.history.back();
    };
});