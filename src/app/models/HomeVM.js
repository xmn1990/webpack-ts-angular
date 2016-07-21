"use strict";
/**
 * Created by xny on 2016/7/20.
 */
var HomeVM = (function () {
    function HomeVM(fromService) {
        if (fromService === void 0) { fromService = {}; }
        this.headImg = fromService.MRHeadImg;
        this.name = fromService.TrueName;
        this.companyName = fromService.CompanyName;
        this.phone = fromService.MobilePhone;
    }
    return HomeVM;
}());
exports.HomeVM = HomeVM;
