import { Component } from "@angular/core";

import {AdsModel} from './../index';

@Component({
    selector: "ads",
    templateUrl: "app/Pages/adsDetail/adsDetail.component.html"
})

export class AdsDetailComponent{
    Ads : AdsModel = {
        Id:1,
        Title: "Title",
        Description: "lol <br/> kek  cheburek",
        UserId: 1,
        SubCategory:"fintech",
        CreatedDate: new Date("2017-06-04T18:31:44.671Z")
    };

}

