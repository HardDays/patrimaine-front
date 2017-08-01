import { AdsModel } from './../models/ads.model';
export class AllAdsModel{
    constructor(
        public ads: AdsModel[],
        public total_count:number
    ){}

}