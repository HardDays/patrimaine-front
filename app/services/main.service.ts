import { Injectable } from "@angular/core";
import {Http} from "@angular/http";
import {AdsModel} from "./../models/ads.model";
import {UserModel} from "./../models/user.model";
import {TokenModel} from "./../models/token.model";
import {AllUsersModel} from "./../models/allusers.model";
import {RegisterUserModel} from "./../models/register.user.model";
import { HttpService } from "./http.service";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

    @Injectable()
    export class MainService{

        public onAuthChange$: Subject<boolean>;
        constructor(
            private httpService : HttpService
        ){
            this.onAuthChange$ = new Subject();
        }
        GetAllAds(params:string){
            return this.httpService.GetData('/ads/all',params);
        }

        GetAdsById(id:number){
            return this.httpService.GetData('/ads/info/'+id,"")
                .map((resp:Response)=>resp.json())
                .catch((error:any) =>{return Observable.throw(error);});
        }

        CreateAd(title:string, desc:string){
            let ad = {title:title,description:desc};
            let params = new URLSearchParams();
            params.set('ad',JSON.stringify(ad));
            return this.httpService.PostData('/ads/create',JSON.stringify(params))
                .map((resp:Response)=>resp.json())
                .catch((error:any) =>{return Observable.throw(error);});
        }

        UpdateAd(id:number,title:string,desc:string){
            let ad = {title:title,description:desc};
            let params = new URLSearchParams();
            params.set('ad',JSON.stringify(ad));
            return this.httpService.PutData('/ads/update/' + id,JSON.stringify(params))
                .map((resp:Response)=>resp.json())
                .catch((error:any) =>{return Observable.throw(error);});
        }

        GetAllUsers(params:string)
        {
            /*return this.httpService.GetData('/users/all',params).toArray<UserModel>();*/
            return this.httpService.GetData('/users/all',params);
        }

        GetUserById(id:number){
            return this.httpService.GetData('/users/info/'+id,"");
        }

        GetMe(){
            return this.httpService.GetData('/users/my_info',"");
        }

        CreateUser(user:RegisterUserModel): Promise<UserModel>{
            let params = {
                user: user,
                expertises: ["placement"],
                agrements: ["CJA"]
            };
            console.log(JSON.stringify(params));
            return this.httpService.PostData('/users/create',JSON.stringify(params)).toPromise<UserModel>();
        }

        UpdateUser(user:UserModel): Promise<UserModel>{
            return this.httpService.PutData('/users/update',JSON.stringify(user)).toPromise<UserModel>();
        }

        UserLogin(email:string, password:string){
            
            return this.httpService.Login(email,password)
                .add((data:TokenModel)=>{
                        this.onAuthChange$.next(true);
                });
        }
    }
