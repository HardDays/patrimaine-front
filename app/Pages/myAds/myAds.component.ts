import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import { UserModel, AdsModel} from "./../index";

import {MainService} from "./../../services/main.service";
<<<<<<< HEAD
import { AllAdsModel } from '../../models/allads.model';
=======
>>>>>>> b7b548deb1b9e0a80b54cde8b454b14e586becd5

@Component({
    selector: "myAds",
    templateUrl: "app/Pages/myAds/myAds.component.html",
    providers: [HttpService]
})

export class MyAdsComponent implements OnInit{
    User : UserModel = new UserModel(null,"","","","",null,null,null);
    myAds:AdsModel[];
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
                        console.log(this.User);
                        this.service.GetAllAds({user_id:data.id})
                            .subscribe((result:AllAdsModel)=>{this.myAds = result.ads;});
                    }
                });
        });
        
    }
    OnDeleteAd(ad: AdsModel){
        console.log(ad);
        this.service.DeleteAd(ad)
            .subscribe(result =>{
                this.service.GetAllAds({user_id:this.User.id})
                    .subscribe((result:AllAdsModel)=>{this.myAds = result.ads;});
            });
    }
}