import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';


import {AdsModel, UserModel} from './../index';
import {MainService} from "./../../services/main.service";

@Component({
    selector: "ads",
    templateUrl: "app/Pages/adsDetail/adsDetail.component.html",
    providers: [HttpService]

})

export class AdsDetailComponent implements OnInit{
    isLoggedIn:boolean = false;
    Ads : AdsModel = new AdsModel(null,"","","",null,null,null,null,null,"",null,null);
    Author: UserModel = new UserModel(null,"","","","",null,null,null);
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
        
    }


    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.service.onAuthChange$.subscribe(bool => {
            this.isLoggedIn = bool;
        });
        if(this.isLoggedIn)
            this.activatedRoute.params.forEach((params:Params) => {
                let adId = params["id"];
                this.service
                    .GetAdsById(adId)
                    .then(Ad => {
                        console.log(Ad);
                        this.Ads = Ad;
                        this.service.GetUserById(this.Ads.user_id)
                            .subscribe((user:UserModel)=>{
                                this.Author = user;
                            })
                    });
            });
        else this.router.navigate(["401"]);
        /*this.activatedRoute.params.forEach((params: Params)=>{
            let id = params["id"];
            this.service
                .getAdsById(id)
                .then(result => this.Ads = result);
        });*/
        
    }
}

