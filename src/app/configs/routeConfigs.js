"use strict";
/**
 * Created by xny on 2016/7/20.
 */
var configs_1 = require('./configs');
var HomeCtrl_1 = require('../controllers/HomeCtrl');
//下面是告诉他依赖注入（标示）
/** @ngInject */
configs_1.app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .otherwise({
        template: require('../controllers/tpl/home.html'),
        title: "我的主页",
        controller: HomeCtrl_1.HOME_CTRL,
        controllerAs: 'home',
        resolve: HomeCtrl_1.homeResolver
    })
        .when('/index', {
        template: require('../controllers/tpl/home.html'),
        title: "我的主页",
        controller: HomeCtrl_1.HOME_CTRL,
        controllerAs: 'home',
        resolve: HomeCtrl_1.homeResolver
    });
});
