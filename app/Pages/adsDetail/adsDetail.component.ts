import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';


import {AdsModel} from './../index';
import {MainService} from "./../../services/main.service";
import { UserModel } from '../../models/user.model';

@Component({
    selector: "ads",
    templateUrl: "app/Pages/adsDetail/adsDetail.component.html",
    providers: [HttpService]

})

export class AdsDetailComponent implements OnInit{
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
        this.activatedRoute.params.forEach((params:Params) => {
            let adId = params["id"];
            this.service
                .GetAdsById(adId)
                .subscribe((data:AdsModel) => {
                    this.Ads = data;
                    if(this.Ads.user_id){
                        this.service.GetUserById(this.Ads.user_id)
                            .subscribe((user:UserModel)=>{
                                this.Author = user;
                            });
                    }
                });
        });
        /*this.activatedRoute.params.forEach((params: Params)=>{
            let id = params["id"];
            this.service
                .getAdsById(id)
                .then(result => this.Ads = result);
        });*/
        
    }
}

