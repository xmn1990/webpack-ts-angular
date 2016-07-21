/**
 * Created by xny on 2016/7/20.
 */
export class HomeVM {
    public name:string;
    public companyName:string;
    public headImg:string;
    public phone:string;

    constructor(fromService:any = {}) {
        this.headImg = fromService.MRHeadImg;
        this.name = fromService.TrueName;
        this.companyName = fromService.CompanyName;
        this.phone = fromService.MobilePhone;
    }
}