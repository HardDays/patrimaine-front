import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import {MainService} from "./../../services/main.service";
import { AllAdsModel } from '../../models/allads.model';
import { UserModel } from '../../models/user.model';
import { AdsModel } from '../../models/ads.model';

@Component({
    moduleId:module.id,
    selector: "myAds",
    templateUrl: "./myAds.component.html",
    providers: [HttpService]
})

export class MyAdsComponent implements OnInit{
    User : UserModel = new UserModel(null,"","","","",null,null,null,null,null);
    myAds:AdsModel[];
    IsLoading = true;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
    }
    ngOnInit() {
        this.activatedRoute.params.forEach((params:Params) => {
            this.service.GetMe()
                .subscribe((data:UserModel) => {
                    if(data.id){
                        this.User = data;
                        this.service.GetAllAds({user_id:data.id})
                            .subscribe((result:AllAdsModel)=>{
                                this.myAds = result.ads;
                                this.IsLoading = false;
                            });
                    }
                });
        });
        
    }
    OnDeleteAd(ad: AdsModel){
        this.service.DeleteAd(ad)
            .subscribe(result =>{
                this.service.GetAllAds({user_id:this.User.id})
                    .subscribe((result:AllAdsModel)=>{this.myAds = result.ads;});
            });
    }
}