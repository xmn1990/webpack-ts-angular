import * as angular from 'angular';
import {app} from '../configs/configs';
import IHttpService = angular.IHttpService;
import IPromise = angular.IPromise;
import IHttpPromise = angular.IHttpPromise;


export type REQ_METHOD = 'get'|'post';
export const GET:REQ_METHOD = 'get';
export const POST:REQ_METHOD = 'post';

export enum ResponseStateEnum{
    Empty = 0,
    Error = -1,
    Success = 1
}

export interface IResponse {
    State:number;
    Result:string;
    result:any;
}

export interface IErrResponseModel {
    Code:string,
    Message:string;
}

export interface IErrResponse {
    State:number;
    Result:string;
    result:IErrResponseModel;
}

export interface IReqService {
    httpGet:(url:string, data:{}, option?:IReqOptions)=>IPromise<IResponse>;
    httpPost:(url:string, data:{}, option?:IReqOptions)=>IPromise<IResponse>;
    httpPostUpload:(url:string, appData:{}, option?:IReqOptions)=>IPromise<IResponse>;
    // req(methodOrPromise:REQ_METHOD|IPromise<IResponse>, url?:string, data?:{});
}

export interface IReqOptions {
    disableSysDataMerge?:boolean;
    disableCache?:boolean;
}

export const REQ_SERVICE = 'ReqService';

class ReqService implements IReqService {
    private tokenExpiredCodeArr = [10203, 10304];

    /** @ngInject */
    constructor(private $http:IHttpService, private $q) {
    }

    private static getDataByOption(appData:{}, options?:IReqOptions) {
        return options && options.disableSysDataMerge ? appData : angular.extend(appData, {/*请求必要的参数可以提取出来*/});
    }

    private req(methodOrPromise:IPromise<IResponse>, options?:IReqOptions):IPromise<IResponse>;
    private req(methodOrPromise:REQ_METHOD, url:string, data:{}):IPromise<IResponse>;

    private req(methodOrPromise:REQ_METHOD|IPromise<IResponse>, urlOrOptions?:string|IReqOptions, data?:{}, options?:IReqOptions):IPromise<IResponse> {
        let requestPromise, reqParams;
        let deferred = this.$q.defer();
        if (arguments.length === 2) {
            requestPromise = methodOrPromise;
            options = urlOrOptions;
        }
        else {
            const method = methodOrPromise;
            const url = urlOrOptions;
            reqParams = {method: method, url: url, params: null, data: null};
            method == GET ? reqParams.params = data : reqParams.data = data;
            requestPromise = this.$http(reqParams);
        }
        requestPromise.then((res:any)=> {
            let response:IResponse = res.data;
            response.result = JSON.parse(response.Result);
            if (response.State == ResponseStateEnum.Error) {
                if (this.tokenExpiredCodeArr.indexOf(response.result.Code) > -1) {

                }
                deferred.reject(response)
            }
            deferred.resolve(response);
        }, (err)=> {
            let errResponse:IErrResponse = null;
            if (err.status === -1) {
                errResponse = {
                    Result: "",
                    State: err.status,
                    result: {
                        Code: err.stack,
                        Message: "网络异常"
                    }
                }
            }
            return errResponse;
        });
        return deferred.promise;
    };

    public httpGet = (url:string, appData:{}, options?:IReqOptions)=> {
        return this.req(GET, url, ReqService.getDataByOption(appData, options));
    };

    public httpPost = (url:string, appData:{}, options?:IReqOptions)=> {
        return this.req(POST, url, ReqService.getDataByOption(appData, options));
    };

    public httpPostUpload = (url:string, appData:{}, option?:IReqOptions)=> {
        return this.req(this.$http.post(url, appData, {
            transformRequest: angular.identity, headers: {'Content-Type': undefined}
        }), option);
    };
}

app.service(REQ_SERVICE, ReqService);