"use strict";
var configs_1 = require('../../configs/configs');
require('../reqService');
exports.MEDICAL_REP_SERVICE = 'MedicalRepService';
var rootAddress = "http://baidu.com/api/MedicalRep/";
var MedicalRepService = (function () {
    /** @ngInject */
    function MedicalRepService(ReqService) {
        this.ReqService = ReqService;
    }
    //只是简单列子
    MedicalRepService.prototype.getMedicalRep = function () {
        var url = rootAddress + "GetMedicalRep";
        var appData = {
            Kid: 666,
        };
        //演示用就返回null
        return null;
        // return this.ReqService.httpGet(url, appData);
    };
    return MedicalRepService;
}());
configs_1.app.service(exports.MEDICAL_REP_SERVICE, MedicalRepService);
