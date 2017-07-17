import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import { UserModel, AdsModel} from "./../index";

import {MainService} from "./../../services/main.service";

@Component({
    selector: "myAds",
    templateUrl: "app/Pages/myAds/myAds.component.html",
    providers: [HttpService]
})

export class MyAdsComponent implements OnInit{
    User : UserModel = new UserModel(null,"","","","",null,null,null);
    isLoggedIn:boolean = false;
    myAds:AdsModel[];
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
    }
    ngOnInit() {
        this.service.onAuthChange$.subscribe(bool => {
            this.isLoggedIn = bool;
        });
        if(!this.isLoggedIn)
            this.router.navigate(["401"]);
        else
            this.activatedRoute.params.forEach((params:Params) => {
                this.service.GetMe()
                    .subscribe((data:UserModel) => {
                        if(data.id){
                            this.User = data;
                            console.log(this.User);
                            this.service.GetAllAdByUserId(data.id)
                                .then(Ads=>{
                                    this.myAds = Ads;
                                });
                        }
                    });
            });
        
    }
    OnDeleteAd(ad: AdsModel){
        console.log(ad);
        this.service.DeleteAd(ad)
            .then(result =>{
                this.service.GetAllAdByUserId(this.User.id)
                    .then(Ads=>{
                        this.myAds = Ads;
                    });
            });
    }
}