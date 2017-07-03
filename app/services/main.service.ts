import { Injectable } from "@angular/core";
import {Http} from "@angular/http";
import {AdsModel} from "./../models/ads.model";
import {UserModel} from "./../models/user.model";
import { HttpService } from "./http.service";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

    @Injectable()
    export class MainService{
        constructor(
            private httpService : HttpService
        ){}
        GetAllAds(params:string){
            return this.httpService.GetData('/ads/all',params)
                .map((resp:Response)=>resp.json())
                .catch((error:any) =>{return Observable.throw(error);});
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
            return this.httpService.GetData('/users/all',params)
                .map((resp:Response)=>resp.json())
                .catch((error:any) =>{return Observable.throw(error);});
        }

        GetUserById(id:number){
            return this.httpService.GetData('/users/info/'+id,"")
                .map((resp:Response)=>resp.json())
                .catch((error:any) =>{return Observable.throw(error);});
        }

        CreateUser(user:UserModel){
            return this.httpService.PostData('/users/create',JSON.stringify(user))
                .map((resp:Response)=>resp.json())
                .catch((error:any) =>{return Observable.throw(error);});
        }

        UpdateUser(user:UserModel){
            return this.httpService.PutData('/users/update',JSON.stringify(user))
                .map((resp:Response)=>resp.json())
                .catch((error:any) =>{return Observable.throw(error);});
        }
    }
