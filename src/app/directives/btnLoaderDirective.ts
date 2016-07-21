import {app} from '../configs/configs';
import './btnDirective';
import './css/btn-loader.less';
import {isPromiseFn} from '../common/utils/CommonUtils';
import IPromise = angular.IPromise;


export const BTN_LOADER = 'btnLoader';

interface IBtnLoaderScope {
    click:(e:Event)=>any;
    btnClick:()=>any;
    isLoadingOn:boolean;
    text:string;
}

app.directive(BTN_LOADER, () => {
    return {
        restrict: 'E',
        template: require('./tpl/button.html'),
        scope: {
            text: "=",
            btnClick: "&"
        },
        replace: true,
        link(scope:IBtnLoaderScope, el:JQuery){
            el.bind("click", ()=> {
                if (scope.btnClick) {
                    let result = scope.btnClick();
                    if (isPromiseFn(result)) {
                        scope.isLoadingOn = true;
                        (result as IPromise<any>).finally(()=> {
                            scope.isLoadingOn = false;
                        });
                    }
                }
            });
        }
    }
});