/**
 * Created by xny on 2016/7/20.
 */

import {app} from '../configs/configs';
import './css/home.less';
import {IMedicalRepService} from '../service/simple/medicalRepService';
import  '../service/simple/medicalRepService'; //不要问为什么
import {IResponse} from '../service/reqService';
import {IRootScope} from '../configs/runnerConfigs';
import {HomeVM} from '../models/HomeVM';
import IPromise = angular.IPromise;
import IHttpPromise = angular.IHttpPromise;
import IRouteParamsService = angular.route.IRouteParamsService;
export const HOME_CTRL = 'HOME_CTRL';



class HomeCtrl {
    private homeVM:HomeVM;

    /** @ngInject */
    constructor( public $rootScope:IRootScope, homeVM:HomeVM) {
        this.homeVM = homeVM;
        console.log(66666);
    }

    public static getUserInfoAsync(MedicalRepService:IMedicalRepService):any{//:IPromise<HomeVM> {
        // return MedicalRepService.getMedicalRep().then((response:IResponse)=> {
        //    return new HomeVM(response.result);
        //
        // });
        return new HomeVM({}); 
    }

}
// todo 这样写潜在压缩后无法自动注入的BUG
export const homeResolver = {
    homeVM: HomeCtrl.getUserInfoAsync
};

app.controller(HOME_CTRL, HomeCtrl);