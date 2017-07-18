import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import { UserModel, AdsModel} from "./../index";

import {MainService} from "./../../services/main.service";

@Component({
    selector: "userDetail",
    templateUrl: "app/Pages/userDetail/userDetail.component.html",
    providers: [HttpService]
})

export class UserDetailComponent implements OnInit{
    User : UserModel = new UserModel(null,"","","","",null,null,null);
    isMe = false;
<<<<<<< HEAD
=======
    myAds:AdsModel[];
>>>>>>> b7b548deb1b9e0a80b54cde8b454b14e586becd5
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
    }
    ngOnInit() {
        this.activatedRoute.params.forEach((params:Params) => {
            let userId = params["id"];
            console.log(userId);
            //TODO: REWRITE THIS HARDCODE
            if(userId == 'me'){
                this.isMe = true;
                this.service.GetMe()
                    .subscribe((data:UserModel) => {
                        if(data.id){
                            this.User = data;
                            console.log(this.User);
<<<<<<< HEAD
=======
                            this.service.GetAllAdByUserId(data.id)
                                .then(Ads=>{
                                    this.myAds = Ads;
                                });
>>>>>>> b7b548deb1b9e0a80b54cde8b454b14e586becd5
                        }
                    });
            }
            else{
                this.service.GetUserById(userId)
                    .subscribe((data:UserModel) => {
                        this.User = data;
                        console.log(this.User);
                    });
            }
        });
        /*this.activatedRoute.params.forEach((params: Params)=>{
            let id = params["id"];
            this.service
                .getAdsById(id)
                .then(result => this.Ads = result);
        });*/
        
    }
<<<<<<< HEAD
=======
    OnCreateAdButtonClick(title:string,description:string){
        this.service.CreateAd(title,description)
            .then(result =>{
                this.service.GetAllAds(description)
                    .then((result:AdsModel[])=>{
                        this.router.navigate(["ads",result[0].id]);
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
>>>>>>> b7b548deb1b9e0a80b54cde8b454b14e586becd5
}