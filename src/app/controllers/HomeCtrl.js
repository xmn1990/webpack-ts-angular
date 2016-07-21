/**
 * Created by xny on 2016/7/20.
 */
"use strict";
var configs_1 = require('../configs/configs');
require('./css/home.less');
require('../service/simple/medicalRepService'); //不要问为什么
var HomeVM_1 = require('../models/HomeVM');
exports.HOME_CTRL = 'HOME_CTRL';
var HomeCtrl = (function () {
    /** @ngInject */
    function HomeCtrl($rootScope, homeVM) {
        this.$rootScope = $rootScope;
        this.homeVM = homeVM;
        console.log(66666);
    }
    HomeCtrl.getUserInfoAsync = function (MedicalRepService) {
        // return MedicalRepService.getMedicalRep().then((response:IResponse)=> {
        //    return new HomeVM(response.result);
        //
        // });
        return new HomeVM_1.HomeVM({});
    };
    return HomeCtrl;
}());
// todo 这样写潜在压缩后无法自动注入的BUG
exports.homeResolver = {
    homeVM: HomeCtrl.getUserInfoAsync
};
configs_1.app.controller(exports.HOME_CTRL, HomeCtrl);
