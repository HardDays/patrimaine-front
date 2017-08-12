import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import { AdsModel} from "./../index";

import {MainService} from "./../../services/main.service";
import { UserModel } from '../../models/user.model';
import { Base64ImageModel } from '../../models/base64image.model';

@Component({
    selector: "userDetail",
    templateUrl: "app/Pages/userDetail/userDetail.component.html",
    providers: [HttpService]
})

export class UserDetailComponent implements OnInit{
    User : UserModel = new UserModel(null,"","","","",null,null,null);
    ImageBase64:string = null;
    isMe = false;
    IsLoading = true;
    ErrorMesage:string = "";

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
                           this.AfterGettingOfUserInfo(data);
                        }
                    });
            }
            else{
                this.service.GetUserById(userId)
                    .subscribe((data:UserModel) => {
                        this.AfterGettingOfUserInfo(data);
                    });
            }
        });
    }
    AfterGettingOfUserInfo(user: UserModel){
        this.User = user;
        console.log(this.User);
        if(this.User.company && this.User.company.image_id){
            this.service.GetImageById(this.User.company.image_id)
                .subscribe((result:Base64ImageModel)=>{
                    this.ImageBase64 = result.base64;
                    this.IsLoading = false;
                });
        }
        else{
            this.ImageBase64="images/demo/patrimoineLogo.png";
            this.IsLoading = false;
        }
    }
    RateUser(id:number,conc:any,event:any)
    {
        this.ErrorMesage = "";
        let fullWidth:number = event.toElement.clientWidth;
        let posX:number = event.offsetX;
        let rate =  5 * posX / fullWidth;
        this.service.RateUser(id,rate)
            .subscribe(
                (result: UserModel)=>{
                    this.RefreshUserData(result);
                },
                (err)=>{
                    if(err.status == 409){
                        this.ErrorMesage = "Already voted";
                    }
                    console.log(this.ErrorMesage);
                    //this.DisplayError(err);
                },
                ()=>{
                    //console.log("finished");
                }
            );
    }
    LikeUser(id:number){
        this.service.LikeUser(id)
            .subscribe(
                (result: UserModel)=>{
                    this.RefreshUserData(result);
                },
                (err)=>{
                    if(err.status == 409){
                        this.service.UnlikeUser(id)
                            .subscribe((result: UserModel)=>{
                                this.RefreshUserData(result);
                            });
                    }
                },
                ()=>{
                    //console.log("finished");
                }
            );
    }
    UnrateUser(id:number){
        this.ErrorMesage = "";
        this.service.UnrateUser(id)
            .subscribe(
                (result: UserModel)=>{
                    this.RefreshUserData(result);
                },
                (err)=>{
                    if(err.status == 404){
                        this.ErrorMesage = "Cant cancel vote";
                    }
                },
                ()=>{
                    //console.log("finished");
                }
            );
    }
    
    DisplayError(err:any){
        if(err.status == 409){

        }
    }

    RefreshUserData(user:UserModel)
    {
        this.User = user;
    }
}