import { Component,OnInit }      from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';
import { HttpService} from '../../services/http.service';

import {MainService} from "./../../services/main.service";
import { UserModel } from '../../models/user.model';
import { Base64ImageModel } from '../../models/base64image.model';
import { AllRatesModel } from '../../models/allrates.model';
import { AllLikesModel } from '../../models/alllikes.model';
import { CheckboxModel } from '../../models/checkbox.model';

@Component({
    moduleId:module.id,
    selector: "userDetail",
    templateUrl: "./userDetail.component.html",
    providers: [HttpService]
})

export class UserDetailComponent implements OnInit{
    User : UserModel = new UserModel(null,"","","","",null,null,null,null,null);
    ImageBase64:string = null;
    isMe = false;
    IsLoading = true;
    ErrorMesage:string = "";
    IsLiked = false;
    IsRated = 0;
    ExpertisesCB: CheckboxModel[] = [
        new CheckboxModel("Credit","credit",false),
        new CheckboxModel("Retraite","retraite",false),
        new CheckboxModel("Placement","placement",false),
        new CheckboxModel("Allocation","allocation",false),
        new CheckboxModel("Epargne","epargne",false),
        new CheckboxModel("Investissement","investissement",false),
        new CheckboxModel("Defiscalisation","defiscalisation",false),
        new CheckboxModel("Immobilier","immobilier",false),
        new CheckboxModel("Assurance","assurance",false),
        new CheckboxModel("Investissement plaisir","investissement_plaisir",false)
    ];
    AgreementsCB:CheckboxModel[]=[
        new CheckboxModel("CJA","CJA",false),
        new CheckboxModel("CIF","CIF",false),
        new CheckboxModel("Courtier","Courtier",false),
        new CheckboxModel("IOSB","IOSB",false),
        new CheckboxModel("Carte-T","Carte_T",false)
    ];
    SubcategoryCB:CheckboxModel[]=[
        new CheckboxModel("Classique","classique",false),
        new CheckboxModel("E-brooker","e_brooker",false),
        new CheckboxModel("Fintech","fintech",false),
        new CheckboxModel("Crowdfunding","crowdfunding",false),
        new CheckboxModel("Lendfunding","lendfunding",false),
        new CheckboxModel("Institutionnels","institutionnels",false)
    ];
    Agreements:string[] = [];
    Expertises:string[] = [];
    SubCategory: string[] = [];
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private service: MainService)
    {
    }
    ngOnInit() {
        this.activatedRoute.params.forEach((params:Params) => {
            let userId = params["id"];
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

    EmailSubscription(){
        let hasNotify:boolean = this.User.has_email_notifications;
        this.service.UpdateMe({user:{has_email_notifications: !hasNotify}})
            .subscribe((result:UserModel)=>{
                this.User = result;
            });
    }

    AfterGettingOfUserInfo(user: UserModel){
        this.User = user;
        if(this.User.company){
            this.Agreements = this.service.GetCheckboxNamesFromCheckboxModel(this.User.company.agrements,this.AgreementsCB);
            this.Expertises = this.service.GetCheckboxNamesFromCheckboxModel(this.User.company.expertises,this.ExpertisesCB);
            this.SubCategory = this.service.GetCheckboxNamesFromCheckboxModel([this.User.company.sub_category],this.SubcategoryCB);
            this.service.GetMyLikes()
                .subscribe((like_result:AllLikesModel[])=>{
                    let like = like_result.find(x=>x.user_id == this.User.id);
                    this.IsLiked =like?true:false;
                    this.service.GetMyRates()
                        .subscribe((rate_result:AllRatesModel[])=>{
                            let rate = rate_result.find(x=> x.user_id == this.User.id);
                            this.IsRated = (rate)?rate.rate:0;
                        });
                });
            if(this.User.company.image_id){
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
        else{
            this.ImageBase64="images/demo/patrimoineLogo.png";
            this.IsLoading = false;
        }
    }
    LikeOrUnlikeUser(){
        if(!this.IsLiked)
            this.LikeUser();
        else 
            this.UnlikeUser();
    }

    LikeUser(){
        
        this.service.LikeUser(this.User.id)
            .subscribe(
                (result: UserModel)=>{
                    this.RefreshUserData(result);
                    this.IsLiked = true;
                },
                (err)=>{
                    if(err.status == 409){
                        this.UnlikeUser();
                    }
                },
                ()=>{
                }
            );
    }
    UnlikeUser(){
        
        this.service.UnlikeUser(this.User.id)
            .subscribe((result: UserModel)=>{
                this.RefreshUserData(result);
                this.IsLiked = false;
            },
        (err)=>{
            if(err.status == 409){
                this.LikeUser();
            }
        });
    }

    RateOrUnrateUser(event:any){
        if(this.IsRated < 1){
            this.RateUser(event);
        }
        else
            this.UnrateUser();
    }
    RateUser(event:any)
    {
        let fullWidth:number = event.toElement.clientWidth;
        let posX:number = event.offsetX;
        let rate =  4 * posX / fullWidth + 1;
        this.service.RateUser(this.User.id,rate)
            .subscribe(
                (result: UserModel)=>{
                    this.IsRated = rate;
                    this.RefreshUserData(result);
                },
                (err)=>{
                    if(err.status == 409){
                    }
                },
                ()=>{
                }
            );
    }
    UnrateUser(){
        this.service.UnrateUser(this.User.id)
            .subscribe(
                (result: UserModel)=>{
                    this.IsRated = 0;
                    this.RefreshUserData(result);
                },
                (err)=>{
                    if(err.status == 404){
                    }
                },
                ()=>{
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