import {app} from '../../configs/configs';
import {IReqService, IResponse} from '../reqService';
import '../reqService';
import IPromise = angular.IPromise;

export const MEDICAL_REP_SERVICE = 'MedicalRepService';

export interface IMedicalRepService {
    getMedicalRep:()=>IPromise<IResponse>;
}

const rootAddress = "http://baidu.com/api/MedicalRep/";

class MedicalRepService implements IMedicalRepService {

    /** @ngInject */
    constructor(private ReqService:IReqService) {
    }
    //只是简单列子
    getMedicalRep() {
        const url = rootAddress + "GetMedicalRep";
        const appData = {
            Kid: 666,
        };
        //演示用就返回null
         return null;
       // return this.ReqService.httpGet(url, appData);
    }
}

app.service(MEDICAL_REP_SERVICE, MedicalRepService);