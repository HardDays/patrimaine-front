import { Component,OnInit,NgModule }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService} from '../../services/http.service';

import {AdsModel,CheckboxModel} from './../index';
import {AllAdsModel} from './../../models/allads.model';
import {MainService} from "./../../services/main.service";

@Component({
    selector: "ads",
    templateUrl: "app/Pages/ads/ads.component.html",
    providers: [HttpService]
})

export class AdsComponent implements OnInit{
    Ads: AdsModel[];
    AdsObservable: AdsModel[];
    Category: string = "";
    Page: number;
    IsLoading: boolean = true;
    constructor(private router: Router,
        private mainService: MainService,
        private params: ActivatedRoute){}
    ngOnInit(){
        let category = this.params.params.forEach((params:Params) => {
            this.Category = params["category"]?params["category"]:"";
            this.Page = params["page"]?(params["page"]):1;
            this.mainService
                .GetAllAds({sub_category:this.Category})
                .subscribe((data: AllAdsModel) => {
                    this.Ads = data.ads;
                    //this.AdsObservable = this.Ads.slice((this.Page-1)*10,(this.Page-1)*10+10);
                    this.mainService.GetAllAds({sub_category:this.Category,limit:10,offset:((this.Page - 1)*10)})
                        .subscribe((data: AllAdsModel) => {
                            this.AdsObservable = data.ads;
                            console.log("Page is "+ this.Page + ",offset:"+ ((this.Page - 1)*10));
                            console.log(this.AdsObservable);
                            this.IsLoading = false;
                        });
                    
                });
        });


    }
    SearchAdMyName(descr:string)
    {
        let params = {
            description:descr,
            sub_category:this.Category
        };
        this.mainService.GetAllAds({description:descr, sub_category:this.Category})
            .subscribe((data: AllAdsModel) => {
                this.AdsObservable = data.ads;
                console.log(this.Ads);
            });
    }

}