import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import { UserModel} from "./../index";

import {MainService} from "./../../services/main.service";

@Component({
    selector: "userDetail",
    templateUrl: "app/Pages/userDetail/userDetail.component.html",
    providers: [HttpService]
})

export class UserDetailComponent{
    User : UserModel = new UserModel(null,"","","","",null,null,null);
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
                this.service.GetMe()
                    .subscribe((data:UserModel) => {
                        this.User = data;
                        console.log(this.User);
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
}