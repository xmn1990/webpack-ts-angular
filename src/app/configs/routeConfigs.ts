/**
 * Created by xny on 2016/7/20.
 */
import {app} from './configs';
import IRouteProvider = angular.route.IRouteProvider;
import ILocationProvider = angular.ILocationProvider;
import IRoute = angular.route.IRoute;
import {HOME_CTRL,homeResolver} from '../controllers/HomeCtrl';

interface IExtendedRoute extends IRoute {
    originalPath?:string;
}

export interface IRouteCombination<IParams> {
    params?:IParams;
    pathParams?:any; //temp unknown variable
    $$route?:IExtendedRoute
}

//下面是告诉他依赖注入（标示）
/** @ngInject */
app.config(($routeProvider:IRouteProvider, $locationProvider:ILocationProvider)=> {
    $locationProvider.html5Mode(true);
    $routeProvider
    .otherwise({
        template: require('../controllers/tpl/home.html'),
        title: "我的主页",
        controller: HOME_CTRL,
        controllerAs: 'home',
        resolve: homeResolver
    })
        .when('/index', {
            template: require('../controllers/tpl/home.html'),
            title: "我的主页",
            controller: HOME_CTRL,
            controllerAs: 'home',
            resolve: homeResolver
        })

});
